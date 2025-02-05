from django.contrib.auth.models import User
from django.test import TestCase

from ....models import Campaign, CampaignRound


class CampaignModelCampaignCreationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='12345'
        )

    # Test should be able to create a round for a campaign
    def test_should_be_able_to_create_a_round_for_a_campaign(self):
        campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        campaign.rounds.all().delete()

        campaign_round = CampaignRound.objects.create(
            campaign=campaign,
            name='test round',
            created_by=self.user
        )

        with self.subTest('Campaign should have one round'):
            self.assertEqual(
                1,
                campaign.rounds.count()
            )

        with self.subTest('Round should have a relation to campaign'):
            self.assertEqual(
                campaign,
                campaign_round.campaign
            )

