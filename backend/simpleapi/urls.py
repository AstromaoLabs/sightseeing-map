from django.urls import path
from .views import SimpleAPIView, SimpleDatabaseAPIView, SimpleDatabasePostAPIView, SimpleAPIPostView

urlpatterns = [
    # http://127.0.0.1:8000/api/simple-api/
    path('simple-api/', SimpleAPIView.as_view(), name='simple-api'),
    # http://127.0.0.1:8000/api/simple-database-api/
    path('simple-database-api/', SimpleDatabaseAPIView.as_view(), name='simple-database-api'),
    # http://127.0.0.1:8000/api/simple-api-post/
    path('simple-api-post/', SimpleAPIPostView.as_view(), name='simple-api-post'),
    # http://127.0.0.1:8000/api/simple-database-api-post/
    path('simple-database-api-post/', SimpleDatabasePostAPIView.as_view(), name='simple-database-api-post'),
]