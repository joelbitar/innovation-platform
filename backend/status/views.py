from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class StatusView(APIView):
    def get(self, request):
        return Response(
            data={
                'status': 'ok'
            },
            status=200,
        )
