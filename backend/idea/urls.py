from rest_framework.routers import SimpleRouter

from idea.views import IdeaViewSet, VoteViewSet, CampaignIdeaViewSet, RoundIdeaMyVoteViewSet, RoundMyVoteViewSet, RoundIdeaInformationViewSet, IdeaInformationViewSet

router = SimpleRouter()
router.register('idea', IdeaViewSet, basename='idea')
router.register('vote', VoteViewSet, basename='vote')
router.register(r'campaign/(?P<campaign_id>\d+)/idea', CampaignIdeaViewSet, basename='campaign-idea')
router.register(r'round/(?P<round_id>\d+)/vote/me', RoundMyVoteViewSet, basename='round_me_vote')
router.register(r'round/(?P<round_id>\d+)/idea/(?P<idea_id>\d+)/vote/me', RoundIdeaMyVoteViewSet, basename='round_idea_me_vote')
router.register(r'round/(?P<round_id>\d+)/idea/(?P<idea_id>\d+)/information', RoundIdeaInformationViewSet, basename='round_idea_information')
router.register(r'idea/(?P<idea_id>\d+)/information', IdeaInformationViewSet, basename='idea_information')

urlpatterns = router.urls + [
    # re_path(r'campaign/(?P<campaign_id>\d+)/idea', CampaignIdeaViewSet.as_view({'get': 'fetch_campaign_ideas'}), name='campaign-idea-list')
]
