# When we create or delete a vote we shall count the votes on the idea and create/update RoundVoteCount
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from ..models import Vote


@receiver(post_delete, sender=Vote)
@receiver(post_save, sender=Vote)
def create_round_vote_count(sender, instance: Vote, created, **kwargs):
    instance.idea.roundvotecount_set.update_or_create(
        round=instance.round,
        defaults={"count": Vote.objects.filter(idea=instance.idea, round=instance.round).count()}
    )
