from unittest import TestCase

from django.contrib.auth.models import User

from user.tests.helpers.user_permissions_mixin import UserPermissionsTestMixin


# Tests for user permission tests mixin
class UserPermissionsTestMixinTests(TestCase):
    # Test should add expected permission to user
    def test_should_add_expected_permission_to_user(self):
        user_permission = UserPermissionsTestMixin()

        user = User.objects.create_user(
            username='test',
            password='test'
        )

        user_permission.helper_add_permission(
            user,
            UserPermissionsTestMixin.PermissionCodeNames.DELETE_OWN_CREATED_BY_INSTANCES
        )

        self.assertTrue(
            user.has_perm(
                'lib.' + UserPermissionsTestMixin.PermissionCodeNames.DELETE_OWN_CREATED_BY_INSTANCES
            )
        )
