import os
import uuid

from django.db import models
from django.conf import settings
from django.utils import timezone
from django_softdelete.models import SoftDeleteModel


class Folder(SoftDeleteModel):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, related_name="children", null=True, blank=True)

    def __str__(self):
        return self.title


# Holds all kinds of information about an idea
class File(SoftDeleteModel):
    def get_file_path(self, filename):
        return os.path.join(
            str(settings.MEDIA_ROOT or ""),
            'files',
            timezone.now().isoformat('-')[:10],
            str(uuid.uuid4()),
            filename
        )

    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="information", null=True, blank=True)
    filename = models.CharField(max_length=255, default="", blank=True)
    file = models.FileField(upload_to=get_file_path, null=True, blank=True)
