from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from .models import APIKey
from .serializers import APIKeySerializer

# Create new API key
class APIKeyCreate(APIView):
    '''
    Create a new API key: Only Admins/Backend users can create a new API key
    Do not use in frontend applications
    '''
    permission_classes = [IsAdminUser]

    def post(self, request): # The `request` object carries the data submitted by the client.
        serializer = APIKeySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# List all API keys
class APIKeyList(APIView):
    '''
    List all API keys: Only Admins/Backend users can list all API keys
    Do not use in frontend applications
    '''
    permission_classes = [IsAdminUser]

    # The `request` object is required for permission checks and context, even if not explicitly used.
    def get(self, request): 
        keys = APIKey.objects.all()
        serializer = APIKeySerializer(keys, many=True) # many=True because we are serializing multiple objects
        return Response(serializer.data, status=status.HTTP_200_OK)

# Retrieve or deactivate an API key
class APIKeyDetail(APIView):
    '''
    Retrieve or deactivate an API key: Only Admins/Backend users can retrieve or deactivate an API key
    Do not use in frontend applications
    '''
    permission_classes = [IsAdminUser]

    # The `request` object ensures proper authentication and permissions.
    def get(self, request, key):
        try:
            api_key = APIKey.objects.get(key=key)
            serializer = APIKeySerializer(api_key)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except APIKey.DoesNotExist:
            return Response({"error": "API key not found"}, status=status.HTTP_404_NOT_FOUND)

    # The `request` object is needed for permissions and context.
    def delete(self, request, key):
        try:
            api_key = APIKey.objects.get(key=key)
            api_key.delete()
            return Response({"message": "API key deleted"}, status=status.HTTP_204_NO_CONTENT)
        except APIKey.DoesNotExist:
            return Response({"error": "API key not found"}, status=status.HTTP_404_NOT_FOUND)
