from django.contrib.auth.models import User
from django.test import TestCase

from campaign.models import Campaign
from file.tests.helpers.file_test_mixin import FileTestsMixin
from idea.models import Information, Idea


class IdeaInformationFileTests(TestCase, FileTestsMixin):
    def setUp(self):
        super().setUp()

        self.user = User.objects.create_user(
            username="test_user",
            password="test_password",
        )

    # Test should be able to have a file on information
    def test_should_be_able_to_have_a_file_on_information(self):
        file = self.helper_create_file(created_by=self.user)

        information = Information.objects.create(
            idea=Idea.objects.create(
                campaign=Campaign.objects.create(
                    name="Test campaign",
                    description="Test description",
                    created_by=self.user,
                ),
                title="Test idea",
                description="Test description",
                created_by=self.user,
            ),
            file=file,
            created_by=self.user,
        )

        self.assertIsNotNone(
            information.file,
        )
