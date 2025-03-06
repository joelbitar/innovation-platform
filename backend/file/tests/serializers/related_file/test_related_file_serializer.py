from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase

from file.models import RelatedFile
from file.serializers import RelatedFileSerializer


class FileRelatedFileSerializerTests(SimpleTestCase):
    # Test should get filename from serializer data
    def test_should_get_filename_from_serialized_data(self):
        serializer = RelatedFileSerializer(
            related_file := RelatedFile(
                namespace='test_namespace',
                file=(file := SimpleUploadedFile((file_name := "test_file.txt"), b"file_content"))
            )
        )

        data = serializer.data

        with self.subTest('Should have filename in serializer'):
            self.assertTrue(
                'filename' in data
            )
            self.assertEqual(
                data['filename'],
                file_name,
            )

        with self.subTest('Should have url to file in serialized data'):
            self.assertTrue(
                'url' in data
            )

            self.assertEqual(
                RelatedFileSerializer.get_url(related_file),
                data['url']
            )
