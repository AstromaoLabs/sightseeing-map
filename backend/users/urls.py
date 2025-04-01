from django.urls import path 
from .views import RegisterAPI, LoginAPI, LogoutAPI, UserAPI, PasswordResetRequestAPI, PasswordResetConfirmAPI, del_location, edit_location, list_locations, add_location
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/register/', RegisterAPI.as_view(), name='user-register'),
    path('users/login/', LoginAPI.as_view(), name='user-login'),
    path('users/logout/', LogoutAPI.as_view(), name='user-logout'),
    path('users/reset-password/', PasswordResetRequestAPI.as_view(), name='reset-password-request'),
    path('users/reset-password/confirm/', PasswordResetConfirmAPI.as_view(), name='reset-password-confirm'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Revise location if needed
    path('users/me/', UserAPI.as_view(), name='user-detail'),
    path ('places/list/', list_locations, name="list"),
    path ('places/add/', add_location, name="add"),
    path('places/update/', edit_location, name="edit"),
    path('places/delete/', del_location, name="del"),
]