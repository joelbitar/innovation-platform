from django.db import models
from rest_framework.authtoken.admin import User


# Create your models here.
class Campaign(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="campaigns")

    def __str__(self):
        return self.name


class Round(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="rounds")
    public = models.BooleanField(default=False, help_text='If contributors can see this round')

    def __str__(self):
        return self.name
