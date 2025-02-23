from django.conf import settings
from rest_framework_simplejwt.views import TokenBlacklistView as OriginalTokenBlacklistView

from lib.redis import RedisClient


class CustomTokenBlacklistView(OriginalTokenBlacklistView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Clear redis permissions
        if session_key := request.session.session_key:
            # Clear permissions from redis
            RedisClient().delete(
                f'session_user_{session_key}',
            )

        # Clear session
        request.session.flush()

        return super().post(request, *args, **kwargs)
