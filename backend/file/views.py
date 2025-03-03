from file.models import File
from file.serializers import FileModelSerializer
from lib.views.created_by_current_user_helper import CreatedByModelViewSet


# Create your views here.
class FileModelViewSet(CreatedByModelViewSet):
    http_method_names = ['post', 'get']

    serializer_class = FileModelSerializer
    queryset = File.objects.all()
