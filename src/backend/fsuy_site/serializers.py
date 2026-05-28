from rest_framework import serializers
from django.db import models

from .models import TestModel

class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.Model = TestModel
        fields = ["tmid", "name", "value"]