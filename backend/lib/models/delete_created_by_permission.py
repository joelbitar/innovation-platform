from django.db import models


class DeleteCreatedByPermission(models.Model):
    class Meta:
        managed = False

        default_permissions = ()

        permissions = (
            ('delete_own_created_by_instances', 'Can delete own created by instances'),
        )
