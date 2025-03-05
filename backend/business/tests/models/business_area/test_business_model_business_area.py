from django.test import SimpleTestCase

from business.models import BusinessArea


class BusinessBusinessAreaModelTests(SimpleTestCase):
    def test_str_method_of_business_area(self):
        business_area = BusinessArea(name=(business_area_name := "Test Business Area"))

        self.assertEqual(
            business_area.name,
            business_area_name
        )

        self.assertEqual(
            str(business_area),
            business_area_name
        )
