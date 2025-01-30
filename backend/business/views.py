from rest_framework import viewsets, permissions

from .models import BusinessArea
from .serializers import BusinessAreaSerializer


class BusinessAreaViewSet(viewsets.ModelViewSet):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['name']
