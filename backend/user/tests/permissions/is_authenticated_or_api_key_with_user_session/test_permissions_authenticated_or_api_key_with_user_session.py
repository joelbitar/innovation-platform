from django.contrib.auth.middleware import AuthenticationMiddleware
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework_api_key.models import APIKey

from user.permissions.user_session_with_api_key_or_authenticated import UserSessionWithAPIKeyOrAuthenticated
from user.serializers import UserWithPermissionsSerializer
import mock


class PermissionsTests(TestCase):
    def setUp(self) -> None:
        self.username = 'testuser'
        self.password = 'testpassword'

        User.objects.create_user(
            username='dummyuser1',
            password=self.password,
        )
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )

        User.objects.create_user(
            username='dummyuser2',
            password=self.password,
        )

        self.user.is_active = True
        self.user.save()

        _, key = APIKey.objects.create_key(name='test')

        self.api_key = key

        self.request_factory = APIRequestFactory()

    def helper_get_request(self, headers: dict = None):
        return self.request_factory.get(
            reverse('user_me'),
            headers=headers
        )

    def test_should_be_able_to_authenticate_with_access_token(self):
        client = APIClient()

        response = client.post(
            reverse('auth_jwt_token_obtain_pair'),
            {
                'username': self.username,
                'password': self.password,
            }
        )

        access_token = response.data['access']

        request = self.helper_get_request(
            headers={
                'Authorization': f'Bearer {access_token}'
            }
        )

        # Need to use jwt authentication for this to work
        from rest_framework_simplejwt.authentication import JWTAuthentication
        request.user, _ = JWTAuthentication().authenticate(
            request,
        )

        with self.subTest('Should have permissions if we use use jwt token'):
            self.assertTrue(
                UserSessionWithAPIKeyOrAuthenticated().has_permission(
                    request=request,
                    view=None
                )
            )

    # check session id
    def test_authenticate_with_key_and_session(self):
        client_with_new_session = APIClient()
        client_with_new_session.force_authenticate(user=self.user)

        self.assertIsNotNone(
            client_with_new_session.session.session_key
        )

        headers_and_expected_response_statuses = (
            (
                'API Key and AND authenticated',
                True,
                {
                    'Authorization': f'Api-Key {self.api_key}',
                    'cookie': f'sessionid={client_with_new_session.session.session_key}',
                },
                self.user,
            ),
            (
                'API Key but not authenticated',
                False,
                {
                    'Authorization': f'Api-Key {self.api_key}',
                },
                AnonymousUser(),
            ),
            (
                'Authententicated but no API Key ',
                False,
                {
                    'cookie': f'sessionid={client_with_new_session.session.session_key}',
                },
                self.user,
            )
        )

        for description, expected_result, headers, request_user in headers_and_expected_response_statuses:
            with self.subTest(description=description, expected_result=expected_result):
                request = self.helper_get_request(
                    headers=headers
                )

                request.user = request_user
                request.is_authenticated = not request_user.is_anonymous

                self.assertEqual(
                    expected_result,
                    UserSessionWithAPIKeyOrAuthenticated().has_permission(
                        request=request,
                        view=None
                    )
                )
