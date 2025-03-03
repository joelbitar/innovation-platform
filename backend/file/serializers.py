from django.contrib.auth.models import User
from django.core.exceptions import SuspiciousOperation
from rest_framework import serializers

from file.models import File
from idea.models import Information
from lib.exceptions.conflict import Conflict
from lib.permissions.model_permissions import ModelPermissions
from user.serializers import CreatedByModelSerializer
from rest_framework.exceptions import PermissionDenied
import importlib


class FileModelSerializer(CreatedByModelSerializer):
    related_model = serializers.CharField(required=True, write_only=True)
    related_pk = serializers.IntegerField(required=True, write_only=True)

    def get_related_to_model_instance(self, validated_data):
        related_app, related_model = validated_data.pop('related_model').split('.')
        related_pk = validated_data.pop('related_pk')

        module = importlib.import_module(f'{related_app}.models')

        cls = getattr(module, related_model)

        return cls.objects.get(
            pk=related_pk
        )

    @property
    def current_user(self) -> User:
        return self.context['request'].user

    def update(self, instance: File, validated_data):
        related_to_instance = self.get_related_to_model_instance(validated_data)

        if not ModelPermissions.user_has_permission_for_model(
                related_to_instance,
                self.current_user,
                ModelPermissions.CHANGE_OWN_CREATED_BY_INSTANCES
        ):
            raise PermissionDenied('You do not have permission to update your own objects at all')

        if not ModelPermissions.user_has_permission_for_instance(self.current_user, related_to_instance):
            raise PermissionDenied('You do not have permission to update the underlying object instance')

        file = super().update(instance, validated_data)

        related_to_instance.file = file
        related_to_instance.save()

        return file

    def create(self, validated_data):
        related_to_instance = self.get_related_to_model_instance(validated_data)

        if related_to_instance.file is not None:
            raise Conflict('This object already has a file associated with it')

        if not ModelPermissions.user_has_permission_for_instance(self.current_user, related_to_instance):
            raise PermissionDenied('You do not have permission to create a file for this object')

        file = super().create(validated_data)

        related_to_instance.file = file
        related_to_instance.save()

        return file

    class Meta:
        model = File
        fields = '__all__'
