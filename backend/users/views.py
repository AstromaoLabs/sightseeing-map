from rest_framework import generics, permissions, status # Used to enhance the views
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from api_keys.permissions import HasValidAPIKey

# Register API
class RegisterAPI(generics.CreateAPIView):
    '''
    Register a new user
    '''
    serializer_class = RegisterSerializer
    permission_classes = [HasValidAPIKey] 

# Login API
class LoginAPI(APIView):
    '''
    Login a user
    '''
    # Temporarily allow access without API key to get the token
    # permission_classes = [permissions.AllowAny] # Uncomment this line to allow access without API key
    permission_classes = [HasValidAPIKey] # Allow any user to login, # Uncomment this line to bring back security 
    

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
    permission_classes = [HasValidAPIKey, permissions.IsAuthenticated] # Only authenticated users can get a user
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Logout API
class LogoutAPI(APIView):
    '''
    Logout a user by blacklisting the refresh token
    This endpoint includes a simple error logging mechanism to log token-related errors 
    For debugging purposes and can be removed or kept as needed
    '''
    permission_classes = [HasValidAPIKey, permissions.IsAuthenticated] # Only authenticated users can logout

    def post(self, request):
        try:
            # Extract the refresh token from the request
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Blacklist the token
            token = RefreshToken(refresh_token) 
            token.blacklist()

            # 205: Reset Content status code -> a request has been successfully processed and the client should reset the document view
            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            # Log errors for debugging
            if "Token is blacklisted" in str(e):
                print(f"Attempted reused of blacklisted token: {refresh_token}")
            return Response({"message": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"message": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)
        

# Password Reset Request API
class PasswordResetRequestAPI(APIView):
    '''
    Forgot password API Request
    '''
    permission_classes = [HasValidAPIKey, permissions.AllowAny] # Allow any user to request a password reset    
    
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
    permission_classes = [HasValidAPIKey]
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password has been reset succesfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)