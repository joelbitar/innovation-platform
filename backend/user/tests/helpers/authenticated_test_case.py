from django.contrib.auth.models import User, Permission
from django.test import TestCase, Client
from rest_framework.test import APIClient

from user.tests.helpers.user_permissions_mixin import UserPermissionsTestMixin


class AuthenticatedClientTestCase(TestCase, UserPermissionsTestMixin):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
        )
        self.user.is_superuser = True
        self.user.set_password('testpassword')
        self.user.save()

        self.client = APIClient()

        self.client.force_authenticate(user=self.user)
