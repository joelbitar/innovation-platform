from rest_framework.permissions import IsAuthenticated

from user.views.helpers.created_by_current_user_helper import CreatedByModelViewSet
from .models import Idea, Vote
from .serializers import IdeaSerializer, VoteSerializer, IdeaDetailSerializer


# Create your views here.
class IdeaViewSet(CreatedByModelViewSet):
    queryset = Idea.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return IdeaDetailSerializer

        return IdeaSerializer


class VoteViewSet(CreatedByModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
