from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SimpleModel

# Temporary in-memory storage for the data
stored_data = {
    "message": "Initial message",
    "number": 0,
}

# Hardcoded data: provide a simple API endpoint
class SimpleAPIView(APIView):
    def get(self, request):
        data = {
            "message": "Hello from django!",
            "number": 42,
        }
        return Response(data)
    
class SimpleAPIPostView(APIView):
    def post(self, request):
        global stored_data

        message = request.data.get('message', 'Default message')
        number = request.data.get('number', 0)

        print(f"Received data: {message}, {number}")

        # Update the in-memory storage
        stored_data = {
            "message": message,
            "number": number,
        }

        # Return the received data in the response
        return Response(
            {
                "message": message,
                "number": number,
            },
            status=status.HTTP_201_CREATED
        )
# Database data: provide a simple API endpoint
class SimpleDatabaseAPIView(APIView):
    # GET request: provide the first object from the database
    def get(self, response):

        # fetch the first object from the database
        obj = SimpleModel.objects.first()
        if obj:
            data = {
                "message": obj.message,
                "number": obj.number,
            }
        else:
            data - {
                "message": "No data available",
                "number": 0,
            }
        return Response(data)
    
class SimpleDatabasePostAPIView(APIView):
    # POST request: create a new object in the database
    def post(self, request):
        # Extract the data from the request
        message = request.data.get('message')
        number = request.data.get('number')

        # Validate the data (recommended)
        if not message or not isinstance(number, int):
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save the data
        new_entry = SimpleModel.objects.create(message=message, number=number)

        # Return the newly created entry 
        return Response({
            "id": new_entry.id,
            "message": new_entry.message,
            "number": new_entry.number,
        }, status=status.HTTP_201_CREATED)
