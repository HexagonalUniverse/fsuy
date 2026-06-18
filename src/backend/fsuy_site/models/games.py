"""         ---------------------------------
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
        primary_key=True,
    )

    # Game's name.
    name: Field = models.CharField(
        max_length=255,
    )

    #
    description: Field = models.TextField(
        blank=True,
    )

    #
    genre: Field = models.CharField(
        max_length=255,
    )

    #
    launch_date: Field = models.DateField()

    #
    picture: Field = models.ImageField(
        upload_to="games/",
        default="game-images/default.png",)

    def __str__(self) -> str:
        """The game's representation is its name."""
        return self.name


class GameImage(models.Model):
    """
        A game.
    """

    # Game Image ID.
    giid: Field = models.BigAutoField(
        primary_key=True,
    )

    #
    gid: Field = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name="game_images",
    )

    #
    image: Field = models.ImageField(
        upload_to="game-images/",
        default="game-images/default.png")

    #
    #class Meta:
    #    constraints: list = [
    #        models.UniqueConstraint(fields=["gid", "image"], name="unique_game_image")
    #    ]

