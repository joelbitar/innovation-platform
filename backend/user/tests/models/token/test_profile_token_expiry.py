import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone


class ProfileTokenExpiryTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test',
            password='test',
        )

        self.profile = self.user.profile

    # Test should have a default token of the same time as the JWT expiry time
    def test_should_have_a_default_token_of_the_same_time_as_the_jwt_expiry_time(self):
        self.profile.generate_token()

        from django.conf import settings

        expected_expiry = timezone.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']

        self.assertAlmostEqual(
            self.profile.tokens.first().expires_at.timestamp(),
            expected_expiry.timestamp(),
            0
        )

    # Should have a method that clears old expired tokens
    def test_should_have_a_method_that_clears_old_expired_tokens(self):
        self.profile.generate_token()

        self.profile.tokens.update(
            expires_at=timezone.now() - datetime.timedelta(days=1)
        )

        self.profile.clear_expired_tokens()

        self.assertEqual(
            0,
            self.profile.tokens.count()
        )
