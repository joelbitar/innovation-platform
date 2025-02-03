from rest_framework.permissions import IsAuthenticated

from user.views.helpers.created_by_current_user_helper import CreatedByModelViewSet
from .models import Idea
from .serializers import IdeaSerializer


# Create your views here.
class IdeaViewSet(CreatedByModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]
