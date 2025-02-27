from django.contrib.auth import logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lib.redis import RedisClient


class LogoutView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Clear redis permissions
        if session_key := request.session.session_key:
            # Clear permissions from redis
            RedisClient().delete(
                f'session_user_{session_key}',
            )

        # Clear session and logout
        logout(request)

        return Response(
            status=status.HTTP_200_OK,
            data={}
        )
