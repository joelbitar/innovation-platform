from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from user.serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Set user_id in session and remove from response data
        request.session['user_id'] = response.data.pop('user_id')

        return response
