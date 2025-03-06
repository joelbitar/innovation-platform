from django.test import SimpleTestCase

from campaign.models import Campaign


class CampaignCampaignModelTests(SimpleTestCase):
    def test_str_method_of_campaign(self):
        campaign = Campaign(name=(campaign_name := "Test Campaign"))

        self.assertEqual(
            campaign.name,
            campaign_name
        )

        self.assertEqual(
            str(campaign),
            campaign_name
        )