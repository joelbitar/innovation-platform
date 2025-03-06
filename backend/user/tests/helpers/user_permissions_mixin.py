from django.contrib.auth.models import Permission, User


class UserPermissionsTestMixin:
    class PermissionCodeNames:
        DELETE_OWN_CREATED_BY_INSTANCES = 'delete_own_created_by_instances'
        CHANGE_OWN_CREATED_BY_INSTANCES = 'change_own_created_by_instances'

    @staticmethod
    def helper_add_permission(user, permission_codename: str):
        assert isinstance(user, User)
        assert permission_codename is not None

        permission = Permission.objects.get(codename=permission_codename)
        user.user_permissions.add(permission)
