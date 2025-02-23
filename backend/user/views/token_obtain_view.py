import json

from django.conf import settings
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView

from lib.redis import RedisClient
from user.serializers import CustomTokenObtainPairSerializer, UserWithPermissionsSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Create session if not exists
        if not request.session.session_key:
            request.session.create()

        user = User.objects.get(
            pk=response.data.pop('user_id')
        )

        redis_client = RedisClient()
        redis_client.set(
            f'session_user_{request.session.session_key}',
            json.dumps(UserWithPermissionsSerializer(user).data)
        )

        # Set user_id in session
        request.session['user_id'] = user.pk

        return response
