"""         ------------------------------------
@file       backend/fsuy_site/models/viewsets.py
@brief      REST dynamic endpoint...
@date       06-2026
"""

import rest_framework.viewsets as viewsets

from django.db import models
from rest_framework import serializers
from .games import Game


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model: models.Model = Game

        fields: list[str] = [
            "gid",
            "name",
            "description",
            "genre",
            "launch_date",
            "picture",
        ]


class API_Viewset_Game(viewsets.ModelViewSet):

    queryset = Game.objects.all()
    serializer_class: serializers.ModelSerializer = GameSerializer
    lookup_field: str = "gid"
