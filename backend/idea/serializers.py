from rest_framework import serializers

from user.serializers import CreatedByModelSerializer
from .models import Idea, Vote, Information


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


class IdeaInformationSerializer(CreatedByModelSerializer):
    def create(self, validated_data):
        validated_data['idea'] = self.context.get('idea')
        validated_data['round'] = self.context.get('round', None)

        return super().create(validated_data)

    def get_extra_kwargs(self):
        extra_kwargs = super().get_extra_kwargs()
        extra_kwargs.update(
            {
                'idea': {
                    'required': False,  # This is set in create method
                }
            }
        )
        return extra_kwargs

    class Meta:
        model = Information
        fields = '__all__'
