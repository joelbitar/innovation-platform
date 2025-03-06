from django.test import SimpleTestCase

from idea.models import IdeaFolder


# Test IdeaFolder model
class IdeaModelFolderTests(SimpleTestCase):
    # Test str method of folder
    def test_str(self):
        folder = IdeaFolder(title="Test Folder")
        self.assertEqual(
            str(folder),
            "Test Folder",
        )
