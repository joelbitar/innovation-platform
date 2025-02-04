from django.contrib.auth.models import User
from django.test import TestCase

from campaign.models import Campaign


class CampaignCampaignRoundSignalTests(TestCase):
    def test_should_create_campaign_round_on_campaign_create(self):
        campaign = Campaign.objects.create(
            name='Test Campaign',
            description='Test Campaign Description',
            created_by=User.objects.create_user(username='test_user', password='test_password'),
        )

        with self.subTest('Should create a campaign round'):
            self.assertEqual(
                1,
                campaign.rounds.count(),
            )

        with self.subTest('Should not create when updating'):
            campaign.name = 'Updated Campaign'
            campaign.save()

            self.assertEqual(
                1,
                campaign.rounds.count(),
            )
