"""
URL configuration for sightseeing_map project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger and Redoc documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Sightseeing Map API",                                     
        default_version='v1',                                            
        description="API documentation for the Sightseeing Map project, which provides users with sightseeing locations and user authentication.",
        terms_of_service="https://example.com/policies/terms/",   # To be updated     
        contact=openapi.Contact(email="example@example.com"),      # To be updated  
        license=openapi.License(name="Propietary"),                # To be updated                   
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('sightseeing/v1/', include('api_keys.urls')), # Include the api_keys app
    path('sightseeing/v1/', include('users.urls')), # Include the users app

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'), # Keep This Three
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),                 # Lines While drf-yasg
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),                          # Is in used. 
]

# Using the following URL pattern:
# {subdomain}.{domain}/{project-name}/{version}/{resource}/{action}/{id}