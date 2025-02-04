from campaign.models import Campaign
from campaign.serializers import CampaignSerializer
from lib.created_by_current_user_helper import CreatedByModelViewSet


# Create your views here.

class CampaignViewSet(CreatedByModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
