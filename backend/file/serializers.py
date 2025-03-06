import importlib

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from file.models import RelatedFile
from lib.exceptions.conflict import Conflict
from lib.permissions.model_permissions import ModelPermissions
from user.serializers import CreatedByModelSerializer


class RelatedFileSerializer(CreatedByModelSerializer):
    related_model = serializers.CharField(required=True, write_only=True)
    related_pk = serializers.IntegerField(required=True, write_only=True)
    file = serializers.FileField(required=True, write_only=True)
    filename = serializers.CharField(read_only=True)
    url = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_url(obj: RelatedFile) -> str:
        return obj.file.url

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

    def update(self, instance: RelatedFile, validated_data):
        related_to_instance = self.get_related_to_model_instance(validated_data)

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
            raise PermissionDenied('You do not have permission to create a file for the underlying instance')

        namespace = related_to_instance.__class__.file.field.get_namespace()
        validated_data['namespace'] = namespace

        file = super().create(validated_data)

        related_to_instance.file = file
        related_to_instance.save()

        return file

    class Meta:
        model = RelatedFile
        fields = (
            'related_model',
            'related_pk',
            'filename',
            'file',
            'url',
        )
