from rest_framework.routers import SimpleRouter

from idea.views import IdeaViewSet, VoteViewSet

router = SimpleRouter()
router.register('idea', IdeaViewSet, basename='idea')
router.register('vote', VoteViewSet, basename='vote')

urlpatterns = router.urls
