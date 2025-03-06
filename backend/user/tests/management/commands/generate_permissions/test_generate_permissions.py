import os.path
import random
import string

from django.contrib.auth.models import Permission, User
from django.core.management import call_command
from django.test import TestCase, override_settings

from user.management.commands.generate_permissions_jsx import PermissionsGenerator, PermissionHolder


class UserManagementCommandGeneratePermissionsTestCase(TestCase):

    @override_settings(BASE_DIR='/tmp/')
    def test_generate_permissions(self):
        random_filename = "".join([random.choice(string.ascii_letters) for _ in range(30)])
        call_command('generate_permissions_jsx', random_filename)

        self.assertTrue(
            os.path.exists(f'/tmp/{random_filename}')
        )

        created_file_contents = open(f'/tmp/{random_filename}').read()

        self.assertNotEqual(
            "",
            created_file_contents
        )

    # Test should create a new user if no superuser exists when getting ne permissions
    def test_should_create_a_new_user_if_no_superuser_if_we_try_to_get_superuser(self):
        self.assertEqual(
            0,
            User.objects.filter().count()
        )

        new_user = PermissionsGenerator.get_superuser()

        self.assertIsNotNone(
            new_user
        )

        self.assertEqual(
            1,
            User.objects.filter(is_superuser=True).count()
        )

    # Test should remove temporary superuser after we
    def test_should_remove_any_temporary_superuser_after_we_get_perms(self):
        PermissionsGenerator.get_all_permissions()

        self.assertEqual(
            0,
            User.objects.filter(is_superuser=True).count()
        )

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
