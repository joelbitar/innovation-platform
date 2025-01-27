from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    class Type(models.TextChoices):
        CONTRIBUTOR = "CONTRIBUTOR"
        MODERATOR = "MODERATOR"
        ADMIN = "ADMIN"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=32, choices=Type.choices, default=Type.CONTRIBUTOR)
