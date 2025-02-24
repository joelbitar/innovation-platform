from importlib import import_module

from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework_api_key.permissions import HasAPIKey

from django.conf import settings


class UserSessionWithAPIKeyOrAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # If we use session authentication, we need to check the API key
        if request.COOKIES.get('sessionid'):
            if not HasAPIKey().has_permission(request, view):
                return False

        return IsAuthenticated().has_permission(request, view)
