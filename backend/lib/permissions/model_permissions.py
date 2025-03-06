from typing import Optional

from django.contrib.auth.models import User
from django.db.models import Model
from rest_framework.permissions import DjangoModelPermissions

from lib.models.created_by_model_mixin import CreatedByModel


class ModelPermissions(DjangoModelPermissions):
    DELETE_OWN_CREATED_BY_INSTANCES = 'lib.delete_own_created_by_instances'
    CHANGE_OWN_CREATED_BY_INSTANCES = 'lib.change_own_created_by_instances'

    @property
    def perms_map(self):
        """
        Add GET permission.

        :return:
        """
        perms_map = super().perms_map

        perms_map['GET'] = [
            '%(app_label)s.view_%(model_name)s',
        ]

        return perms_map

    @staticmethod
    def user_has_permission_for_model(model: CreatedByModel, user: User, permission: str) -> Optional[bool]:
        if hasattr(model, 'created_by'):
            return user.has_perm(
                permission
            )

        return None

    def queryset_model_has_permission(self, request, view, permission):
        model = self._queryset(view).model

        return self.user_has_permission_for_model(
            model,
            request.user,
            permission
        )

    def get_if_user_has_permission_if_applicable(self, request, view):
        # For delete calls
        if request.method == 'DELETE':
            return self.queryset_model_has_permission(
                request,
                view,
                self.DELETE_OWN_CREATED_BY_INSTANCES
            )

        # For patch calls
        if request.method == 'PATCH':
            return self.queryset_model_has_permission(
                request,
                view,
                self.CHANGE_OWN_CREATED_BY_INSTANCES
            )

        return None

    def has_permission(self, request, view):
        if super().has_permission(request, view):
            return True

        if self.get_if_user_has_permission_if_applicable(request, view):
            return True

        return False

    @staticmethod
    def user_has_permission_for_instance(user: User, obj: CreatedByModel) -> Optional[bool]:
        # If the user is a superuser, they can do anything
        if user.is_superuser:
            return True

        # Only allow the creator to interact with the object
        return obj.created_by == user

    def has_object_permission(self, request, view, obj):
        return self.user_has_permission_for_instance(
            request.user,
            obj
        )
