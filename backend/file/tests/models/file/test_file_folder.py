from datetime import datetime
from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from file.models import File, Thingy


class OneToOneFieldTest(TestCase):
    # Test how we can get the related object and use that as part of the file name
    @patch('uuid.uuid4', return_value='1234')
    @patch('django.utils.timezone.now', return_value=datetime(year=2021, month=1, day=1))
    def test_get_file_path_should_have_namespace_in_it(self, *args, **kwargs):
        file = File.objects.create_file(
            namespace='test_namespace',
            file=SimpleUploadedFile('file.txt', b'file content')
        )

        self.assertEqual(
            file.file.name,
            'test_namespace/2021-01-01/1234/file.txt'
        )