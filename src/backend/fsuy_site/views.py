"""
@file       backend/fsuy_site/views.py
@brief      ...
@date       05-2026
"""

from django.core.handlers.asgi import ASGIRequest
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from .models import TestModel
from .serializers import TestModelSerializer

# ViewSets hanlde all route opererations for a resource.
class TestModelViewSet(viewsets.ModelViewSet):
    queryset = TestModel.objects.all()
    serializer_class = TestModelSerializer


class FrontendView(object):
    """
    ...
    """

    @staticmethod
    @csrf_exempt
    def serve_frontend(request: ASGIRequest) -> HttpResponse:
        if request.user.is_authenticated:
            ...

        return render(request,
                      "index.html")

