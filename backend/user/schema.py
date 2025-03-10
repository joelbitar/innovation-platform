from django.contrib.auth.models import User
from drf_spectacular.extensions import OpenApiAuthenticationExtension, OpenApiViewExtension
from rest_framework import serializers


class MyAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'allauth.headless.contrib.rest_framework.authentication.XSessionTokenAuthentication'  # full import path OR class ref
    name = 'CookieSessionTokenAuthentication'  # name used in the schema

    def get_security_definition(self, auto_schema):
        return {
            'type': 'Session Token',
            'in': 'Cookies',
            'name': 'session-token',
        }

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class AllauthHeadlessLoginView(OpenApiViewExtension):
    target_class = 'allauth.headless.account.views.LoginView'

    def view_replacement(self):
        class Fixed(self.target_class):
            queryset = User.objects.none()
            serializer_class = LoginSerializer
        return Fixed