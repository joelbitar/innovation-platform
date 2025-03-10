"""
Intercepts login requests and sets a session token cookie on the response.
"""
import typing

from allauth.headless.contrib.rest_framework.authentication import XSessionTokenAuthentication
from django.http import HttpRequest

from django.conf import settings


class AllauthSessionMiddleware(XSessionTokenAuthentication):
    def get_session_token(self, request: HttpRequest) -> typing.Optional[str]:
        return request.COOKIES.get(
            settings.SESSION_COOKIE_NAME,
        )
