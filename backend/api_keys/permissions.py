from rest_framework.permissions import BasePermission
from rest_framework.exceptions import APIException
from django.core.exceptions import ValidationError
from .models import APIKey

# For debugging purposes I have added a few custom exceptions. - AEM

class InvalidAPIKeyFormatError(APIException):
    status_code = 403
    default_detail = "The provided API key has an invalid format."
    default_code = "invalid_api_key_format"

class MissingAPIKeyError(APIException):
    status_code = 403
    default_detail = "No API key provided in the request headers."
    default_code = "missing_api_key"

class InvalidOrInactiveAPIKeyError(APIException):
    status_code = 403
    default_detail = "The provided API key is invalid or inactive."
    default_code = "invalid_or_inactive_api_key"

class HasValidAPIKey(BasePermission):
    """
    Custom permission to check for a valid API key in the request headers.
    """

    def has_permission(self, request, view):
        # Get the API key from the headers
        api_key = request.headers.get('X-API-KEY')

        # Raise an exception if the API key is missing
        if not api_key:
            raise MissingAPIKeyError()

        try:
            # Check if the key exists and is active
            key = APIKey.objects.get(key=api_key, is_active=True)
            return True
        except ValidationError:
            # Raise an exception if the API key format is invalid
            raise InvalidAPIKeyFormatError()
        except APIKey.DoesNotExist:
            # Raise an exception if the key does not exist or is inactive
            raise InvalidOrInactiveAPIKeyError()
