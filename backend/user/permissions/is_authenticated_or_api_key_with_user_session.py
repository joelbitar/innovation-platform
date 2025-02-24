from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework_api_key.permissions import HasAPIKey


class IsAuthenticatedOrApiKeyWithUserSession(BasePermission):
    def has_permission(self, request, view):
        if IsAuthenticated().has_permission(request, view):
            return True

        if HasAPIKey().has_permission(request, view):
            # Check if the session key is in the request
            if request.COOKIES.get('sessionid'):
                return True

        return False