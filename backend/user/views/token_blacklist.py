from rest_framework_simplejwt.views import TokenBlacklistView as OriginalTokenBlacklistView


class CustomTokenBlacklistView(OriginalTokenBlacklistView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Delete the token used on the call
        try:
            del request.session['user_id']
        except KeyError:
            # User id is not set, never mind.
            pass

        return super().post(request, *args, **kwargs)
