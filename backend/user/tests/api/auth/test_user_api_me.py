from django.urls import reverse

from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


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

        with self.subTest('Should return 400 error if user is not active'):
            self.user.is_active = False
            self.user.save()

            response = self.client.get(
                reverse('user_me'),
            )

            self.assertEqual(
                400,
                response.status_code,
                response.content,
            )

        self.client.logout()

        response = self.client.get(
            reverse('user_me'),
        )

        with self.subTest('Should return 401 if not authenticated'):
            self.assertEqual(
                401,
                response.status_code,
                response.content,
            )
