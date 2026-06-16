"""
@file       backend/fsuy_site/urls.py
@brief      ...
@date       06-2026
"""

from django.db import models
from django.db.models import Field
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    uid: Field = models.BigIntegerField(
        primary_key=True
    )

    socials: Field = models.CharField(
        max_length=255,
        blank=True
    )

    steam: Field = models.CharField(
        max_length=255,
        blank=True
    )

    discord: Field = models.CharField(
        max_length=255,
        blank=True
    )

    last_login: Field = models.DateTimeField(
        null=True,
        blank=True
    )

    date: Field = models.DateTimeField(
        auto_now_add=True
    )

    is_admin: Field = models.BooleanField(
        default=False
    )


class TesteTestado(models.Model):
    coisa_legal: Field = models.CharField(max_length=255)



print(
    [
        x.coisa_legal for x in TesteTestado.objects.all()
    ]
)
