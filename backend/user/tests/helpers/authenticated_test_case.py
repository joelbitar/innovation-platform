from django.contrib.auth.models import User
from django.test import TestCase, Client


class AuthenticatedTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
        )
        self.user.set_password('testpassword')
        self.user.save()

        self.client = Client()

        self.client.login(
            username='testuser',
            password='testpassword',
        )
