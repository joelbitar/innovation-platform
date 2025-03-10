import random
import string
from typing import Optional

from django.core.handlers.wsgi import WSGIRequest
from django.test import SimpleTestCase

from django.conf import settings

from django.test import RequestFactory

from user.middleware.allauth_session_middleware import AllauthSessionMiddleware


class SessionTokenMiddlewareTests(SimpleTestCase):
    def helper_get_request(self, session_token_value: Optional[str]) -> WSGIRequest:
        request_factory = RequestFactory()
        http_request = request_factory.get('/')

        if session_token_value:
            http_request.COOKIES[settings.SESSION_COOKIE_NAME] = session_token_value

        return http_request

    def test_get_session_token_from_session_cookie_name(self):
        http_request = self.helper_get_request(
            (session_token_value := "".join(random.choices(string.ascii_letters, k=32)))
        )

        middleware = AllauthSessionMiddleware()

        self.assertEqual(
            session_token_value,
            middleware.get_session_token(http_request),
        )

    # Test should return None if no cookie is present
    def test_should_return_none_if_no_cookie_is_present(self):
        http_request = self.helper_get_request(
            None
        )

        middleware = AllauthSessionMiddleware()

        self.assertIsNone(
            middleware.get_session_token(http_request),
        )
