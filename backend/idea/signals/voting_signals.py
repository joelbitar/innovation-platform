# When we create or delete a vote we shall count the votes on the idea and create/update RoundVoteCount
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from ..models import Vote


def update_round_vote_count(idea, round):
    idea.roundvotecount_set.update_or_create(
        round=round,
        defaults={"count": Vote.objects.filter(idea=idea, round=round).count()}
    )


@receiver(post_save, sender=Vote)
def create_round_vote_count(sender, instance: Vote, created, **kwargs):
    update_round_vote_count(instance.idea, instance.round)


@receiver(post_delete, sender=Vote)
def delete_round_vote_count(sender, instance: Vote, **kwargs):
    update_round_vote_count(instance.idea, instance.round)
