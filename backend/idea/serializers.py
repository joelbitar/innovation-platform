from user.serializers import CreatedByModelSerializer
from .models import Idea


class IdeaSerializer(CreatedByModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'
