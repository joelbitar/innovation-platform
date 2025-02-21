import datetime
from typing import Optional

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class AuthenticationAPITests(TestCase):
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
                session_user_id := session.get('user_id')
            )

            self.assertEqual(
                self.user.pk,
                session_user_id,
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
                first_refresh_token := response.data.get('refresh')
            )

        with self.subTest('Should have sessionid in cookie from obtain token view'):
            self.assertIn(
                'sessionid',
                response.cookies,
            )

        # Refresh token
        response = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': first_refresh_token,
            }
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

        with self.subTest('Should have refresh token'):
            self.assertIn(
                'refresh',
                response.data,
            )

            self.assertIsNotNone(
                refresh_token := response.data.get('refresh')
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

        self.assertTrue(
            self.client.session.get('user_id'),
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
            self.assertTrue(
                not self.client.session.get('user_id'),
                f'User id should not be in session but is; "{self.client.session.get('user_id')}"'
            )
            self.assertNotIn(
                'user_id',
                self.client.session,
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
