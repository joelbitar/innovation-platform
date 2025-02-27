from django.contrib.auth.models import User, Permission
from django.db import models
from django.test import TestCase, RequestFactory
from rest_framework.viewsets import ModelViewSet

from lib.models.created_by_model_mixin import CreatedByModel
from lib.permissions.model_permissions import ModelPermissions


class DummyModel(CreatedByModel):
    class Meta:
        managed = False


class DummyView(ModelViewSet):
    def get_queryset(self):
        return DummyModel.objects.all()


class NotCreatedByModel(models.Model):
    class Meta:
        managed = False


class NotCreatedByView(ModelViewSet):
    def get_queryset(self):
        return NotCreatedByModel.objects.all()


class PermissionToDeleteOwnItemsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
        )

    def helper_set_has_permission_to_delete_own_items(self, user=None):
        (user or self.user).user_permissions.add(
            Permission.objects.get(
                codename='delete_own_created_by_instances'
            )
        )

    def helper_get_model_permission_instance(self):
        return ModelPermissions()

    def test_should_not_have_permission_if_we_delete_on_view_that_has_queryset_without_created_by_model(self):
        p = self.helper_get_model_permission_instance()

        request = RequestFactory().delete('/')
        request.user = self.user

        self.assertFalse(
            p.has_permission(
                request,
                NotCreatedByView(),
            )
        )

    # Test should be able to delete my own items
    def test_should_not_have_has_permission_if_we_delete_on_view_that_has_queryset_with_created_by_model_user_no_permissions(self):
        p = self.helper_get_model_permission_instance()

        request = RequestFactory().delete('/')
        request.user = self.user

        with self.subTest('Should not have permission if user user does not have the delete own permission'):
            self.assertFalse(
                p.has_permission(
                    request,
                    DummyView(),
                )
            )

    def test_should_have_has_permission_if_we_delete_on_view_that_has_queryset_with_created_by_model_user_has_permission(self):
        self.helper_set_has_permission_to_delete_own_items()

        p = self.helper_get_model_permission_instance()

        request = RequestFactory().delete('/')
        request.user = self.user

        with self.subTest('For views with other querysets that does not have the created by model we should not have permission'):
            self.assertFalse(
                p.has_permission(
                    request,
                    NotCreatedByView(),
                )
            )

        with self.subTest('Should have permission user does not have the delete own permission'):
            self.assertTrue(
                p.has_permission(
                    request,
                    DummyView(),
                )
            )

        with self.subTest('Should only be for delete method'):
            for request in (
                    RequestFactory().get('/'),
                    RequestFactory().post('/'),
                    RequestFactory().put('/'),
                    RequestFactory().patch('/'),
            ):
                request.user = self.user

                with self.subTest(request=request.method):
                    self.assertFalse(
                        p.has_permission(
                            request,
                            DummyView(),
                        )
                    )

    # Test should have object permission if we delete on view that has queryset with created by model and model with created by as the same user
    def test_should_have_object_permission_object_has_the_request_user_as_creator(self):
        obj = DummyModel(created_by=self.user)

        p = self.helper_get_model_permission_instance()

        request = RequestFactory().delete('/')
        request.user = self.user

        with self.subTest('Should have permission if user user has delete own permission'):
            self.assertTrue(
                p.has_object_permission(
                    request,
                    DummyView(),
                    obj,
                )
            )

        with self.subTest('Should not have permission if user is not the creator'):
            self.assertFalse(
                p.has_object_permission(
                    request,
                    DummyView(),
                    DummyModel(created_by=User.objects.create_user(username='foo', password='bar'))
                )
            )

    def test_should_have_permission_after_help_method_set(self):
        """
        This just tests the helper method to set the permission.
        """
        self.helper_set_has_permission_to_delete_own_items()

        self.assertTrue(
            self.user.has_perm('lib.delete_own_created_by_instances'),
            self.user.get_all_permissions()
        )
