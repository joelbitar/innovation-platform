from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from file.models import File
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class FileAPICreateTests(AuthenticatedClientTestCase):
    # Test should be able to post a file
    def test_should_be_able_to_post_a_file(self):
        response = self.client.post(
            reverse(
                'file-list'
            ),
            {
                'namespace': 'test_namespace',
                'file': SimpleUploadedFile('image.png', b'content', content_type='text/plain'),
            },
            format='multipart'
        )

        self.assertEqual(
            201,
            response.status_code,
            response.data
        )

        self.assertEqual(
            1,
            File.objects.all().count(),
        )

        self.assertIsNotNone(
            file := File.objects.first()
        )

        self.assertEqual(
            'test_namespace',
            file.namespace
        )

