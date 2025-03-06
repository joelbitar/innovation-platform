# Test the get label method of user serializer
from django.contrib.auth.models import User
from django.test import SimpleTestCase

from user.serializers import UserSerializer


class UserSerializerGetLabelTests(SimpleTestCase):
    def test_get_label(self):
        names_and_expectations = (
            ('firstname', 'lastname', 'username', 'firstname lastname'),
            ('', 'lastname', 'username', 'lastname'),
            ('firstname', '', 'username', 'firstname'),
            ('', '', 'username', 'username'),
        )

        for first_name, last_name, username, expected in names_and_expectations:
            with self.subTest(first_name=first_name, last_name=last_name, username=username):
                self.assertEqual(
                    expected,
                    UserSerializer.get_label(
                        User(first_name=first_name, last_name=last_name, username=username)
                    ),
                )

        with self.subTest('Should return None if obj is None'):
            self.assertIsNone(
                UserSerializer.get_label(None)
            )
