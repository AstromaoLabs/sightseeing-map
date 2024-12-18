from django.urls import path 
from .views import RegisterAPI, LoginAPI, UserAPI
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/register/', RegisterAPI.as_view(), name='user-register'),
    path('users/login/', LoginAPI.as_view(), name='user-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Revise location if needed
    path('users/me/', UserAPI.as_view(), name='user-detail'),
]