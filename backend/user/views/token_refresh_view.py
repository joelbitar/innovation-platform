from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView


class CustomTokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Expire session soon if it exists.
        if request.session.session_key:
            request.session.set_expiry(1 * 60)
            request.session.save()

        request.session.create()

        request.session['user_id'] = request.user.pk

        request.session.save()

        return super().post(request, *args, **kwargs)
