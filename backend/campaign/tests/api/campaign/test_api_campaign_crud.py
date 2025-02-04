from django.contrib.auth.models import User
from django.urls import reverse

from campaign.models import Campaign
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class CampaignAPICampaignTests(AuthenticatedClientTestCase):
    def setUp(self):
        super().setUp()

    def test_should_be_able_to_create_campaign(self):
        response = self.client.post(
            reverse('campaign-list'),
            {
                'name': 'Test Campaign',
                'description': 'Test Campaign Description',
                'created_by': self.user.id,
            }
        )

        self.assertEqual(201, response.status_code, response.data)

        self.assertEqual(
            1,
            Campaign.objects.all().count(),
        )
