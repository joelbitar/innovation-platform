# Test str method of Profile

from django.contrib.auth.models import User
from django.test import SimpleTestCase

from user.models import Profile


class ProfileModelTests(SimpleTestCase):
    def test_string_method(self):
        user = User(username="test")
        profile = Profile(user=user)

        self.assertEqual(
            "test's profile <contributor>",
            profile.__str__(),
        )
