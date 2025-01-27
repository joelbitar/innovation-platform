from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class BusinessArea(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(default="")
    users = models.ManyToManyField(User, related_name="business_areas", blank=True)

    prepopulated_fields = {"slug": ("name",)}

    def __str__(self):
        return self.name
