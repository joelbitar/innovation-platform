import os
import uuid
from fileinput import filename

from django.db import models
from django.conf import settings
from django.utils import timezone
from django_softdelete.models import SoftDeleteModel


class Folder(SoftDeleteModel):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, related_name="children", null=True, blank=True)

    def __str__(self):
        return self.title


class FileManager(models.Manager):
    def create_file(self, namespace, file, **kwargs):
        return self.create(
            namespace=namespace,
            filename=file.name,
            file=file,
            **kwargs,
        )

# Holds all kinds of information about an idea
class File(SoftDeleteModel):
    def get_file_path(self, filename):
        return os.path.join(
            self.namespace,
            timezone.now().isoformat('-')[:10],
            str(uuid.uuid4()),
            filename
        )

    objects = FileManager()

    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="information", null=True, blank=True)
    namespace = models.CharField(max_length=255)
    filename = models.CharField(max_length=255, default="", blank=True)
    file = models.FileField(upload_to=get_file_path, null=True, blank=True)

class Thingy(models.Model):
    name = models.CharField(max_length=255)
    media_thing = models.OneToOneField(File, on_delete=models.CASCADE, related_name='thingy', null=True)