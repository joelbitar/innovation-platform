from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from ...models import BusinessArea


class BusinessBusinessAreaCrudTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

        self.client.force_authenticate(user=self.user)

    # Test should be able to create a business area
    def test_should_be_able_to_create_a_business_area(self):
        response = self.client.post(
            reverse('business_area-list'),
            {
                'name': (business_area_name := 'test business area')
            }
        )

        with self.subTest('Should have the correct status code'):
            self.assertEqual(
                201,
                response.status_code,
                response.data
            )

        with self.subTest('Should have create an business area'):
            self.assertEqual(
                1,
                BusinessArea.objects.all().count()
            )

        with self.subTest('Should have the correct name'):
            self.assertEqual(
                business_area_name,
                BusinessArea.objects.first().name
            )
