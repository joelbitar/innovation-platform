from django.test import SimpleTestCase
from rest_framework import serializers

from lib.views.created_by_current_user_helper import CreatedByModelViewSet


class DummyCreatedByModelViewSet(CreatedByModelViewSet):
    pass


class DummySerializer(serializers.Serializer):
    created_by = serializers.CharField(required=False)
    text = serializers.CharField()

    def create(self, validated_data):
        return validated_data


class LibViewsCreatedByModelViewSetTests(SimpleTestCase):
    # Test when calling perform_create we should set created_by field
    def test_when_calling_perform_create_we_should_set_created_by_field(self):
        dummy_instance = DummyCreatedByModelViewSet()
        dummy_instance.request = type('Request', (), {'user': 'test_user'})
        serializer = DummySerializer(
            data={
                'text': 'test_text'
            }
        )

        self.assertTrue(
            serializer.is_valid()
        )

        dummy_instance.perform_create(serializer)

        with self.subTest('Perform create should have set created_by field'):
            self.assertEqual(
                'test_user',
                serializer.validated_data['created_by']
            )
