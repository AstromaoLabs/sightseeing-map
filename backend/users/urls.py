from django.urls import path 
from .views import RegisterAPI, LoginAPI, LogoutAPI, UserAPI, PasswordResetRequestAPI, PasswordResetConfirmAPI
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/register/', RegisterAPI.as_view(), name='user-register'),
    path('users/login/', LoginAPI.as_view(), name='user-login'),
    path('users/logout/', LogoutAPI.as_view(), name='user-logout'),
    path('users/reset-password/', PasswordResetRequestAPI.as_view(), name='reset-password-request'),
    path('users/reset-password/confirm/', PasswordResetConfirmAPI.as_view(), name='reset-password-confirm'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Revise location if needed
    path('users/me/', UserAPI.as_view(), name='user-detail'),
]