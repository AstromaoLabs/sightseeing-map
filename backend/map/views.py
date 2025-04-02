from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .mongoDBhelper import create_location, delete_location, get_locations, update_location


@api_view(["GET"])
def list_locations(request):
    return Response({"locations": get_locations()})
    # spots = get_locations()
    # return HttpResponse(dumps({"spots": spots}), content_type="application/json") #default one and i've seen others use this

@api_view(["POST"])
def add_location(request):
    required_fields = ["name", "lng", "lat", "category", "img"]
    missing_fields = [field for field in required_fields if field not in request.data]
    
    if missing_fields:
        return Response({"error": f"Missing required fields: {', '.join(missing_fields)}"}, status=status.HTTP_400_BAD_REQUEST)
    
    location_id = create_location(request.data)
    return Response({"message": "Location added", "id": str(location_id)})

@api_view(["PUT"])  
def edit_location(request):
    name = request.data.get("name") 
    new_data = {
        "name": request.data.get("new_name"), 
        "lng": request.data.get("lng"),
        "lat": request.data.get("lat"),
        "category": request.data.get("category"),
        "img": request.data.get("img"),
    }

    new_data = {key: value for key, value in new_data.items() if value is not None}

    if not new_data:
        return Response({"error": "No valid fields provided to update"}, status=400)

    modified_count = update_location(name, new_data)
    
    if modified_count == 0:
        return Response({"error": "No matching location found or no update performed"}, status=404)

    return Response({"message": "Location updated", "modified": modified_count})


@api_view(["DELETE"])
def del_location(request):
    name = request.data.get("name") #id or name
    deleted_count = delete_location(name)
    return Response({"message": "Deleted successfully", "deleted": deleted_count})