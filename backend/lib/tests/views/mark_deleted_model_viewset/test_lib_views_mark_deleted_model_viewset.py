from unittest.mock import patch

from django.db import models
from django.test import TestCase
from django_softdelete.models import SoftDeleteModel
from rest_framework.viewsets import ModelViewSet


class MarkDeletedDummyModel(SoftDeleteModel):
    text = models.CharField(max_length=123, default="")

    class Meta:
        managed = False


class DummyMarkDeletedModelViewSet(ModelViewSet):
    def get_queryset(self):
        return MarkDeletedDummyModel.objects.all()


class MarkDeletedModelViewSetTests(TestCase):
    """
    Validate that the approach of having a is_deleted field is working as expected with rest framework
    """

    # Test should mark as deleted and not delete when we soft delete
    @patch('django_softdelete.models.SoftDeleteModel.delete')
    def test_should_mark_as_deleted_and_not_delete_when_we_soft_delete(self, model_soft_delete_delete):
        instance = MarkDeletedDummyModel()

        dummy_instance = DummyMarkDeletedModelViewSet()
        dummy_instance.get_object = lambda: instance
        dummy_instance.request = type('Request', (), {'user': 'test_user'})
        dummy_instance.kwargs = {'pk': '123'}
        dummy_instance.destroy(request=dummy_instance.request)

        with self.subTest('Should have called the perform_destroy method'):
            self.assertTrue(
                model_soft_delete_delete.called
            )

        with self.subTest('Should have set the is_deleted field'):
            self.assertTrue(
                instance.is_deleted
            )
