from rest_framework.routers import SimpleRouter

from file.views import FileModelViewSet

router = SimpleRouter()

router.register('', FileModelViewSet, basename='file')

urlpatterns = router.urls
