import string
import uuid
from datetime import datetime
import random
from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from file.models import RelatedFile, Thingy


class OneToOneFieldTest(TestCase):
    # Test how we can get the related object and use that as part of the file name
    @patch('uuid.uuid4', return_value='1234')
    @patch('django.utils.timezone.now', return_value=datetime(year=2021, month=1, day=1))
    def test_create_file_should_create_and_save_new_file(self, *args, **kwargs):
        random_file_name = "".join(random.choices(string.ascii_letters, k=17))

        file = RelatedFile.objects.create_file(
            created_by=User.objects.create_user(username='test_user'),
            namespace='test_namespace',
            file=SimpleUploadedFile(f'file_{random_file_name}.txt', b'file content')
        )

        with self.subTest('Test file is created'):
            self.assertIsNotNone(file)

        with self.subTest('Test file is saved with correct path'):
            self.assertEqual(
                file.file.name,
                f'test_namespace/2021-01-01/1234/file_{random_file_name}.txt'
            )

        with self.subTest('Test file is saved with correct filename'):
            self.assertEqual(
                file.filename,
                f'file_{random_file_name}.txt'
            )
