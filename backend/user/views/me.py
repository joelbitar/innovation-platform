from django.contrib.auth.models import User
from django.core.exceptions import SuspiciousOperation
from django.http import QueryDict
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_api_key.permissions import HasAPIKey

from ..permissions.user_session_with_api_key_or_authenticated import UserSessionWithAPIKeyOrAuthenticated
from ..serializers import UserWithPermissionsSerializer


class CurrentUserViewBase(APIView):
    def current_user(self):
        user = self.request.user

        if not user.is_active:
            raise SuspiciousOperation('User is not active')

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
    permission_classes = [HasAPIKey]

    http_method_names = ['get']
    serializer_class = UserWithPermissionsSerializer

    def get_queryset(self):
        return User.objects.filter().prefetch_related('profile')

    def get_filter_kwargs(self, query_params: QueryDict):
        if user_id := query_params.get('id'):
            return {
                'id': user_id
            }

        raise SuspiciousOperation('no filters applied')

    def get_user_response(self, user_id: int):
        if not user_id:
            raise SuspiciousOperation('No user id provided')

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

    def get_user_detail(self, request):
        return self.get_user_response(
            request.query_params.get('id')
        )

    def get_session_user_detail(self, request):
        user_id = request.session.get('user_id')

        if not user_id:
            raise NotFound('No user id in session')

        return self.get_user_response(
            user_id=user_id
        )
