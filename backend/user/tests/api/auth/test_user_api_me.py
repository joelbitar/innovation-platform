from datetime import timedelta

from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework_api_key.models import APIKey
from django.contrib.sessions.models import Session

from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase
from django.contrib.sessions.management.commands.clearsessions import Command as ClearSessionsCommand


class UserMeAPITests(AuthenticatedClientTestCase):
    # Test should be able to get myself
    def test_should_only_be_able_to_get_myself_when_logged_in_with_an_active_user(self):
        response = self.client.get(
            reverse('user_me'),
        )

        with self.subTest('Response status code'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Response data'):
            self.assertEqual(
                self.user.username,
                response.data.get('username'),
            )

        self.user.is_superuser = True
        self.user.save()

        with self.subTest('Should return 403 error if user is not active'):
            self.user.is_active = False
            self.user.save()

            response = self.client.get(
                reverse('user_me'),
            )

            self.assertEqual(
                403,
                response.status_code,
                response.content,
            )

        self.client.logout()

        response = self.client.get(
            reverse('user_me'),
        )

        with self.subTest('Should return 403 if not authenticated'):
            self.assertEqual(
                403,
                response.status_code,
                response.content,
            )

    # Test should allow for api key with session id on me endpoint
    def test_should_allow_for_api_key_with_session_id_on_me_endpoint(self):
        api_key, key = APIKey.objects.create_key(name='Test API Key')

        user = User.objects.create_superuser(
            username=(username := 'bobbie'),
            password=(password := 'marsrulz'),
        )

        authenticated_client = APIClient()
        authenticated_client.post(
            reverse('auth_login'),
            {
                'username': username,
                'password': password,
            }
        )

        with self.subTest('Should be ok'):
            response = authenticated_client.get(
                reverse('user_me'),
                headers={
                    'Authorization': f'Api-Key {key}',
                }
            )
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )