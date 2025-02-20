import datetime
import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


def get_random_token():
    while True:
        token = uuid.uuid4().hex
        if not ProfileToken.objects.filter(token=token).exists():
            return token


def get_expires_at():
    from django.conf import settings

    return timezone.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']


class ProfileManager(models.Manager):
    def get_by_token(self, token: str) -> 'Profile':
        return self.get(
            tokens__token=token,
            tokens__expires_at__gt=timezone.now(),
        )


class Profile(models.Model):
    class Type(models.TextChoices):
        CONTRIBUTOR = "CONTRIBUTOR"
        MODERATOR = "MODERATOR"
        ADMIN = "ADMIN"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=32, choices=Type.choices, default=Type.CONTRIBUTOR)

    objects = ProfileManager()

    def generate_token(self) -> 'ProfileToken':
        return self.tokens.create()

    def clear_expired_tokens(self):
        self.tokens.filter(expires_at__lt=timezone.now()).delete()

    def __str__(self):
        return f"{self.user.username}'s profile <{self.type.lower()}>"

    def create_token(self):
        return self.tokens.create()


class ProfileToken(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="tokens")
    token = models.CharField(max_length=32, default=get_random_token, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(default=get_expires_at)

    def re_generate(self, save: bool = True):
        self.token = get_random_token()

        if save:
            self.save()

    def __str__(self):
        return f"{self.profile.user.username}'s token: {self.token}"
