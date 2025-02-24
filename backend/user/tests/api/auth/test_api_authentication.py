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


class AuthenticationAPITests(TestCase):
    """
    JWT Authentication tests
    """
    def setUp(self) -> None:
        self.username = 'testuser'
        self.password = 'testpassword'

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )
        self.user.is_active = True
        self.user.save()

        self.client = APIClient()

    def helper_obtain_jwt_token_pair(self, username, password, client: Optional[APIClient] = None):
        return (client or self.client).post(
            reverse('auth_jwt_token_obtain_pair'),
            {
                'username': username,
                'password': password,
            }
        )

    # Test should be able to obtain two token pairs
    def test_should_be_able_to_obtain_two_token_pairs(self):
        obtain_response_one = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        self.assertEqual(
            200,
            obtain_response_one.status_code,
            obtain_response_one.content,
        )

        client2 = APIClient()

        obtain_response_two = self.helper_obtain_jwt_token_pair(
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
            obtain_response_one.data['access'],
            obtain_response_two.data['access'],
        )

        # should be able to refresh both tokens
        refresh_response_one = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': obtain_response_one.data['refresh'],
            }
        )

        self.assertEqual(
            200,
            refresh_response_one.status_code,
            refresh_response_one.content,
        )

        refresh_response_two = client2.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': obtain_response_two.data['refresh'],
            }
        )

        self.assertEqual(
            200,
            refresh_response_two.status_code,
            refresh_response_two.content,
        )

    # Test should be able to login
    def test_should_be_able_to_login(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        with self.subTest('Should return 200'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Should have access and refresh tokens'):
            self.assertIn(
                'access',
                response.data,
            )

            self.assertIn(
                'refresh',
                response.data,
            )

            self.assertNotIn(
                'user_id',
                response.data,
            )

            self.assertEqual(
                ['refresh', 'access'],
                list(response.data.keys()),
            )

        with self.subTest('Should have user id in session'):
            session = self.client.session

            self.assertIsNotNone(
                session_user_id := session.get('_auth_user_id')
            )

            self.assertEqual(
                self.user.pk,
                int(session_user_id),
            )

    # Test should set user token cookie on response from obtain token view
    def test_should_set_sessionid_cookie_on_response_from_obtain_token_view(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        with self.subTest('Should have token cookie'):
            self.assertIn(
                'sessionid',
                response.cookies,
            )

    # Test should not be able to login without valid credentials
    def test_should_not_be_able_to_login_without_valid_credentials(self):
        with self.subTest('Invalid username and password'):
            self.assertEqual(
                401,
                self.helper_obtain_jwt_token_pair(
                    'invalid_username',
                    'invalid_password',
                ).status_code,
            )

        with self.subTest('Invalid username'):
            self.assertEqual(
                401,
                self.helper_obtain_jwt_token_pair(
                    'invalid_username',
                    self.password,
                ).status_code,
            )

        with self.subTest('Invalid password'):
            self.assertEqual(
                401,
                self.helper_obtain_jwt_token_pair(
                    self.username,
                    'invalid_password',
                ).status_code,
            )

    # Test should not be able to login if user is not active
    def test_should_not_be_able_to_login_if_user_is_not_active(self):
        self.user.is_active = False
        self.user.save()

        self.assertEqual(
            401,
            self.helper_obtain_jwt_token_pair(
                self.username,
                self.password,
            ).status_code,
        )

    # Test should be able to refresh token
    def test_should_be_able_to_refresh_token(self):
        client = APIClient()

        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
            client=client,
        )

        self.assertEqual(
            200,
            response.status_code,
            'Not able to log in so unable to proceed with tests',
        )

        with self.subTest('Should have refresh token'):
            self.assertIn(
                'refresh',
                response.data,
            )

            self.assertIsNotNone(
                first_refresh_token := response.data.get('refresh')
            )

        with self.subTest('Should have user id set on session after refresh'):
            self.assertEqual(
                client.session.get('_auth_user_id'),
                str(self.user.pk),
            )

        with self.subTest('Should have sessionid in cookie from obtain token view'):
            self.assertIn(
                'sessionid',
                response.cookies,
            )

            self.assertIsNotNone(
                sessionid := response.cookies.get('sessionid').value
            )

        with self.subTest('Should have the new session available'):
            self.assertEqual(
                1,
                Session.objects.all().count()
            )
            self.assertEqual(
                Session.objects.all().first().session_key,
                sessionid,
            )
            self.assertTrue(
                Session.objects.filter(
                    session_key=sessionid,
                ).exists(),
            )

        # Refresh token
        response = client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': first_refresh_token,
            },
        )

        with self.subTest('Should get 200'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Should have access token'):
            self.assertIn(
                'access',
                response.data,
            )

            self.assertIsNotNone(
                access_token := response.data.get('access')
            )

        with self.subTest('Should have new refresh token'):
            self.assertIn(
                'refresh',
                response.data,
            )

            self.assertIsNotNone(
                refresh_token := response.data.get('refresh')
            )

            self.assertNotEqual(
                first_refresh_token,
                refresh_token,
            )

        with self.subTest('Should have new session'):
            self.assertIn(
                'sessionid',
                response.cookies,
            )

            self.assertIsNotNone(
                new_sessionid := response.cookies.get('sessionid').value,
            )

            self.assertNotEqual(
                sessionid,
                new_sessionid,
            )

        with self.subTest('Old session should have expiry in one minute'):
            old_session = Session.objects.get(
                session_key=sessionid,
            )

            self.assertTrue(
                (old_session.expire_date - datetime.datetime.now(old_session.expire_date.tzinfo)).seconds <= 60,
            )

    # Test should be able to logout, that is blacklist a token
    def test_should_be_able_to_logout_and_blacklist_a_token(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        self.assertEqual(
            200,
            response.status_code,
            'Not able to log in so unable to proceed with tests',
        )

        with self.subTest('Should have refresh token'):
            self.assertIn(
                'refresh',
                response.data,
            )

            self.assertIsNotNone(
                refresh_token := response.data.get('refresh')
            )

        self.client.force_authenticate(
            self.user,
        )

        response = self.client.post(
            reverse('auth_jwt_token_blacklist'),
            {
                'refresh': refresh_token,
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

        # Should NOT be able to use the old refresh token
        response = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': refresh_token,
            }
        )

        with self.subTest('Token should be blacklisted'):
            self.assertEqual(
                401,
                response.status_code,
                response.content,
            )

        with self.subTest('Should clear session if the users is not authenticated'):
            self.client.logout()

            blacklist_response = self.client.post(
                reverse('auth_jwt_token_blacklist'),
                {
                    'refresh': refresh_token,
                },
            )

            self.assertEqual(
                401,
                blacklist_response.status_code,
                blacklist_response.content,
            )

            self.assertNotIn(
                'user_id',
                self.client.session,
            )

    # Test should return 400 if refresh token is omitted
    def test_should_return_400_if_refresh_token_is_omitted(self):
        with self.subTest('Should clear cookie even if the refresh token is not set'):
            self.client.logout()

            blacklist_response = self.client.post(
                reverse('auth_jwt_token_blacklist'),
                {
                    'refresh': '',
                },
            )

            self.assertEqual(
                400,
                blacklist_response.status_code,
            )

            self.assertTrue(
                not self.client.session.get('user_id'),
            )

    # test should clear redis after we blacklist token
    @patch('redis.Redis.delete')
    @override_settings(REDIS_URL=environ.Env().url('REDIS_URLS', 'redis://localhost:6379/0'))
    def test_should_clear_redis_after_we_blacklist_token(self, mocked_redis_client_delete):
        self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        session_key = str(self.client.session.session_key)

        self.client.post(
            reverse('auth_jwt_token_blacklist'),
            {
                'refresh': 'abc123',
            },
        )

        with self.subTest('Should have the session key'):
            self.assertEqual(
                len(session_key),
                32,
                session_key
            )

        with self.subTest('Should have cleared the user id from the session'):
            self.assertTrue(
                not self.client.session.get('user_id'),
                f'User id should not be in session but is; "{self.client.session.get('user_id')}"'
            )
            self.assertNotIn(
                'user_id',
                self.client.session,
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

        response = self.helper_obtain_jwt_token_pair(
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

        with self.subTest('Should save permissions'):
            mocked_redis_client_set.assert_called_with(
                f'session_user_{session_key}',
                json.dumps(UserWithPermissionsSerializer(self.user).data),
            )
