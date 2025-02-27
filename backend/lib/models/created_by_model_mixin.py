from django.contrib.auth.models import User
from django.db import models


class CreatedByModel(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='%(class)s_created_by')

    class Meta:
        abstract = True
