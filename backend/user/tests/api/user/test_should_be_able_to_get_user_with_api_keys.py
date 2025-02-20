from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_api_key.models import APIKey


class UserAPIUserAPIKeysTests(TestCase):
    # Test should not be able to get user just because we are authenticated
    def test_should_not_be_able_to_get_user_just_because_we_are_authenticated(self):
        api_client = APIClient()

        user = User.objects.create_superuser(
            username='testuser',
            password='testpassword',
        )

        api_client.force_authenticate(
            user=user
        )

        response = api_client.get(
            reverse('user-detail') + f'?id={user.pk}'
        )

        with self.subTest('Should NOT return OK since we only can access this api with api keys'):
            self.assertEqual(
                403,
                response.status_code,
                response.content
            )

    # Test should be able to get user with api keys
    def test_should_be_able_to_get_user_with_api_keys(self):
        api_key, key = APIKey.objects.create_key(
            name='Test API Key',
        )

        client = Client()

        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

        response = client.get(
            reverse('user-detail') + f'?id={user.pk}',
            headers={
                'Authorization': f'Api-Key {key}'
            },
        )

        with self.subTest('Should return 200 ok'):
            self.assertEqual(
                200,
                response.status_code,
                response.content
            )

        with self.subTest('Should return the user'):
            self.assertEqual(
                user.username,
                response.data['username'],
                response.content
            )

    def test_should_be_able_to_get_user_with_api_keys_by_accessing_through_token(self):
        api_key, key = APIKey.objects.create_key(
            name='Test API Key',
        )

        client = Client()

        User.objects.create_user(
            username='foo',
            password='testpassword',
        ).profile.generate_token()

        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

        profile_token = user.profile.generate_token()

        User.objects.create_user(
            username='bar',
            password='testpassword',
        ).profile.generate_token()

        response = client.get(
            reverse('user-detail') + f'?token={profile_token.token}',
            headers={
                'Authorization': f'Api-Key {key}'
            },
        )

        with self.subTest('Should return 200 ok'):
            self.assertEqual(
                200,
                response.status_code,
                response.content
            )

        with self.subTest('Should return the user'):
            self.assertEqual(
                user.username,
                response.data['username'],
                response.content
            )

        with self.subTest('Should return 404 if no user could be found'):
            response = client.get(
                reverse('user-detail') + f'?token=nonexistingtoken',
                headers={
                    'Authorization': f'Api-Key {key}'
                },
            )

            self.assertEqual(
                404,
                response.status_code,
                response.content
            )

    # Test should return 400 error if no id or token is provided
    def test_should_return_400_error_if_no_id_or_token_is_provided(self):
        api_key, key = APIKey.objects.create_key(
            name='Test API Key',
        )

        response = self.client.get(
            reverse('user-detail'),
            headers={
                'Authorization': f'Api-Key {key}'
            },
        )

        self.assertEqual(
            400,
            response.status_code,
            response.content
        )
