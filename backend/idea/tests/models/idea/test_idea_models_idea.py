from django.test import SimpleTestCase

from idea.models import Idea


# Test Idea model
class IdeaModelIdeaTests(SimpleTestCase):
    # Test str method of idea
    def test_str(self):
        idea = Idea(title="Test Idea")
        self.assertEqual(
            str(idea),
            "Test Idea",
        )
