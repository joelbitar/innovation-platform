# Create a campaign round when a campaign is created
from django.db.models.signals import post_save
from django.dispatch import receiver

from campaign.models import Campaign


@receiver(post_save, sender=Campaign)
def create_campaign_round_on_create(sender, instance: Campaign, created, **kwargs):
    if not created:
        return

    instance.rounds.create(
        name='Round 1',
        description='',
        created_by=instance.created_by,
    )
