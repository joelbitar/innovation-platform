import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from campaign.models import CampaignRound, Campaign


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


class IdeaData(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class IdeaRoundData(IdeaData):
    round = models.ForeignKey(CampaignRound, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Information(IdeaRoundData):
    def get_file_path(self, filename):
        return f"idea/{self.idea.pk}/files/{timezone.now().isoformat('-')[:10]}/{uuid.uuid4()}/{filename}"

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
    class Meta:
        unique_together = ("created_by", "idea")


class Vote(IdeaRoundData):
    class Meta:
        unique_together = ("created_by", "idea", "round")


class RoundVoteCount(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    round = models.ForeignKey(CampaignRound, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.idea.title} - {self.count}"

    class Meta:
        unique_together = ("idea", "round")
