from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView


class CustomTokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        return response
