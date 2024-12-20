from rest_framework import generics, permissions, status # Used to enhance the views
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenRefreshView


# Register API
class RegisterAPI(generics.CreateAPIView):
    '''
    Register a new user
    '''
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny] # Allow any user to register

# Login API
class LoginAPI(APIView):
    '''
    Login a user
    '''
    permission_classes = [permissions.AllowAny] # Allow any user to login

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# User API
class UserAPI(generics.RetrieveAPIView): 
    '''
    Get a user
    '''
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can get a user
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
# Forgot Password API
class PasswordResetRequestAPI(APIView):
    '''
    Forgot password API Request
    '''
    permission_classes = [permissions.AllowAny] # Allow any user to request a password reset    
    
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "If the email exists, a password link will be send to the email provided."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Password Reset API Confirmation 
class PasswordResetConfirmAPI(APIView):
    '''
    Password Reset Confirmation API
    '''
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password has been reset succesfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    