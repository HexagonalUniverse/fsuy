"""
@file       backend/fsuy_site/models/games.py
@brief      ...
@date       06-2026
"""

from django.db import models
from django.db.models import Field
from django.contrib.auth.models import AbstractUser


class Game(models.Model):
    """
        A game.
    """

    # Game ID.
    gid: Field = models.BigAutoField(
        primary_key=True
    )

    # Game's name.
    name: Field = models.CharField(
        max_length=255
    )

    #
    description: Field = models.TextField(
        blank=True
    )

    #
    genre: Field = models.CharField(
        max_length=255
    )

    #
    launch_date: Field = models.DateField()

    def __str__(self) -> str:
        """The game's representation is its name."""
        return self.name


