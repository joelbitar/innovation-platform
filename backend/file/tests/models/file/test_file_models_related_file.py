from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase

from file.models import RelatedFile


class FileModelsRelatedFileTests(SimpleTestCase):
    def test_str_method_of_related_file(self):
        file = RelatedFile(
            file=SimpleUploadedFile((file_name := "test_file.txt"), b"file_content")
        )

        self.assertEqual(
            file.file.name,
            file_name
        )

        self.assertEqual(
            str(file),
            file_name
        )
