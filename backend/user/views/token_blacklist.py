from django.http import JsonResponse
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import ProfileToken


class TokenBlacklistViewSerializer(serializers.Serializer):
    refresh = serializers.CharField(write_only=True, required=True)


class TokenBlacklistView(APIView):
    permission_classes = []
    authentication_classes = []

    serializer_class = TokenBlacklistViewSerializer

    @staticmethod
    def blacklist_refresh_token(refresh_token_string: str):
        refresh_token = RefreshToken(refresh_token_string)
        refresh_token.blacklist()

    @staticmethod
    def get_response_object(data: dict = None, status_code: int = status.HTTP_200_OK):
        response = JsonResponse(
            data or {},
            status=status_code,
        )

        response.delete_cookie('user_token')

        return response

    def post(self, request):
        # Delete the token used on the call
        try:
            if user_token_cookie := request.COOKIES.get('user_token'):
                ProfileToken.objects.get(token=user_token_cookie).delete()
        except ProfileToken.DoesNotExist:
            pass

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return self.get_response_object(
                data=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST
            )

        # Blacklist token
        try:
            self.blacklist_refresh_token(
                serializer.validated_data.get('refresh')
            )
        except TokenError:
            return self.get_response_object(
                status_code=status.HTTP_401_UNAUTHORIZED
            )

        return self.get_response_object(
            status_code=status.HTTP_200_OK
        )
