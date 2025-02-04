from typing import Type

from rest_framework.exceptions import NotFound
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from ..models import Profile
from .me import CurrentUserViewBase
from ..serializers import UserProfileSerializer


class UserMeProfileView(CurrentUserViewBase, ModelViewSet):
    """
    View to work with profile for the currently logged in user
    """
    http_method_names = ['get']

    def get_serializer_class(self) -> Type[UserProfileSerializer]:
        return UserProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(
            user=self.current_user()
        )

    def get_current_user_profile_response(self, request):
        profile = self.get_queryset().first()

        if not profile:
            raise NotFound('Profile does not exist')

        return Response(
            self.get_serializer_class()(profile).data
        )
