from django.contrib.auth.models import User, AnonymousUser
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework_api_key.models import APIKey

from user.permissions.is_authenticated_or_api_key_with_user_session import IsAuthenticatedOrApiKeyWithUserSession
from user.serializers import UserWithPermissionsSerializer


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

        self.assertTrue(
            IsAuthenticatedOrApiKeyWithUserSession().has_permission(
                request=request,
                view=None
            )
        )

    # check session id
    def test_authenticate_with_key_and_session(self):
        headers_and_expected_response_statuses = (
            (
                'Authorization AND session cookie',
                True,
                {
                    'Authorization': f'Api-Key {self.api_key}',
                    'cookie': f'sessionid={self.client.session.session_key}',
                }
            ),
            (
                'Authorization AND no session cookie',
                False,
                {
                    'Authorization': f'Api-Key {self.api_key}',
                }
            ),
            (
                'No authorization, with  session cookie',
                False,
                {
                    'cookie': f'sessionid={self.client.session.session_key}',
                }
            )
        )

        for description, expected_result, headers in headers_and_expected_response_statuses:
            with self.subTest(description=description, expected_result=expected_result):
                request = self.helper_get_request(
                    headers=headers
                )

                request.user = AnonymousUser()

                self.assertEqual(
                    expected_result,
                    IsAuthenticatedOrApiKeyWithUserSession().has_permission(
                        request=request,
                        view=None
                    )
                )

