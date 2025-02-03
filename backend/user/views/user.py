from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet

from lib.permissions.model_permissions import ModelPermissions
from user.serializers import UserWithProfileSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [
        ModelPermissions,
    ]
    serializer_class = UserWithProfileSerializer

    def get_queryset(self):
        filters = {}

        # If we have sent in anything but 'true' to the 'inactive' query param we want to filter out inactive users
        # This includes if inactive is not set at all
        if not (self.request.query_params.get('inactive', None) == 'true'):
            filters = {
                'is_active': True,
            }

        return User.objects.filter(
            **filters
        ).order_by(
            'first_name',
            'last_name',
            'username',
        ).prefetch_related(
            'profile',
        )
