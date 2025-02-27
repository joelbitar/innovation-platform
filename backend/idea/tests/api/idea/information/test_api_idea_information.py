from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient

from campaign.models import Campaign, CampaignRound
from idea.models import Idea, Information
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class IdeaInformationTestsBase(AuthenticatedClientTestCase):
    def setUp(self):
        super().setUp()

        self.campaign = Campaign.objects.create(
            name='Test Campaign',
            created_by=self.user
        )

        self.campaign_round = CampaignRound.objects.create(
            name='Test Campaign Round',
            campaign=self.campaign,
            created_by=self.user
        )

        self.idea = Idea.objects.create(
            campaign=self.campaign,
            created_by=self.user,
        )


class IdeaInformationTests(IdeaInformationTestsBase):

    # Test should be able to create information
    def test_should_be_able_to_create_information(self):
        response = self.client.post(
            reverse(
                'round_idea_information-list',
                kwargs={
                    'round_id': self.campaign_round.id,
                    'idea_id': self.idea.id
                }
            ),
            {
                'title': 'Test Information',
                'text': 'Test Content'
            }
        )

        with self.subTest('Response should be 201'):
            self.assertEqual(201, response.status_code, response.content)
            self.assertEqual('Test Information', response.data['title'])
            self.assertEqual('Test Content', response.data['text'])

        information = Information.objects.all().first()

        with self.subTest('Information should have been created'):
            self.assertIsNotNone(information)
            self.assertEqual('Test Information', information.title)
            self.assertEqual('Test Content', information.text)
            self.assertEqual(self.user, information.created_by)
            self.assertEqual(self.campaign_round, information.round)
            self.assertEqual(self.idea, information.idea)

        with self.subTest('Should not be able to delete other users information'):
            other_user = User.objects.create_user(
                username='other_user',
                password='other_password'
            )
            other_user.is_active = True
            other_user.save()

            client = APIClient()
            client.force_authenticate(other_user)

            response = client.delete(
                reverse(
                    'round_idea_information-detail',
                    kwargs={
                        'round_id': self.campaign_round.id,
                        'idea_id': self.idea.id,
                        'pk': information.id
                    }
                )
            )

            self.assertEqual(403, response.status_code, response.content)

    def test_should_be_able_to_delete_own_information(self):
        user = User.objects.create_user(
            username='testuser2',
            password='testpassword'
        )

        information = Information.objects.create(
            title='Test Information',
            text='Test Content',
            created_by=user,
            round=self.campaign_round,
            idea=self.idea
        )

        client = APIClient()
        client.force_authenticate(user)

        with self.subTest('Should be able to delete own information'):
            response = client.delete(
                reverse(
                    'round_idea_information-detail',
                    kwargs={
                        'round_id': self.campaign_round.id,
                        'idea_id': self.idea.id,
                        'pk': information.id
                    }
                )
            )

            self.assertEqual(
                204,
                response.status_code,
                response.content
            )

            self.assertFalse(
                Information.objects.filter(
                    id=information.id
                ).exists()
            )

        with self.subTest('Should not work for others information'):
            information.created_by = User.objects.create_user(
                username='testuser3',
                password='testpassword'
            )
            information.save()

            response = client.delete(
                reverse(
                    'round_idea_information-detail',
                    kwargs={
                        'round_id': self.campaign_round.id,
                        'idea_id': self.idea.id,
                        'pk': information.id
                    }
                )
            )

            self.assertEqual(
                403,
                response.status_code,
                response.content
            )


class IdeaInformationFileTests(IdeaInformationTestsBase):
    # Test should be able to upload file

    def tearDown(self):
        for information in Information.objects.all():
            information.file.delete()
        super().tearDown()

    def test_should_be_able_to_upload_file(self):
        response = self.client.post(
            reverse(
                'round_idea_information-list',
                kwargs={
                    'round_id': self.campaign_round.id,
                    'idea_id': self.idea.id
                }
            ),
            {
                'title': 'Test Information',
                'file': SimpleUploadedFile('test.txt', b'test content')
            }
        )

        with self.subTest('Response should be 201'):
            self.assertEqual(201, response.status_code, response.content)
            self.assertEqual('Test Information', response.data['title'])
            self.assertIsNotNone(response.data['file'])

        information = Information.objects.all().first()

        with self.subTest('Information should have been created with file'):
            self.assertIsNotNone(information.file)

