from django.urls import path 
from .views import APIKeyCreate, APIKeyList, APIKeyDetail

urlpatterns = [
    path('keys/', APIKeyList.as_view(), name='key-list'),
    path('keys/create/', APIKeyCreate.as_view(), name='key-create'),
    path('keys/<str:key>/', APIKeyDetail.as_view(), name='key-detail'),
]