from rest_framework.permissions import DjangoModelPermissions


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