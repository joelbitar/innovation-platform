import json

from allauth.account.signals import user_logged_in
from django.dispatch import receiver
from django.conf import settings


@receiver(user_logged_in)
def set_session_token_cookie(request, user, response, **kwargs):
    token = json.loads(response.content.decode('utf-8')).get('meta').get('session_token')

    # Set HTTP only cookie
    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=True,
        samesite='Strict',
    )
