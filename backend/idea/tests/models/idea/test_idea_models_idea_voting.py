from random import randint

from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase

from campaign.models import Campaign
from ....models import Idea


class IdeaModelIdeaCreationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='12345'
        )

        self.campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        self.idea = Idea.objects.create(
            title='test idea',
            description='test description',
            campaign=self.campaign,
            created_by=self.user
        )

    # Test should be able to create an idea and vote on it
    def test_should_be_able_to_create_an_idea_and_vote_on_it(self):
        campaign_round = self.campaign.rounds.create(
            name='test round',
            created_by=self.user
        )

        idea = Idea.objects.create(
            title='test idea',
            description='test description',
            campaign=self.campaign,
            created_by=self.user
        )

        with self.subTest('Should be able to get if user has voted on this idea for this round'):
            self.assertFalse(
                idea.has_voted(campaign_round, self.user)
            )

        idea.add_vote(campaign_round, self.user)

        with self.subTest('Should be able to get if user has voted on this idea for this round'):
            self.assertTrue(
                idea.has_voted(campaign_round, self.user)
            )

        with self.subTest('Idea should have one vote'):
            self.assertEqual(
                1,
                idea.vote_set.count()
            )

        with self.subTest('User should have one vote'):
            self.assertEqual(
                1,
                self.user.vote_created_by.count()
            )

        with self.subTest('User should have a relation to idea'):
            self.assertEqual(
                idea,
                self.user.vote_created_by.first().idea
            )

    # Test should not be able to vote twice on an idea for the same round
    def test_should_not_be_able_to_vote_twice_on_an_idea_for_the_same_round(self):
        campaign_round = self.campaign.rounds.create(
            name='test round',
            created_by=self.user
        )

        self.idea.add_vote(campaign_round, self.user)

        with self.assertRaises(IntegrityError):
            self.idea.add_vote(campaign_round, self.user)

    # Test should be able to create multiple votes on multiple rounds for each user
    def test_should_be_able_to_create_multiple_votes_on_multiple_rounds_for_each_user(self):
        users = [
                    self.user,
                ] + [
                    User.objects.create_user(
                        username=f'testuser{user_number}',
                        password='12345'
                    )
                    for user_number in range(1, 10)
                ]
        round_vote_count = []
        for round_number in range(1, 6):  # 5 rounds
            round_vote_count.append(
                (
                    campaign_round := self.campaign.rounds.create(
                        name=f'test round {round_number}',
                        created_by=self.user
                    ),
                    vote_count := randint(1, 10)
                )
            )

            for user in users[:vote_count]:
                self.idea.add_vote(campaign_round, user)

        for campaign_round, vote_count in round_vote_count:
            with self.subTest('Idea should have expected number of votes', round=campaign_round, vote_count=vote_count):
                self.assertEqual(
                    vote_count,
                    self.idea.vote_set.filter(round=campaign_round).count()
                )

            with self.subTest('Should have saved the expected vote count when vote was cast', round=campaign_round, vote_count=vote_count):
                self.assertEqual(
                    vote_count,
                    self.idea.roundvotecount_set.get(
                        round=campaign_round
                    ).count
                )
