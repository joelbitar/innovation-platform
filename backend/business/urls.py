# Register the urls for the business app in rest framework router
from django.urls import include
from rest_framework.routers import SimpleRouter

from business.views import BusinessAreaViewSet

router = SimpleRouter()

router.register('business_area/', BusinessAreaViewSet, basename='business_area')

urlpatterns = router.urls
