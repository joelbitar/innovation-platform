from django.urls import reverse

from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class UserMeProfileAPITests(AuthenticatedClientTestCase):
    # Test should be able to get myself
    def test_should_only_be_able_to_get_myself_when_logged_in_with_an_active_user(self):
        response = self.client.get(
            reverse('user_me_profile'),
        )

        with self.subTest('Response status code'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Response data'):
            self.assertEqual(
                self.user.pk,
                response.data.get('id'),
                response.data,
            )

        with self.subTest('Should return 400 error if user is not active'):
            self.user.is_active = False
            self.user.save()

            response = self.client.get(
                reverse('user_me'),
            )

            self.assertEqual(
                403,
                response.status_code,
                response.content,
            )

    # Test should not be able to get profile if user is not logged in
    def test_should_not_be_able_to_get_profile_if_user_is_not_logged_in(self):
        self.client.logout()

        response = self.client.get(
            reverse('user_me'),
        )

        with self.subTest('Should return 401 if not authenticated'):
            self.assertEqual(
                403,
                response.status_code,
                response.content,
            )


