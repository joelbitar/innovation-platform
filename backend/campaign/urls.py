from rest_framework.routers import SimpleRouter

from campaign.views import CampaignViewSet, CampaignRoundViewSet

router = SimpleRouter()

router.register('', CampaignViewSet, basename='campaign')
router.register(r'(?P<campaign_id>\d+)/round', CampaignRoundViewSet, basename='campaign_round')


urlpatterns = router.urls