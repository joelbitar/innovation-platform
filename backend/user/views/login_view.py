import json

from django.contrib.auth import login, authenticate
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from lib.redis import RedisClient
from user.serializers import UserWithPermissionsSerializer, LoginSerializer


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )

        if not user:
            raise AuthenticationFailed('Invalid login credentials')

        login(request, user)

        response_data = UserWithPermissionsSerializer(user).data

        redis_client = RedisClient()
        redis_client.set(
            f'session_user_{request.session.session_key}',
            json.dumps(response_data)
        )

        return Response(
            response_data,
            status=status.HTTP_200_OK
        )
