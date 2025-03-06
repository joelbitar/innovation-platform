from rest_framework.permissions import IsAdminUser


class IsSuperUser(IsAdminUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_superuser
