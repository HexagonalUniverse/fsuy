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
from .models import TestModel, Game
from .serializers import TestModelSerializer, GameModelSerializer

# ViewSets hanlde all route opererations for a resource.
class TestModelViewSet(viewsets.ModelViewSet):
    queryset = TestModel.objects.all()
    serializer_class = TestModelSerializer

class GameModelViewSet(viewsets.ModelViewSet):
    serializer_class = GameModelSerializer
    queryset = Game.objects.all()

    # def get_queryset(self):
    #     queryset = Game.objects.all()
    #     game_id = self.request.query_params.get("gid")

    #     if game_id:
    #         queryset = queryset.filter(gid=game_id)

    #     return queryset


class FrontendView(object):
    """
    ...
    """

    @staticmethod
    @csrf_exempt
    def serve_frontend(request: ASGIRequest) -> HttpResponse:
        if request.user.is_authenticated:
            ...

        # assert request.is_secure(), "N'é seguro coisa nenhuma!"

        return render(request, "index.html")

