# Test CampaignRound model str method
from django.test import SimpleTestCase

from campaign.models import CampaignRound


class TestCampaignRoundModel(SimpleTestCase):
    def test_str(self):
        campaign_round = CampaignRound(name='Test Campaign Round')
        self.assertEqual(str(campaign_round), 'Test Campaign Round')