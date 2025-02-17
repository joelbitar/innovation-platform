from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from user.serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            response.set_cookie(
                key='user_token',
                value=response.data['user_token'],
                httponly=True,
                secure=True,
                samesite='None',
                expires=60 * 60 * 24 * 7,
            )

        return response
