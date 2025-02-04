from django.core.exceptions import SuspiciousOperation
from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken


class TokenBlacklistView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def blacklist_refresh_token(refresh_token_string: str):
        refresh_token = RefreshToken(refresh_token_string)
        refresh_token.blacklist()

    def post(self, request):
        refresh_token_string = request.data.get('refresh')

        # If there is no token in the request, return bad request
        if refresh_token_string is None:
            return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)

        # Blacklist token
        try:
            self.blacklist_refresh_token(refresh_token_string)
        except TokenError:
            raise SuspiciousOperation('Token is invalid')

        # Return ok.
        return JsonResponse({})
