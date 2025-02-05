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
        self.assertTrue(False)

    # Test that we can get ideas for a campaign annotated with the number of votes for each round
    def test_should_be_able_to_get_ideas_for_a_campaign_annotated_with_the_number_of_votes_for_each_round(self):
        self.assertTrue(False)
