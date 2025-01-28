from django.core.exceptions import SuspiciousOperation
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import ExtendedUserSerializer


class CurrentUserViewBase(APIView):
    def current_user(self):
        user = self.request.user

        if not user.is_active:
            raise SuspiciousOperation('User is not active')

        return user


class UserMeView(CurrentUserViewBase):
    """
    View to return data about the currently logged in user
    """

    def get(self, request):
        return Response(
            ExtendedUserSerializer(
                self.current_user()
            ).data
        )
