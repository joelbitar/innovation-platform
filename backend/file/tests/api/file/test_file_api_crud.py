from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from campaign.models import Campaign
from file.models import RelatedFile
from idea.models import Information, Idea
from lib.permissions.created_by_model_permissions import CreatedByModelPermissions
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
    @patch('file.fields.RelatedFileField.get_namespace', return_value='test_namespace')
    def test_should_be_able_to_post_a_file(self, mock_get_namespace):
        self.helper_add_permission(
            self.user,
            'add_relatedfile'
        )
        information = self.helper_create_information()
        response = self.client.post(
            reverse(
                'file-list'
            ),
            {
                'related_model': 'idea.Information',
                'related_pk': information.pk,
                'file': SimpleUploadedFile('image.png', b'content', content_type='text/plain'),
            },
            format='multipart'
        )

        with self.subTest('Should query get_namespace function'):
            mock_get_namespace.assert_called_once()

        with self.subTest('Should work for informations we have access to'):
            self.assertEqual(
                201,
                response.status_code,
                response.data
            )

            self.assertEqual(
                1,
                RelatedFile.objects.all().count(),
            )

            self.assertIsNotNone(
                file := RelatedFile.objects.first()
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
                RelatedFile.objects.all().count(),
            )

            self.assertIsNotNone(
                file := RelatedFile.objects.first()
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
        file = RelatedFile.objects.create(
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
                CreatedByModelPermissions.CHANGE_OWN_CREATED_BY_INSTANCES
            )
        )

        information = self.helper_create_information()
        information.created_by = User.objects.create_user(
            username='testuser2',
            password='testpassword',
        )
        information.save()

        file = RelatedFile.objects.create(
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

    # Test should not be able to upload file to a model if I do not have the change own created by instances permission
    def test_should_not_be_able_to_upload_file_to_a_model_if_i_do_not_have_the_change_own_created_by_instances_permission(self):
        self.assertFalse(
            self.user.has_perm(
                CreatedByModelPermissions.CHANGE_OWN_CREATED_BY_INSTANCES
            )
        )

        information = self.helper_create_information()
        information.created_by = self.user
        information.save()

        file = RelatedFile.objects.create(
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

