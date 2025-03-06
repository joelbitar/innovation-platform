import os
import uuid
from fileinput import filename

from django.db import models
from django.conf import settings
from django.utils import timezone
from django_softdelete.models import SoftDeleteModel

from lib.models.created_by_model_mixin import CreatedByModel


class Folder(SoftDeleteModel):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, related_name="children", null=True, blank=True)

    def __str__(self):
        return self.name


class FileManager(models.Manager):
    def create_file(self, namespace: str, file, **kwargs):
        return self.create(
            namespace=namespace,
            file=file,
            **kwargs,
        )


# Holds all kinds of information about an idea
class RelatedFile(SoftDeleteModel, CreatedByModel):
    def get_file_path(self, file_name):
        return os.path.join(
            self.namespace,
            timezone.now().isoformat('-')[:10],
            str(uuid.uuid4()),
            file_name
        )

    objects = FileManager()

    created_at = models.DateTimeField(auto_now_add=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="information", null=True, blank=True, default=None)
    namespace = models.CharField(max_length=255, editable=False)
    file = models.FileField(upload_to=get_file_path)

    @property
    def filename(self):
        return os.path.basename(self.file.name)

    def __str__(self):
        return self.file.name
