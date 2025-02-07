import os
from dataclasses import dataclass

from django.contrib.auth.models import Permission, User
from django.core.management import BaseCommand
from django.template.loader import get_template


@dataclass
class PermissionHolder:
    permission: str

    @property
    def key(self):
        return self.permission.replace('.', '__')

    @property
    def method_name(self):
        # Remove duplicate underscores
        permission_name = self.key.replace('__', '_')

        # Split the permission name by underscores
        # and capitalize each part
        camel_cased = ''.join(
            [p.capitalize() for p in permission_name.split('_')]
        )

        return camel_cased


class PermissionsGenerator:
    @classmethod
    def get_all_permissions(cls):
        try:
            superuser = User.objects.filter(
                is_superuser=True
            ).first()
        except User.DoesNotExist:
            superuser = User.objects.create_superuser(
                username='temp_for_generation',
                password='temp_for_generation',
            )

        for permission in sorted(superuser.get_all_permissions()):
            yield PermissionHolder(permission)

        if superuser.username == 'temp_for_generation':
            superuser.delete()

    @classmethod
    def generate_jsx(cls) -> str:
        template = get_template('tsx/user_permissions.tsx_template')
        return template.render({
            'permissions': list(cls.get_all_permissions()),
        })


# Command for generating permissions
# python manage.py generate_permissions
class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('output', type=str)

    def handle(self, *args, **options):
        from django.conf import settings

        with open(os.path.join(settings.BASE_DIR, options['output']), 'w') as f:
            f.write(PermissionsGenerator.generate_jsx())
