from django.contrib.auth.models import User, Permission
from django.urls import reverse
from rest_framework.test import APIClient

from campaign.models import Campaign, CampaignRound
from idea.models import Idea, Information
from user.tests.helpers.authenticated_test_case import AuthenticatedClientTestCase


class IdeaInformationTests(AuthenticatedClientTestCase):
    # Test should be able to create information
    def test_should_be_able_to_create_information(self):
        campaign = Campaign.objects.create(
            name='Test Campaign',
            created_by=self.user
        )

        campaign_round = CampaignRound.objects.create(
            name='Test Campaign Round',
            campaign=campaign,
            created_by=self.user
        )

        idea = Idea.objects.create(
            campaign=campaign,
            created_by=self.user,
        )

        response = self.client.post(
            reverse(
                'round_idea_information-list',
                kwargs={
                    'round_id': campaign_round.id,
                    'idea_id': idea.id
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
            self.assertEqual(campaign_round, information.round)
            self.assertEqual(idea, information.idea)

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
                        'round_id': campaign_round.id,
                        'idea_id': idea.id,
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
        user.user_permissions.add(
            Permission.objects.get(codename='delete_own_created_by_instances')
        )

        client = APIClient()
        client.force_authenticate(user)

        campaign = Campaign.objects.create(
            name='Test Campaign',
            created_by=self.user
        )

        campaign_round = CampaignRound.objects.create(
            name='Test Campaign Round',
            campaign=campaign,
            created_by=self.user
        )

        idea = Idea.objects.create(
            campaign=campaign,
            created_by=self.user,
        )
        information = Information.objects.create(
            title='Test Information',
            text='Test Content',
            created_by=user,
            round=campaign_round,
            idea=idea
        )

        with self.subTest('Should be able to delete own information'):
            response = client.delete(
                reverse(
                    'round_idea_information-detail',
                    kwargs={
                        'round_id': campaign_round.id,
                        'idea_id': idea.id,
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
