from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView

from user.models import Profile


class CustomTokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Generate new token for user
        profile = Profile.objects.get(random_token=request.COOKIES.get('user_token'))
        profile.re_generate_token()

        response.set_cookie(
            key='user_token',
            value=profile.random_token,
            httponly=True,
            secure=True,
            samesite='None',
            expires=60 * 60 * 24 * 7,
        )

        return response
