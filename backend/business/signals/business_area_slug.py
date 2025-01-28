from django.db.models.signals import pre_save

from django.dispatch import receiver
from django.utils.text import slugify

from ..models import BusinessArea


# Signal for setting or updating the slug of a business area
@receiver(pre_save, sender=BusinessArea)
def create_or_update_slug(sender, instance: BusinessArea, **kwargs):
    instance.slug = slugify(instance.name)
