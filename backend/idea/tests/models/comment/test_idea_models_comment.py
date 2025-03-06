from django.test import SimpleTestCase

from idea.models import Comment, Idea


class IdeaModelCommentTests(SimpleTestCase):
    # Test str method of comment
    def test_str(self):
        comment = Comment(
            text=(comment_text := "Test Comment"),
            idea=Idea(
                title=(idea_title := "Test Idea"),
            )
        )
        with self.subTest('Should return the comment text'):
            self.assertEqual(
                str(comment),
                f'{comment_text}',
            )

        with self.subTest('Should abbreviate and show the first 50 characters of the comment'):
            comment = Comment(
                text=(comment_text := "a" * 100),
                idea=Idea(
                    title=(idea_title := "Test Idea"),
                )
            )
            self.assertEqual(
                str(comment),
                f'{comment_text[:50]}...',
            )
