from rest_framework import serializers

from file.models import File
from user.serializers import CreatedByModelSerializer


class FileModelSerializer(CreatedByModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
