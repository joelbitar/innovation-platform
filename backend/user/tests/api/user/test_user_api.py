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

        other_user = User.objects.create_user(
            username='otheruser',
            password='testpassword',
        )

        api_client.force_authenticate(
            user=user
        )

        with self.subTest('Superuser can get user'):
            response = api_client.get(
                reverse(
                    'user-detail',
                    kwargs={
                        'user_id': other_user.pk
                    }
                )
            )

            self.assertEqual(
                200,
                response.status_code,
                response.content
            )

        user.is_superuser = False
        user.save()
        with self.subTest('Should NOT return OK since we should be only able to do it if we are superuser'):
            response = api_client.get(
                reverse(
                    'user-detail',
                    kwargs={
                        'user_id': other_user.pk
                    }
                )
            )
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
            reverse(
                'user-detail',
                kwargs={
                    'user_id': user.pk
                }
            ),
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

    # Test should return 404 is no user is set on the session
    def test_should_return_404_is_no_user_is_set_on_the_session(self):
        client = Client()

        api_key, key = APIKey.objects.create_key(
            name='Test API Key',
        )

        with self.subTest('Should return 404 if no user could be found'):
            response = client.get(
                reverse(
                    'user-detail',
                    kwargs={
                        'user_id': 1
                    }
                ),
                headers={
                    'Authorization': f'Api-Key {key}'
                },
            )

            self.assertEqual(
                404,
                response.status_code,
                response.content
            )
