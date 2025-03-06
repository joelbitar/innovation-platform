# Test string methdod of folder
from django.test import SimpleTestCase

from file.models import Folder


class FolderModelTests(SimpleTestCase):
    def test_string_method(self):
        folder = Folder(name="test")
        self.assertEqual(
            "test",
            folder.__str__(),
        )
