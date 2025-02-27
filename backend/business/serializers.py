from rest_framework import serializers

from .models import BusinessArea


class BusinessAreaSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = BusinessArea
        fields = '__all__'
