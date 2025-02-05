from django.urls import re_path
from rest_framework.routers import SimpleRouter

from idea.views import IdeaViewSet, VoteViewSet, CampaignIdeaViewSet

router = SimpleRouter()
router.register('idea', IdeaViewSet, basename='idea')
router.register('vote', VoteViewSet, basename='vote')
router.register(r'campaign/(?P<campaign_id>\d+)/idea', CampaignIdeaViewSet, basename='campaign-idea')

urlpatterns = router.urls + [
    #re_path(r'campaign/(?P<campaign_id>\d+)/idea', CampaignIdeaViewSet.as_view({'get': 'fetch_campaign_ideas'}), name='campaign-idea-list')
]
