from campaign.models import Campaign, CampaignRound
from user.serializers import CreatedByModelSerializer


class CampaignSerializer(CreatedByModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'


class CampaignRoundSerializer(CreatedByModelSerializer):
    class Meta:
        model = CampaignRound
        fields = '__all__'
