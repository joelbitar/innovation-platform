from rest_framework import serializers

from user.serializers import CreatedByModelSerializer
from .models import Idea, Vote


class RoundVotesSerializer(serializers.Serializer):
    round_pk = serializers.IntegerField(source='round.pk')
    count = serializers.IntegerField()


class IdeaSerializer(CreatedByModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'


class IdeaDetailSerializer(IdeaSerializer):
    round_votes = RoundVotesSerializer(many=True, source='roundvotecount_set')

    class Meta:
        model = Idea
        extra_fields = ['round_votes']
        fields = IdeaSerializer.Meta.fields


class VoteSerializer(CreatedByModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'
