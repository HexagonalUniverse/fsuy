"""         ---------------------------------
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

    #
    uid: Field = models.BigAutoField(
        primary_key=True,
    )

    @staticmethod
    def generate_random_public_name() -> str:
        import secrets

        while True:
            value = secrets.token_urlsafe(20)
            if not User.objects.filter(public_name=value).exists():
                return value

    #
    public_name: Field = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=False,
        default=generate_random_public_name,
    )

    #
    socials: Field = models.CharField(
        max_length=255,
        blank=True,
    )

    #
    steam: Field = models.CharField(
        max_length=255,
        blank=True,
    )

    #
    discord: Field = models.CharField(
        max_length=255,
        blank=True,
    )

    #
    last_login: Field = models.DateTimeField(
        blank=True,
        null=True,
    )

    #
    creation_date: Field = models.DateTimeField(
        auto_now_add=True,
    )

    # forgot
    is_admin: Field = models.BooleanField(
        default=False,
    )

    def user_picture_path(self, filename: str) -> str:
        return f"users/{self.uid}/pictures/{filename}"

    picture: Field = models.ImageField(
        upload_to=user_picture_path,
        default="users/pictures/default.png",
    )

    def save(self, * args, ** kwargs) -> None:
        if not self.public_name:
            self.public_name: str = str(self.uid)

        return super().save(* args, ** kwargs)


class Reaction(models.Model):
    """
        User's reaction to post.
    """

    LIKE: str = "like"

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
