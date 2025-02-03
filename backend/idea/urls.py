from rest_framework.routers import SimpleRouter

from idea.views import IdeaViewSet

router = SimpleRouter()
router.register('idea', IdeaViewSet, basename='idea')

urlpatterns = router.urls
