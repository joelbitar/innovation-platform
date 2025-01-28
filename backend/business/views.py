from rest_framework import viewsets, serializers, permissions

from business.models import BusinessArea


class BusinessAreaSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = BusinessArea
        fields = '__all__'


class BusinessAreaViewSet(viewsets.ModelViewSet):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['name']
