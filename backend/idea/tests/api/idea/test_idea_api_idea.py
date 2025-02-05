from django.urls import reverse

from campaign.models import Campaign
from idea.models import Idea
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class IdeaAPIVoteTests(AuthenticatedClientTestCase):
    # Test should be able to create an idea on a campaign
    def test_should_be_able_to_create_an_idea_on_a_campaign(self):
        campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        response = self.client.post(
            reverse(
                'idea-list',
            ),
            {
                'campaign': campaign.pk,
                'title': 'test idea',
                'description': 'test description',
            }
        )

        with self.subTest('Should return created response'):
            self.assertEqual(
                201,
                response.status_code,
                response.content,
            )

        with self.subTest('Should create an idea'):
            self.assertEqual(
                1,
                Idea.objects.all().count()
            )

        with self.subTest('Should create an idea on the campaign'):
            self.assertEqual(
                campaign,
                Idea.objects.first().campaign
            )

        with self.subTest('Should create an idea with the correct title'):
            self.assertEqual(
                'test idea',
                Idea.objects.first().title
            )

        with self.subTest('Should create an idea with the correct description'):
            self.assertEqual(
                'test description',
                Idea.objects.first().description
            )

        with self.subTest('Should create an idea with the correct created by'):
            self.assertEqual(
                self.user,
                Idea.objects.first().created_by
            )

    def test_should_be_able_to_get_only_ideas_applicable_for_specific_campaign(self):
        campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        for i in range(4):
            campaign.rounds.create(
                name=f'test round {i}',
                created_by=self.user
            )

        for i in range(5):
            idea = Idea.objects.create(
                campaign=campaign,
                title=f'test idea {i}',
                description=f'test description {i}',
                created_by=self.user
            )

            for campaign_round in campaign.rounds.all():
                idea.vote_set.create(
                    round=campaign_round,
                    created_by=self.user
                )

        for campaign_i in range(5):
            campaign_i = Campaign.objects.create(
                name=f'test campaign {campaign_i}',
                created_by=self.user
            )
            for i in range(5):
                Idea.objects.create(
                    campaign=campaign_i,
                    title=f'test idea {i}',
                    description=f'test description {i}',
                    created_by=self.user
                )

        response = self.client.get(
            reverse(
                'campaign-idea-list', kwargs={'campaign_id': campaign.pk}
            ),
        )

        with self.subTest('Should return 200'):
            self.assertEqual(200, response.status_code, response.data)

        with self.subTest('Should have the expected number of ideas'):
            self.assertEqual(
                campaign.ideas.all().count(),
                len(response.data),
                response.data
            )

        with self.subTest('Should have vote counts on ideas'):
            for idea in response.data:
                self.assertTrue(
                    'round_votes' in idea
                )
                self.assertEqual(
                    5,
                    len(idea['round_votes'])
                )

