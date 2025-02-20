import datetime

from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase
from django.utils import timezone

from user.models import ProfileToken


class ProfileTokenExpiryTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test',
            password='test',
        )

        self.profile = self.user.profile

    # Test should not be able to have the same token twice
    def test_should_not_be_able_to_have_the_same_token_twice(self):
        token = self.profile.create_token()

        token2 = self.profile.create_token()

        self.assertNotEqual(
            token.token,
            token2.token,
        )

        token2.token = token.token

        with self.assertRaises(IntegrityError):
            token2.save()