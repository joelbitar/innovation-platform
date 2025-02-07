from django.contrib.auth.models import User
from django.core.exceptions import SuspiciousOperation
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_api_key.permissions import HasAPIKey

from ..serializers import UserWithPermissionsSerializer


class CurrentUserViewBase(APIView):
    def current_user(self):
        user = self.request.user

        if not user.is_active:
            raise SuspiciousOperation('User is not active')

        return user


class UserMeView(CurrentUserViewBase, ModelViewSet):
    permission_classes = [IsAuthenticated]
    """
    View to return data about the currently logged in user
    """

    http_method_names = ['get']

    serializer_class = UserWithPermissionsSerializer

    def get_for_current_logged_in_user(self, request):
        return Response(
            self.serializer_class(
                self.current_user()
            ).data
        )


class UserView(ModelViewSet):
    """
    View to return data about a specific user
    """
    permission_classes = [HasAPIKey]

    http_method_names = ['get']
    serializer_class = UserWithPermissionsSerializer

    def get_queryset(self):
        return User.objects.filter().prefetch_related('profile')
