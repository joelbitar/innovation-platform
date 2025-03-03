from rest_framework import serializers

from file.models import File
from idea.models import Information
from user.serializers import CreatedByModelSerializer
import importlib


class FileModelSerializer(CreatedByModelSerializer):
    related_model = serializers.CharField(required=True, write_only=True)
    related_pk = serializers.IntegerField(required=True, write_only=True)

    def create(self, validated_data):
        related_app, related_model = validated_data.pop('related_model').split('.')
        related_pk = validated_data.pop('related_pk')

        file = super().create(validated_data)

        module = importlib.import_module(f'{related_app}.models')

        cls = getattr(module, related_model)

        obj = cls.objects.get(
            pk=related_pk
        )

        obj.file = file
        obj.save()

        return file

    def create_(self, validated_data):
        related_app = validated_data.pop('related_model')
        related_model = validated_data.pop('related_model')
        related_pk = validated_data.pop('related_pk')

        file = super().create(validated_data)

        obj = Information.objects.get(
            pk=related_pk
        )

        obj.file = file
        obj.save()

        return file

    class Meta:
        model = File
        fields = '__all__'
