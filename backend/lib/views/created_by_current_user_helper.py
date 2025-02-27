from rest_framework.viewsets import ModelViewSet


class CreatedByModelViewSet(ModelViewSet):
    def perform_create(self, serializer):
        serializer.validated_data['created_by'] = self.request.user
        return super().perform_create(serializer)
