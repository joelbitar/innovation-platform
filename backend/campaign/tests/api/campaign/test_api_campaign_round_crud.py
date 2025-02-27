from django.contrib.auth.models import User
from django.urls import reverse

from campaign.models import Campaign
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class CampaignAPICampaignRoundsTests(AuthenticatedClientTestCase):
    def setUp(self):
        super().setUp()

    def test_should_be_able_to_get_campaign_rounds(self):
        campaign = Campaign.objects.create(
            name='Test Campaign',
            description='Test Campaign Description',
            created_by=User.objects.create_user(username='test_user', password='test_password'),
        )

        campaign.rounds.create(
            name='Test Round',
            description='Test Round Description',
            created_by=self.user,
        )
        campaign.rounds.create(
            name='Test Round',
            description='Test Round Description',
            created_by=self.user,
        )

        response = self.client.get(
            reverse('campaign_round-list', kwargs={'campaign_id': campaign.id}),
        )

        with self.subTest('Should return 200'):
            self.assertEqual(200, response.status_code, response.data)

        with self.subTest('Should have the expected number of rounds'):
            self.assertEqual(
                campaign.rounds.all().count(),
                len(response.data),
                response.data
            )

