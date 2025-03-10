from drf_spectacular.extensions import OpenApiAuthenticationExtension


class MyAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'allauth.headless.contrib.rest_framework.authentication.XSessionTokenAuthentication'  # full import path OR class ref
    name = 'CookieSessionTokenAuthentication'  # name used in the schema

    def get_security_definition(self, auto_schema):
        return {
            'type': 'Session Token',
            'in': 'Cookies',
            'name': 'session-token',
        }