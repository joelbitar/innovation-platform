from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from campaign.models import Campaign
from file.models import File
from idea.models import Information, Idea
from lib.permissions.model_permissions import ModelPermissions
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class FileAPICreateTests(AuthenticatedClientTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.user.is_superuser = False
        self.user.save()

    def helper_create_information(self):
        return Information.objects.create(
            title='test',
            created_by=self.user,
            idea=Idea.objects.create(
                title='test',
                description='test',
                created_by=self.user,
                campaign=Campaign.objects.create(
                    name='test',
                    description='test',
                    created_by=self.user
                )
            ),
        )

    # Test should be able to post a file
    def test_should_be_able_to_post_a_file(self):
        self.helper_add_permission(
            self.user,
            'add_file'
        )
        information = self.helper_create_information()
        response = self.client.post(
            reverse(
                'file-list'
            ),
            {
                'namespace': 'test_namespace',
                'related_model': 'idea.Information',
                'related_pk': information.pk,
                'file': SimpleUploadedFile('image.png', b'content', content_type='text/plain'),
            },
            format='multipart'
        )

        with self.subTest('Should work for informations we have access to'):
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

        information.refresh_from_db()
        with self.subTest('Should Not be albe to create a file again'):
            assert information.file is not None

            response = self.client.post(
                reverse(
                    'file-list'
                ),
                {
                    'namespace': 'test_namespace',
                    'related_model': 'idea.Information',
                    'related_pk': information.pk,
                    'file': SimpleUploadedFile('image.png', b'content', content_type='text/plain'),
                },
                format='multipart'
            )

            self.assertEqual(
                409,
                response.status_code,
                response.data
            )

        information.created_by = User.objects.create_user(
            username='testuser2',
            password='testpassword'
        )
        information.file = None
        information.save()

        response = self.client.post(
            reverse(
                'file-list'
            ),
            {
                'namespace': 'test_namespace',
                'related_model': 'idea.Information',
                'related_pk': information.pk,
                'file': SimpleUploadedFile('image.png', b'content', content_type='text/plain'),
            },
            format='multipart'
        )

        with self.subTest('Should not be allowed to add file for information that others created'):
            self.assertEqual(
                403,
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

    # Test that we should be able to update depending on the permissions
    def test_should_be_able_to_update_if_we_created_the_information(self):
        self.helper_add_permission(
            self.user,
            self.PermissionCodeNames.CHANGE_OWN_CREATED_BY_INSTANCES
        )

        information = self.helper_create_information()
        file = File.objects.create(
            namespace='test_namespace',
            file=SimpleUploadedFile('first_file.txt', b'content', content_type='text/plain'),
            created_by=self.user
        )
        information.file = file
        information.save()

        response = self.client.patch(
            reverse(
                'file-detail',
                kwargs={
                    'pk': file.pk
                }
            ),
            {
                'namespace': 'test_namespace',
                'related_model': 'idea.Information',
                'related_pk': information.pk,
                'file': SimpleUploadedFile('second_file.txt', b'new content', content_type='text/plain'),
            },
            format='multipart'
        )

        with self.subTest('Should work if we created the information'):
            self.assertEqual(
                200,
                response.status_code,
                response.data
            )

            information.refresh_from_db()

            self.assertTrue(
                information.file.file.name.endswith(
                    'second_file.txt'
                ),
            )

    def test_should_not_be_able_to_update_if_we_did_not_created_the_information(self):
        self.helper_add_permission(
            self.user,
            self.PermissionCodeNames.CHANGE_OWN_CREATED_BY_INSTANCES,
        )
        self.assertTrue(
            self.user.has_perm(
                ModelPermissions.CHANGE_OWN_CREATED_BY_INSTANCES
            )
        )

        information = self.helper_create_information()
        information.created_by = User.objects.create_user(
            username='testuser2',
            password='testpassword',
        )
        information.save()

        file = File.objects.create(
            namespace='test_namespace',
            file=SimpleUploadedFile('first_file.txt', b'content', content_type='text/plain'),
            created_by=self.user
        )
        information.file = file
        information.save()

        response = self.client.patch(
            reverse(
                'file-detail',
                kwargs={
                    'pk': file.pk
                }
            ),
            {
                'namespace': 'test_namespace',
                'related_model': 'idea.Information',
                'related_pk': information.pk,
                'file': SimpleUploadedFile('second_file.txt', b'new content', content_type='text/plain'),
            },
            format='multipart'
        )

        with self.subTest('Should not work if we did not created the information'):
            self.assertEqual(
                403,
                response.status_code,
                response.data
            )

            information.refresh_from_db()

            self.assertTrue(
                information.file.file.name.endswith(
                    'first_file.txt'
                ),
            )
