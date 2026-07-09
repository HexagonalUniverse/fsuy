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

    #   Game ID.
    gid: Field = models.BigAutoField(
        primary_key=True,
    )

    #   Game's name.
    name: Field = models.CharField(
        max_length=255,
        unique=True,
    )

    #   Game's slug.
    slug: Field = models.SlugField(
        max_length=255,
        unique=True,
        blank=False,
        default="1",
    )

    #   Game's description.
    description: Field = models.TextField(
        blank=True,
    )

    #   Developer.
    developer: Field = models.CharField(
        max_length=255,
        blank=False,
        default="Ninguém",
    )

    #
    publisher: Field = models.CharField(
        max_length=255,
        blank=True,
    )

    #
    launch_date: Field = models.DateField(
        blank=True,
        null=True,
    )

    #   Small, icon image for the game.
    logo: Field = models.ImageField(
        upload_to="games/",
        default="game-images/default.png",
    )

    #   Portrait.
    portrait: Field = models.ImageField(
        upload_to="games/",
        default="game-images/default.png",
    )

    #   Game's cover image.
    cover: Field = models.ImageField(
        upload_to="games/",
        default="game-images/default.png",
    )

    steam_id: Field = models.IntegerField(
        blank=True,
        null=True,
    )

    #
    #   Many-to-many
    #

    genres: Field = models.ManyToManyField(
        "GameGenre",
        related_name="genres",
    )

    platforms: Field = models.ManyToManyField(
        "Platform",
        related_name="platforms",
    )

    def __str__(self) -> str:
        """The game's representation is its name."""
        return self.name


class Platform(models.Model):
    """..."""

    name: Field = models.CharField(
        max_length=255,
        unique=True,
    )


class GameGenre(models.Model):
    """..."""

    name: Field = models.CharField(
        max_length=255,
        unique=True,
    )


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
        default="game-images/default.png",
    )

    #
    #class Meta:
    #    constraints: list = [
    #        models.UniqueConstraint(fields=["gid", "image"], name="unique_game_image")
    #    ]
