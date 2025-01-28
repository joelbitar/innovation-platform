from django.urls import reverse

from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class UserMeAPITests(AuthenticatedClientTestCase):
    # Test should be able to get myself
    def test_should_be_able_to_get_myself(self):
        response = self.client.get(
            reverse('user_me'),
        )

        self.assertEqual(
            200,
            response.status_code,
            response.content,
        )

        self.assertEqual(
            self.user.username,
            response.data.get('username'),
        )

