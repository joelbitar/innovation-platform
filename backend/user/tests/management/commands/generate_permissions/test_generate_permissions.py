from django.contrib.auth.models import Permission, User
from django.test import TestCase

from user.management.commands.generate_permissions_jsx import PermissionsGenerator, PermissionHolder


class UserManagementCommandGeneratePermissionsTestCase(TestCase):
    def pass_test_generate_permissions(self):
        call_command('generate_permissions', stdout=self.stdout, stderr=self.stderr)
        self.assertIn('Successfully created permissions', self.stdout.getvalue())

    # Test should be able to get all permissions
    def test_should_be_able_to_get_all_permissions(self):
        user = User.objects.create_user(
            username='test',
            password='test',
        )

        user.is_superuser = True
        user.save()

        expected_permission_keys = [
            p.replace('.', '__') for p in list(user.get_all_permissions())
        ]

        self.assertEqual(
            len(expected_permission_keys),
            len(list(PermissionsGenerator.get_all_permissions())),
            sorted([p.key for p in PermissionsGenerator.get_all_permissions()])
        )

        self.maxDiff = None

        self.assertEqual(
            sorted(set(expected_permission_keys)),
            sorted([p.key for p in PermissionsGenerator.get_all_permissions()])
        )

        # list(Permission.objects.values_list('codename', flat=True))

    # Test should be able to get camelcase
    def test_should_be_able_to_get_camelcase(self):
        p = PermissionHolder('some.permission_view')
        self.assertEqual(
            'SomePermissionView',
            p.method_name
        )

    def test_should_be_able_to_get_constant_name(self):
        p = PermissionHolder('some.permission_view')
        self.assertEqual(
            'some.permission_view',
            p.permission
        )

    def test_should_be_able_to_generate_jsx(self):
        class TestPermissionsGenerator(PermissionsGenerator):
            @classmethod
            def get_all_permissions(cls):
                yield PermissionHolder('some.permission_view')
                yield PermissionHolder('some.permission_edit')

        self.assertIsNotNone(
            TestPermissionsGenerator.generate_jsx(),
        )
