import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from user.models import Profile


class ProfileManagerTests(TestCase):
    # Test should be able to create and retrieve a Profile from a token
    def test_should_be_able_to_create_and_retrieve_profile_from_token(self):
        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

        token = user.profile.create_token()

        self.assertIsNotNone(
            token
        )

        with self.subTest('Should be able to get by token'):
            profile = Profile.objects.get_by_token(token.token)

            self.assertIsNotNone(
                token
            )

        with self.subTest('Should not get if token has expired'):
            token.expires_at = timezone.now() - datetime.timedelta(seconds=1)
            token.save()

            with self.assertRaises(Profile.DoesNotExist):
                Profile.objects.get_by_token(token.token)
