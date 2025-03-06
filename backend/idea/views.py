from rest_framework import mixins, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from campaign.models import CampaignRound
from lib.views.created_by_current_user_helper import CreatedByModelViewSet
from .models import Idea, Vote, Information
from .serializers import IdeaSerializer, VoteSerializer, IdeaDetailSerializer, IdeaInformationSerializer


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

    http_method_names = ['delete']


class CampaignIdeaViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = IdeaDetailSerializer

    def get_queryset(self):
        return Idea.objects.filter(
            campaign_id=self.kwargs['campaign_id']
        )


class RoundMyVoteViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = VoteSerializer

    http_method_names = ['get', ]

    def get_queryset(self):
        return Vote.objects.filter(
            round_id=self.kwargs['round_id'],
            created_by=self.request.user
        )

    def list(self, request, *args, **kwargs):
        vote = self.get_queryset().first()
        if not vote:
            raise NotFound('Vote not found')

        return super().list(request, *args, **kwargs)


class RoundIdeaMyVoteViewSet(RoundMyVoteViewSet):
    serializer_class = VoteSerializer

    http_method_names = ['get', 'post']

    def get_queryset(self):
        return super().get_queryset().filter(
            idea_id=self.kwargs['idea_id'],
        )

    def create(self, request, *args, **kwargs):
        idea = get_object_or_404(Idea, pk=self.kwargs['idea_id'])
        campaign_round = get_object_or_404(CampaignRound, pk=self.kwargs['round_id'])

        vote = idea.add_vote(
            campaign_round,
            request.user,
        )

        return Response(
            VoteSerializer(vote).data,
            status=201
        )


class IdeaInformationViewSet(CreatedByModelViewSet):
    queryset = Information.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(
            idea_id=self.kwargs['idea_id']
        )

    def get_serializer_class(self):
        return IdeaInformationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update(
            {
                'idea': get_object_or_404(Idea, pk=self.kwargs['idea_id']),
            }
        )
        return context


class RoundIdeaInformationViewSet(IdeaInformationViewSet):
    def get_queryset(self):
        return super().get_queryset().filter(
            round_id=self.kwargs['round_id']
        )

    def get_serializer_context(self):
        # add round to the context
        context = super().get_serializer_context()
        context.update(
            {
                'round': get_object_or_404(CampaignRound, pk=self.kwargs['round_id']),
            }
        )

        return context
