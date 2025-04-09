from django.urls import path 
from .views import del_location, edit_location, list_locations, add_location

urlpatterns = [
    path ('list/', list_locations, name="list"),
    path ('add/', add_location, name="add"),
    path('update/', edit_location, name="edit"),
    path('delete/', del_location, name="del"),
]