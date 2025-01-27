from django.contrib.auth.models import User
from django.db import models

from ..campaign.models import Round


# Create your models here.
class Idea(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ideas")

    class Visibility(models.TextChoices):
        PUBLIC = "PUBLIC"
        BUSINESS_AREA = "BUSINESS_AREA"
        PRIVATE = "PRIVATE"

    visibility = models.CharField(max_length=32, choices=Visibility.choices, default=Visibility.PRIVATE)

    def __str__(self):
        return self.title


class Comment(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return self.text


class Star(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stars")
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="stars")

    class Meta:
        unique_together = ("user", "idea")


class Vote(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="votes")
    round = models.ForeignKey(Round, on_delete=models.CASCADE, related_name="votes")

    class Meta:
        unique_together = ("user", "idea", "round")


class IdeaRoundVoteCount(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.idea.title} - {self.count}"

    class Meta:
        unique_together = ("idea", "round")
