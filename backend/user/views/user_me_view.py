from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_api_key.permissions import HasAPIKey

from ..permissions.is_superuser import IsSuperUser
from ..serializers import UserWithPermissionsSerializer


class CurrentUserViewBase(APIView):
    def current_user(self):
        user = self.request.user

        if not user.is_active:
            raise PermissionDenied('User inactivated')

        return user


class UserMeView(CurrentUserViewBase, ModelViewSet):
    """
    View to return data about the currently logged in user
    """

    http_method_names = ['get']

    serializer_class = UserWithPermissionsSerializer

    def get_queryset(self):
        return User.objects.all()

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
    permission_classes = [HasAPIKey | IsSuperUser]

    http_method_names = ['get']
    serializer_class = UserWithPermissionsSerializer

    def get_queryset(self):
        return User.objects.filter().prefetch_related('profile')

    def get_user_detail(self, *args, user_id: int, **kwargs):
        try:
            user = self.get_queryset().get(
                pk=user_id
            )
        except User.DoesNotExist:
            raise NotFound('User not found')

        return Response(
            self.serializer_class(
                user
            ).data
        )
