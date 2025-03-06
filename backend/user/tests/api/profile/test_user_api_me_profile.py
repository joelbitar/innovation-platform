from django.urls import reverse

from user.models import Profile
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
                reverse('user_me_profile'),
            )

            self.assertEqual(
                403,
                response.status_code,
                response.content,
            )

        with self.subTest('Should get 404 error if profile does not exist on user'):
            self.user.profile.delete()
            self.user.is_active = True
            self.user.save()

            response = self.client.get(
                reverse('user_me_profile'),
            )

            self.assertEqual(
                404,
                response.status_code,
                response.content,
            )

    # Test should get not found error if the profile does not exist
    def test_should_get_not_found_error_if_the_profile_does_not_exist(self):
        self.user.profile.delete()

        response = self.client.get(
            reverse('user_me_profile'),
        )

        self.assertEqual(
            404,
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

    # Test should be able to update profile
    def test_should_be_able_to_update_profile(self):
        response = self.client.patch(
            reverse('user_me_profile'),
            {
                'type': Profile.Type.ADMIN,
            },
        )

        with self.subTest('Response status code'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Response data should be what we expected'):
            self.assertEqual(
                Profile.Type.CONTRIBUTOR,
                response.data.get('type'),
                response.data,
            )

        with self.subTest('Should NOT be able to update your own type'):
            self.user.refresh_from_db()

            self.assertEqual(
                Profile.Type.CONTRIBUTOR,
                self.user.profile.type,
            )

