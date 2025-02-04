from django.contrib.auth.models import User
from django.urls import reverse

from campaign.models import Campaign, CampaignRound
from idea.models import Idea
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class IdeaAPIVoteTests(AuthenticatedClientTestCase):
    def setUp(self):
        super().setUp()
        self.campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        CampaignRound.objects.create(
            campaign=self.campaign,
            name='test round 1',
            created_by=self.user
        )

        self.round = CampaignRound.objects.create(
            campaign=self.campaign,
            name='test round 2',
            created_by=self.user
        )

        CampaignRound.objects.create(
            campaign=self.campaign,
            name='test round 3',
            created_by=self.user
        )

        self.idea = Idea.objects.create(
            campaign=self.campaign,
            title='test idea',
            description='test description',
            created_by=self.user
        )

    # Test should be able to create an idea on a campaign
    def test_should_be_able_to_create_an_idea_on_a_campaign(self):
        response = self.client.post(
            reverse(
                'vote-list',
            ),
            {
                'idea': self.idea.pk,
                'round': self.round.pk,
            }
        )

        with self.subTest('Should return created response'):
            self.assertEqual(
                201,
                response.status_code,
                response.content,
            )

        with self.subTest('Should create a vote'):
            self.assertEqual(
                1,
                self.idea.vote_set.count()
            )

        with self.subTest('Should create a vote on the round'):
            self.assertEqual(
                self.round,
                self.idea.vote_set.first().round
            )

    # Test should be able to get a detailed view of an idea that has votes on it
    def test_should_be_able_to_get_a_detailed_view_of_an_idea_that_has_votes_on_it(self):
        self.idea.add_vote(
            campaign_round=self.round,
            user=self.user
        )

        round_two = CampaignRound.objects.create(
            campaign=self.campaign,
            name='test round x',
            created_by=self.user
        )

        self.idea.add_vote(
            campaign_round=round_two,
            user=self.user
        )
        self.idea.add_vote(
            campaign_round=round_two,
            user=User.objects.create_user(
                username='testuser2',
                password='testpassword'
            )
        )

        CampaignRound.objects.create(
            campaign=Campaign.objects.create(
                name='test campaign 2',
                created_by=self.user
            ),
            name='test round 4',
            created_by=self.user
        )

        response = self.client.get(
            reverse(
                'idea-detail',
                kwargs={'pk': self.idea.pk}
            )
        )

        with self.subTest('Should return success response'):
            self.assertEqual(
                200,
                response.status_code,
                response.content,
            )

        with self.subTest('Should have round-vote data'):
            self.assertIn(
                'round_votes',
                response.data.keys()
            )

            self.assertIsNotNone(
                round_votes := response.data['round_votes']
            )

        with self.subTest('Should have round entries for all rounds on the idea-campaign'):
            for campaing_round in self.campaign.rounds.all():
                if campaing_round.vote_set.count() == 0:
                    continue

                self.assertIn(
                    campaing_round.pk,
                    [rv.get('round_pk') for rv in round_votes],
                f'Could not find {campaing_round.name} in round_votes'
                )

        with self.subTest('Should have correct round-vote data for the round'):
            for vote_count in self.idea.roundvotecount_set.filter(round__campaign=self.campaign):
                response_vote_count = next(
                    rv
                    for rv in round_votes
                    if rv.get('round_pk') == vote_count.round_id
                )

                self.assertEqual(
                    vote_count.count,
                    response_vote_count.get('count')
                )
