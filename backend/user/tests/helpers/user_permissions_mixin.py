from django.contrib.auth.models import Permission


class UserPermissionsTestMixin:
    class PermissionCodeNames:
        DELETE_OWN_CREATED_BY_INSTANCES = 'delete_own_created_by_instances'

    @staticmethod
    def helper_add_permission(user, permission_codename: str = None):
        permission = Permission.objects.get(codename=permission_codename)
        user.user_permissions.add(permission)
