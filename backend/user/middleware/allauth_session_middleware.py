"""
Intercepts login requests and sets a session token cookie on the response.
"""


class AllauthSessionMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if response.status_code == 200:
            if request.user.is_authenticated:
                response.set_cookie(
                    key='session-token',
                    value=request.user.get_session_token(),
                    httponly=True,
                    secure=settings.SESSION_COOKIE_SECURE,
                    samesite='Strict',
                )
        return response
