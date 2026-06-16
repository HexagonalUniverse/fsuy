"""
@file       backend/fsuy_site/urls.py
@brief      ...
@date       06-2026
"""

from django.db import models
from django.db.models import Field
from .models import *


class TesteTestado(models.Model):
    coisa_legal: Field = models.CharField(max_length=255)



print(
    [
        x.coisa_legal for x in TesteTestado.objects.all()
    ]
)
