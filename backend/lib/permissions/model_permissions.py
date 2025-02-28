from rest_framework.permissions import DjangoModelPermissions

from lib.models.created_by_model_mixin import CreatedByModel


class ModelPermissions(DjangoModelPermissions):
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

    def has_permission(self, request, view):
        if super().has_permission(request, view):
            return True

        # For delete calls
        if request.method == 'DELETE':
            model = self._queryset(view).model

            # If the model inherits from CreatedByModel
            if isinstance(model(), CreatedByModel):
                has_delete_own_created_by_instances_permission = request.user.has_perm(
                    'lib.delete_own_created_by_instances'
                )

                return has_delete_own_created_by_instances_permission

        return False

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user
