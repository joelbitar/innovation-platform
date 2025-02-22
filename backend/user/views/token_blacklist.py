from django.conf import settings
from rest_framework_simplejwt.views import TokenBlacklistView as OriginalTokenBlacklistView

from lib.redis import RedisClient


class CustomTokenBlacklistView(OriginalTokenBlacklistView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Delete the token used on the call
        try:
            del request.session['user_id']
        except KeyError:
            # User id is not set, never mind.
            pass

        # Clear permissions from redis
        RedisClient().delete(
            f'session_user_{request.session.session_key}',
        )

        return super().post(request, *args, **kwargs)
