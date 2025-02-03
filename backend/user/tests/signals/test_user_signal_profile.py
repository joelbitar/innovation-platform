from django.contrib.auth.models import User
from django.test import TestCase

from ...models import Profile


class UserProfileSignalTests(TestCase):
    # Test should create profile and attach to user when user is created
    def test_should_create_profile_and_attach_to_user_when_user_is_created(self):
        u = User.objects.create_user(
            username='test',
            password='test',
        )

        with self.subTest('Profile should be created'):
            self.assertEqual(
                1,
                Profile.objects.all().count()
            )

        with self.subTest('Profile should be attached to user'):
            self.assertIsNotNone(
                u.profile
            )

        u.delete()

        # Should delete profile when user is deleted
        with self.subTest('Should delete profile when user is deleted'):
            self.assertEqual(
                0,
                Profile.objects.all().count()
            )
