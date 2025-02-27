from django.contrib.auth.models import User
from django.db import models

from business.models import BusinessArea


# Create your models here.
class Campaign(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="campaigns")
    business_areas = models.ManyToManyField(BusinessArea, blank=True)

    def __str__(self):
        return self.name


class CampaignRound(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rounds")
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="rounds")

    # active_from = models.DateTimeField(null=True, blank=True, default=None)
    # active_to = models.DateTimeField(null=True, blank=True, default=None)

    def __str__(self):
        return self.name

# CampaignRounds should have a set of idea-fields where we can specify what kind of data we want to collect for each idea on each round.