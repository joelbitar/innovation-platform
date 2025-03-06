from typing import Type

from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .user_me_view import CurrentUserViewBase
from ..models import Profile
from ..serializers import UserMeProfileSerializer


class UserMeProfileView(CurrentUserViewBase, ModelViewSet):
    """
    View to work with profile for the currently logged in user
    """
    http_method_names = ['get', 'patch']

    def get_serializer_class(self) -> Type[UserMeProfileSerializer]:
        return UserMeProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(
            user=self.current_user()
        )

    def get_profile(self):
        if (profile := self.get_queryset().first()) is None:
            raise NotFound('Profile does not exist')

        return profile

    def patch_for_logged_in_user(self, request):
        profile = self.get_profile()

        serializer = self.get_serializer_class()(
            profile,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data
        )

    def get_for_logged_in_user(self, request):
        profile = self.get_profile()

        return Response(
            self.get_serializer_class()(profile).data
        )
