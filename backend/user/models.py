import uuid

from django.contrib.auth.models import User
from django.db import models


def get_random_token():
    return uuid.uuid4().hex


class Profile(models.Model):
    class Type(models.TextChoices):
        CONTRIBUTOR = "CONTRIBUTOR"
        MODERATOR = "MODERATOR"
        ADMIN = "ADMIN"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=32, choices=Type.choices, default=Type.CONTRIBUTOR)
    random_token = models.CharField(max_length=32, unique=True, default=get_random_token)

    def re_generate_token(self, save: bool = True):
        self.random_token = get_random_token()

        if save:
            self.save()

    def invalidate_token(self):
        self.random_token = ""
        self.save()

    def __str__(self):
        return f"{self.user.username}'s profile <{self.type.lower()}>"
