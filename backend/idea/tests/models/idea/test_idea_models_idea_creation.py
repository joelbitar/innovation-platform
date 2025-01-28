from django.contrib.auth.models import User
from django.test import TestCase

from business.models import BusinessArea
from campaign.models import Campaign
from ....models import Idea


class IdeaModelIdeaCreationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='12345'
        )

    # Test should be able to create an idea with associated fields
    def test_should_be_able_to_create_an_idea_with_associated_fields(self):
        campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        idea = Idea.objects.create(
            title='test idea',
            description='test description',
            campaign=campaign,
            created_by=self.user
        )

    # Test should be able to have idea relevant to one or more business areas
    def test_should_be_able_to_have_idea_relevant_to_one_or_more_business_areas(self):
        business_area = BusinessArea.objects.create(
            name='test business area'
        )

        campaign = Campaign.objects.create(
            name='test campaign',
            created_by=self.user
        )

        campaign.business_areas.add(business_area)

        idea = Idea.objects.create(
            title='test idea',
            description='test description',
            campaign=campaign,
            created_by=self.user
        )

        with self.subTest('Idea should have one business area'):
            self.assertEqual(
                1,
                idea.campaign.business_areas.count()
            )

        with self.subTest('Business area should have set of ideas'):
            self.assertEqual(
                1,
                sum([c.ideas.count() for c in business_area.campaign_set.all()])
            )
