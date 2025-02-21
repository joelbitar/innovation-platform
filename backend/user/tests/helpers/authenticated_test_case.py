from django.contrib.auth.models import User
from django.test import TestCase, Client
from rest_framework.test import APIClient


class AuthenticatedClientTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
        )
        self.user.set_password('testpassword')
        self.user.save()

        self.client = APIClient()

        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        self.client.force_authenticate(user=None)
        self.client.logout()
        self.client = None
        self.user.delete()
        self.user = None
