from rest_framework import mixins, viewsets

from lib.created_by_current_user_helper import CreatedByModelViewSet
from .models import Idea, Vote
from .serializers import IdeaSerializer, VoteSerializer, IdeaDetailSerializer


# Create your views here.
class IdeaViewSet(CreatedByModelViewSet):
    def get_queryset(self):
        return Idea.objects.all()

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return IdeaDetailSerializer

        return IdeaSerializer


class VoteViewSet(CreatedByModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


class CampaignIdeaViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = IdeaDetailSerializer

    def get_queryset(self):
        return Idea.objects.filter(
            campaign_id=self.kwargs['campaign_id']
        )

    def fetch_campaign_ideas(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
