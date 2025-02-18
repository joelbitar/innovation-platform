import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from user.models import ProfileToken


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

    def helper_obtain_jwt_token_pair(self, username, password):
        return self.client.post(
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

        obtain_response_two = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
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
        self.client.cookies['user_token'] = obtain_response_one.cookies['user_token']
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

        self.client.cookies['user_token'] = obtain_response_two.cookies['user_token']

        refresh_response_two = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': obtain_response_two.data['refresh'],
            }
        )

    # Test should be able to login
    def test_should_be_able_to_login(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        self.assertEqual(
            200,
            response.status_code,
            response.content,
        )

    # Test should re-generate random token when logging in
    def test_should_re_generate_random_token_when_logging_in(self):
        obtain_response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        self.assertEqual(ProfileToken.objects.all().count(), 1)

        profile_token = ProfileToken.objects.first()

        pre_refresh_token = str(profile_token.token)

        self.client.cookies['user_token'] = obtain_response.cookies['user_token']
        refresh_response = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': obtain_response.data['refresh'],
            }
        )

        self.assertEqual(ProfileToken.objects.all().count(), 1)

        self.assertNotEqual(
            pre_refresh_token,
            str(ProfileToken.objects.first().token),
        )

    # Test should remove expired tokens when we log in
    def test_should_remove_expired_tokens_when_we_log_in(self):
        for i in range(1, 6):
            profile_token = self.user.profile.generate_token()
            profile_token.expires_at = profile_token.expires_at - datetime.timedelta(days=i)
            profile_token.save()

        obtain_response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        self.assertEqual(ProfileToken.objects.all().count(), 1)

    # Test should set user token cookie on response from obtain token view
    def test_should_set_user_token_cookie_on_response_from_obtain_token_view(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        with self.subTest('Should have token cookie'):
            self.assertIn(
                'user_token',
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

        with self.subTest('Should have user_token in cookie from obtain token view'):
            self.assertIn(
                'user_token',
                response.cookies,
            )

        user_token = response.cookies['user_token'].value

        self.client.cookies['user_token'] = user_token

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

        with self.subTest('Should have new user_token in cookie from refresh token view'):
            self.assertIn(
                'user_token',
                response.cookies,
            )

            self.assertNotEqual(
                user_token,
                response.cookies['user_token'].value,
            )

        self.client.cookies['user_token'] = user_token
        # Should we be able to use the old refresh token
        response = self.client.post(
            reverse('auth_jwt_token_refresh'),
            {
                'refresh': first_refresh_token,
            }
        )

        with self.subTest('Should get 401'):
            self.assertEqual(
                401,
                response.status_code,
                response.content,
            )

    # Test should be able to logout, that is blacklist a token
    def test_should_be_able_to_logout_and_blacklist_a_token(self):
        response = self.helper_obtain_jwt_token_pair(
            self.username,
            self.password,
        )

        pre_blacklist_profile_token = str(self.user.profile.tokens.first().token)
        pre_blacklist_profile_token_pk = self.user.profile.tokens.first().pk

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

        self.client.cookies['user_token'] = response.cookies['user_token']

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

        with self.subTest('Should have cleared the user token cookie'):
            self.assertIn(
                'user_token',
                self.client.cookies,
            )

            self.assertEqual(
                "",
                self.client.cookies['user_token'].value,
            )

        with self.subTest('Should have deleted the profile token'):
            self.assertFalse(
                ProfileToken.objects.filter(
                    token=pre_blacklist_profile_token,
                ).exists()
            )
            self.assertFalse(
                ProfileToken.objects.filter(
                    pk=pre_blacklist_profile_token_pk,
                ).exists()
            )

        # Should we be able to use the old refresh token
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
