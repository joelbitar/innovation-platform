import datetime
import json
from typing import Optional
from unittest.mock import patch

from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.test import TestCase, override_settings
from django.urls import reverse
from environ import environ
from rest_framework.test import APIClient

from user.serializers import UserWithPermissionsSerializer

from django.conf import settings


class SessionAuthenticationUsernameAPITests(TestCase):
    def setUp(self) -> None:
        self.username = 'testuser'
        self.email = 'testuser@example.com'
        self.password = 'testpassword'

        self.user = User.objects.create_user(
            username='testuser',
            email=self.email,
            password=self.password,
        )
        self.user.is_active = True
        self.user.save()

        self.client = APIClient()

    def helper_login(self, username, password, client: Optional[APIClient] = None):
        return (client or self.client).post(
            reverse('headless:app:account:login'),
            json.dumps({
                'username': username,
                'password': password,
            }),
            # application json
            content_type='application/json',
        )

    # Test should be able to obtain two token pairs
    def test_should_be_able_to_login_twice(self):
        client1 = APIClient()
        obtain_response_one = self.helper_login(
            self.username,
            self.password,
            client=client1,
        )

        self.assertEqual(
            200,
            obtain_response_one.status_code,
            obtain_response_one.content,
        )

        client2 = APIClient()

        obtain_response_two = self.helper_login(
            self.username,
            self.password,
            client=client2,
        )

        self.assertEqual(
            200,
            obtain_response_two.status_code,
            obtain_response_two.content,
        )

        self.assertNotEqual(
            client1.session.session_key,
            client2.session.session_key
        )

    # Test should be able to login
    @patch('lib.redis.RedisClient.set', return_value=True)
    def test_should_be_able_to_login(self, mocked_redis_client_set):
        response = self.helper_login(
            self.username,
            self.password,
        )

        with self.subTest('Should return 200'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Should have session token'):
            self.assertIn(
                settings.SESSION_COOKIE_NAME,
                response.cookies,
            )

    # Test should not be able to login without valid credentials
    def test_should_not_be_able_to_login_without_valid_credentials(self):
        with self.subTest('Invalid username and password'):
            self.assertEqual(
                403,
                self.helper_login(
                    'invalid_username',
                    'invalid_password',
                ).status_code,
            )

        with self.subTest('Invalid username'):
            self.assertEqual(
                403,
                self.helper_login(
                    'invalid_username',
                    self.password,
                ).status_code,
            )

        with self.subTest('Invalid password'):
            self.assertEqual(
                403,
                self.helper_login(
                    self.username,
                    'invalid_password',
                ).status_code,
            )

    # Test should not be able to login if user is not active
    def test_should_not_be_able_to_login_if_user_is_not_active(self):
        self.user.is_active = False
        self.user.save()

        self.assertEqual(
            403,
            self.helper_login(
                self.username,
                self.password,
            ).status_code,
        )

    # Test should be able to logout, that is blacklist a token
    def test_should_be_able_to_logout(self):
        response = self.helper_login(
            self.username,
            self.password,
        )

        self.assertEqual(
            200,
            response.status_code,
            'Not able to log in so unable to proceed with tests',
        )

        response = self.client.post(
            reverse('auth_logout'),
            {
            },
        )

        with self.subTest('Should have ok response from blacklisting'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Should have cleared the user id from the session'):
            session_user_id = self.client.session.get('_auth_user_id')

            self.assertIsNone(
                session_user_id,
                f'User id should not be in session but is; "{session_user_id}"'
            )

    # test should clear redis after we blacklist token
    @patch('redis.Redis.delete')
    @override_settings(REDIS_URL=environ.Env().url('REDIS_URLS', 'redis://localhost:6379/0'))
    def test_should_clear_redis_after_we_blacklist_token(self, mocked_redis_client_delete):
        self.helper_login(
            self.username,
            self.password,
        )

        session_key = str(self.client.session.session_key)

        self.client.post(
            reverse('auth_logout'),
            {
            },
        )

        with self.subTest('Should have the session key'):
            self.assertEqual(
                len(session_key),
                32,
                session_key
            )

        with self.subTest('Should have cleared the session'):
            self.assertIsNone(
                self.client.session.session_key
            )

        with self.subTest('Should have cleared the session from redis'):
            mocked_redis_client_delete.assert_called_with(
                f'session_user_{session_key}',
            )

    # Tests that all user permissions should be saved in redis
    @patch('redis.Redis.set')
    @override_settings(REDIS_URL=environ.Env().url('REDIS_URLS', 'redis://localhost:6379/0'))
    def test_should_save_all_user_permissions_in_redis(self, mocked_redis_client_set):
        self.user.is_superuser = True
        self.user.save()

        response = self.helper_login(
            self.username,
            self.password,
        )

        self.assertEqual(
            200,
            response.status_code,
            response.content,
        )

        self.client.force_authenticate(
            self.user,
        )

        self.assertIsNotNone(
            session_key := self.client.session.session_key
        )

        self.assertIsNotNone(
            "x",
            json.dumps(UserWithPermissionsSerializer(self.user).data, indent=4),
        )

        with self.subTest('Should save permissions'):
            mocked_redis_client_set.assert_called_with(
                f'session_user_{session_key}',
                json.dumps(UserWithPermissionsSerializer(self.user).data),
            )
