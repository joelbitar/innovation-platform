from campaign.models import Campaign
from user.serializers import CreatedByModelSerializer


class CampaignSerializer(CreatedByModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'
