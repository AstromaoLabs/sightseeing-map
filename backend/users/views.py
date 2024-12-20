from rest_framework import generics, permissions, status # Used to enhance the views
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer 
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

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
    
# Logout API
class LogoutAPI(APIView):
    '''
    Logout a user by blacklisting the refresh token
    '''
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can logout

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
            # Token-related errors for logging (not shown to users)
            # Log errors for debugging
            if "Token is blacklisted" in str(e):
                print(f"Attempted reused of blacklisted token: {refresh_token}")
            return Response({"message": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"message": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST)