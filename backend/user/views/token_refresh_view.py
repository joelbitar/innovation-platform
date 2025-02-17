from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView

from user.models import ProfileToken


class CustomTokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Generate new token for user
        profile_token = ProfileToken.objects.get(token=request.COOKIES.get('user_token'))
        profile_token.re_generate()

        response.set_cookie(
            key='user_token',
            value=profile_token.token,
            httponly=True,
            secure=True,
            samesite='None',
            expires=60 * 60 * 24 * 7,
        )

        return response
