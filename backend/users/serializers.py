from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator # Token generator for password reset
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode # Encode and decode uid
from django.utils.encoding import force_bytes 
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings 

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta: # Meta class is used to specify the model and fields that we want to serialize
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user
    
# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return {
                'username': user.username, 
                'token': { 
                    'refresh': str(refresh), # Refresh token
                    'access': str(refresh.access_token), # Access token
                }
            }
        raise serializers.ValidationError('Incorrect Credentials')
    
# Forgot Password Request Serializer
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField() 

    def validate_email(self, value):
        # Try fetching user without revealing existence
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("If the email exists, a password link will be sent to the email provided.")
        
        self.context['user'] = user
        return value
    
    def save(self):
        user = self.context['user']
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        reset_link = f"{settings.FRONTEND_URL}confirm-reset-password/{uid}/{token}"

        email_subject = "Password Reset Request"
        email_body = render_to_string('emails/password_reset_email.html', {
            'reset_link': reset_link,
            'user': user,
        })

        # Using EmailMultiAlternatives to send HTML email
        email = EmailMultiAlternatives(
            subject=email_subject,
            body=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email],
        )
        email.attach_alternative(email_body, "text/html")
        email.send(fail_silently=False)

# Confirm Password Reset Serializer
class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            uid = urlsafe_base64_decode(data['uid']).decode()
            user = User.objects.get(pk=uid) # Get user by primary key
        except (ValueError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid user")
        
        if not default_token_generator.check_token(user, data['token']):
            raise serializers.ValidationError("Invalid or expired token")
        
        self.context['user'] = user
        return data
    
    def save(self):
        user = self.context['user']
        user.set_password(self.validated_data['new_password'])
        user.save()    