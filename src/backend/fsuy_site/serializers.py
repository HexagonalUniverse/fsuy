from rest_framework import serializers
from django.db import models

from .models import TestModel, Game

class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.Model = TestModel
        fields = ["tmid", "name", "value"]

class GameModelSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.Model = Game
        fields = ["gid", "name", "genre", "launch_date"]