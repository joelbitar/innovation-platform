from rest_framework.routers import SimpleRouter

from campaign.views import CampaignViewSet

router = SimpleRouter()

router.register('campaign', CampaignViewSet, basename='campaign')


urlpatterns = router.urls