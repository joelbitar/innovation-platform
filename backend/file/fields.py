from django.db import models

from file.models import RelatedFile


class RelatedFileField(models.OneToOneField):
    __namespace : str = None

    def get_namespace(self):
        return self.__namespace

    def __init__(self, namespace=None, *args, **kwargs):
        self.__namespace = namespace
        kwargs['on_delete'] = kwargs.get('on_delete', models.SET_NULL)
        kwargs['null'] = kwargs.get('null', True)
        kwargs['blank'] = kwargs.get('blank', True)
        kwargs['to'] = kwargs.get('to', RelatedFile)
        super().__init__(*args, **kwargs)
