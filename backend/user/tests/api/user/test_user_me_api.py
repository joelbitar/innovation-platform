from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework_api_key.models import APIKey


class UserAPIUserMeAPIKeysTests(TestCase):
    def test_should_be_able_to_get_user_with_api_keys_by_accessing_through_current_session(self):
        api_key, key = APIKey.objects.create_key(
            name='Test API Key',
        )

        client = Client()

        User.objects.create_user(
            username='foo',
            password='testpassword',
        )

        user = User.objects.create_superuser(
            username='testuser',
            password='testpassword',
        )

        User.objects.create_user(
            username='bar',
            password='testpassword',
        )

        client.force_login(user)

        response = client.get(
            reverse('user_me'),
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


class UserMeApiTests(TestCase):
    # Test should be able to get myself when getting the user_me endpoint
    def test_should_be_able_to_get_myself_when_getting_the_user_me_endpoint(self):
        client = Client()

        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )
        user.is_active = True
        user.is_superuser = True
        user.save()

        client.force_login(user)

        response = client.get(
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
                user.pk,
                response.data.get('id'),
                response.data,
            )


