import string

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

from file.models import RelatedFile
import random


class FileTestsMixin:
    def helper_create_file(self, namespace=None, file=None, created_by=None, **kwargs):
        namespace = namespace or "".join(
            random.choices(
                string.ascii_letters, k=20
            )
        )

        file = file or SimpleUploadedFile(
            f'file_{"".join(random.choices(string.ascii_letters, k=17))}.txt',
            b'file content'
        )

        created_by = created_by or getattr(self, 'user', User.objects.create_user(
                username="".join(random.choices(string.ascii_letters, k=20)),
                password='test_password'
            )
        )

        return RelatedFile.objects.create_file(
            namespace=namespace,
            created_by=created_by,
            file=file,
        )
