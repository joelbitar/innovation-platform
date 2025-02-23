import json

from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import login

from lib.redis import RedisClient
from user.serializers import CustomTokenObtainPairSerializer, UserWithPermissionsSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        user = User.objects.get(
            pk=response.data.pop('user_id')
        )

        # Session-login with user.
        login(request, user)

        redis_client = RedisClient()
        redis_client.set(
            f'session_user_{request.session.session_key}',
            json.dumps(UserWithPermissionsSerializer(user).data)
        )

        return response
