import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from campaign.models import CampaignRound, Campaign
from lib.models.created_by_model_mixin import CreatedByModel


# Create your models here.
class Idea(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ideas")
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="ideas")

    class Visibility(models.TextChoices):
        PUBLIC = "PUBLIC"
        BUSINESS_AREA = "BUSINESS_AREA"
        PRIVATE = "PRIVATE"

    visibility = models.CharField(max_length=32, choices=Visibility.choices, default=Visibility.PRIVATE)

    def has_voted(self, campaign_round: CampaignRound, user: User) -> bool:
        return Vote.objects.filter(idea=self, round=campaign_round, created_by=user).exists()

    def add_vote(self, campaign_round: CampaignRound, user: User) -> "Vote":
        return Vote.objects.create(idea=self, round=campaign_round, created_by=user)

    def __str__(self):
        return self.title


# Abstract classes for IdeaData, All data around ideas should inherit this class.
class IdeaData(CreatedByModel):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta(CreatedByModel.Meta):
        abstract = True


# Abstract classes for IdeaRoundData, All data around ideas in a specific round should inherit this class.
class IdeaRoundData(IdeaData):
    round = models.ForeignKey(CampaignRound, on_delete=models.CASCADE)

    class Meta(IdeaData.Meta):
        abstract = True


class IdeaFolder(IdeaData):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


# Holds all kinds of information about an idea
class Information(IdeaRoundData):
    def get_file_path(self, filename):
        return f"idea/{self.idea.pk}/files/{timezone.now().isoformat('-')[:10]}/{uuid.uuid4()}/{filename}"

    deleted = models.BooleanField(default=False)
    folder = models.ForeignKey(IdeaFolder, on_delete=models.CASCADE, related_name="information", null=True, blank=True)
    round = models.ForeignKey(CampaignRound, on_delete=models.CASCADE, related_name="information", null=True, blank=True)
    title = models.CharField(max_length=255, default="", blank=True)
    text = models.TextField(default="", blank=True)
    file = models.FileField(upload_to=get_file_path, null=True, blank=True)


class Comment(IdeaRoundData):
    text = models.TextField()
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class Star(IdeaData):
    class Meta(IdeaData.Meta):
        unique_together = ("created_by", "idea")


class Vote(IdeaRoundData):
    class Meta(IdeaRoundData.Meta):
        unique_together = ("created_by", "idea", "round")


class RoundVoteCount(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    round = models.ForeignKey(CampaignRound, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.idea.title} - {self.count}"

    class Meta(CreatedByModel.Meta):
        unique_together = ("idea", "round")
