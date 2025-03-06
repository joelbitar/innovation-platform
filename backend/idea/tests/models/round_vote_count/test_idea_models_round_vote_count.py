# Test idea round vote count model
from django.test import SimpleTestCase

from idea.models import RoundVoteCount, Idea


class IdeaModelIdeaRoundVoteCountTests(SimpleTestCase):
    # Test str method of idea round vote count
    def test_str(self):
        idea_round_vote_count = RoundVoteCount(
            count=(idea_round_vote_count_tally := 123),
            idea=Idea(
                title=(idea_title := "Test Idea"),
            )
        )
        self.assertEqual(
            str(idea_round_vote_count),
            f'{idea_title} - {idea_round_vote_count_tally}',
        )
