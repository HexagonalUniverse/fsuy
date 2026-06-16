"""
@file       backend/fsuy_site/models/users.py
@brief      ...
@date       06-2026
"""

from django.db import models
from django.db.models import Field
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
        Main site's user.
    """

    uid: Field = models.BigAutoField(
        primary_key=True,
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


class Reaction(models.Model):
    """
        User's reaction to post.
    """

    LIKE = "like"

    TYPE_CHOICES: list[tuple[str, str]] = [
        (LIKE, "Like")
    ]

    user: Field = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name="reactions",
    )

    post: Field = models.ForeignKey(
        "Post",
        on_delete=models.CASCADE,
        related_name="reactions",
    )

    reaction_type: Field = models.CharField(
        max_length=31,
        choices=TYPE_CHOICES,
    )

    created_at: Field = models.DateTimeField(
        auto_now_add=True,
    )

