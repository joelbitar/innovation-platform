from django.http import JsonResponse
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import ProfileToken


class TokenBlacklistViewSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh = attrs.get('refresh')

        if refresh is None:
            raise serializers.ValidationError('No refresh token provided')

        return attrs


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
        refresh_token_string = request.data.get('refresh')

        # Delete the token used on the call
        try:
            user_token_cookie = request.COOKIES.get('user_token')
            ProfileToken.objects.get(token=user_token_cookie).delete()
        except ProfileToken.DoesNotExist:
            pass

        # If there is no token in the request, return bad request
        if refresh_token_string is None:
            return self.get_response_object(
                status_code=status.HTTP_400_BAD_REQUEST
            )

        # Blacklist token
        try:
            self.blacklist_refresh_token(refresh_token_string)
        except TokenError:
            return self.get_response_object(
                status_code=status.HTTP_401_UNAUTHORIZED
            )

        return self.get_response_object(
            status_code=status.HTTP_200_OK
        )
