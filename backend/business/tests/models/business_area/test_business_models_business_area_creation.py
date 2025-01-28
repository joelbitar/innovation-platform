from django.test import TestCase

from ....models import BusinessArea


class BusinessModelsBusinessAreaCreationTests(TestCase):
    def test_create_business_area(self):
        business_area = BusinessArea.objects.create(
            name=(name := 'Test Business Area')
        )

        with self.subTest('Should have created in the db'):
            self.assertEqual(
                1,
                BusinessArea.objects.all().count()
            )

        with self.subTest('Should have the correct name'):
            self.assertEqual(
                name,
                BusinessArea.objects.first().name
            )

        with self.subTest('Should have the correct slug'):
            self.assertEqual(
                'test-business-area',
                BusinessArea.objects.first().slug
            )
