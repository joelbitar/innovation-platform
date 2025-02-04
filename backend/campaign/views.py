from campaign.models import Campaign, CampaignRound
from campaign.serializers import CampaignSerializer, CampaignRoundSerializer
from lib.created_by_current_user_helper import CreatedByModelViewSet


# Create your views here.

class CampaignViewSet(CreatedByModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


class CampaignRoundViewSet(CreatedByModelViewSet):
    serializer_class = CampaignRoundSerializer

    def get_queryset(self):
        return CampaignRound.objects.filter(campaign_id=self.kwargs['campaign_id'])
