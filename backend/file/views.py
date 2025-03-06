from rest_framework.generics import GenericAPIView

from file.models import RelatedFile
from file.serializers import RelatedFileSerializer
from lib.views.created_by_current_user_helper import CreatedByModelViewSet

# Create your views here.
class FileModelViewSet(CreatedByModelViewSet):
    http_method_names = ['post', 'get', 'patch', 'delete']

    serializer_class = RelatedFileSerializer
    queryset = RelatedFile.objects.all()
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context
