from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from ..models import Profile
from .me import CurrentUserViewBase
from ..serializers import UserProfileSerializer


class UserMeProfileView(CurrentUserViewBase, ModelViewSet):
    """
    View to work with profile for the currently logged in user
    """

    def get_profile(self):
        user = self.current_user()
        profile = Profile.objects.get(user=user)

        return profile

    def get(self, request):
        profile = self.get_profile()

        return Response(
            UserProfileSerializer(profile).data
        )

    def put(self, request):
        data = UserProfileSerializer(data=request.data)

        if not data.is_valid():
            return Response(
                data.errors,
                status=400
            )

        profile = self.get_profile()

        # Update data
        if data.validated_data.get('start_page', None) is not None:
            profile.start_page = data.validated_data.get('start_page', profile.start_page)

        for key, value in data.validated_data.items():
            setattr(profile, key, value)

        profile.save()

        return Response(
            UserProfileSerializer(
                profile
            ).data
        )

