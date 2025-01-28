from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase

from campaign.models import Campaign
from ....models import Idea


class IdeaModelIdeaCreationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='12345'
        )

        self.campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        self.idea = Idea.objects.create(
            title='test idea',
            description='test description',
            campaign=self.campaign,
            created_by=self.user
        )

    # Test should be able to create an idea and vote on it
    def test_should_be_able_to_create_an_idea_and_star_on_it(self):
        with self.subTest('Should be able to starr an idea'):
            self.idea.star_set.create(
                created_by=self.user
            )

        with self.subTest('Idea should have one star'):
            self.assertEqual(
                1,
                self.idea.star_set.count()
            )

        with self.subTest('Should be able to get if user has starred on this idea'):
            self.assertTrue(
                self.idea.star_set.filter(created_by=self.user).exists()
            )

    # Test should not be able to star an idea twice
    def test_should_not_be_able_to_star_an_idea_twice(self):
        self.idea.star_set.create(
            created_by=self.user
        )

        with self.subTest('Should not be able to starr an idea twice'):
            with self.assertRaises(IntegrityError):
                self.idea.star_set.create(
                    created_by=self.user
                )
