"""         ---------------------------------
@file       backend/fsuy_site/models/posts.py
@brief      Models revolving posts.
@date       06-2026
"""

from django.db import models
from django.db.models import Field


class Post(models.Model):
    """
        A post.
    """

    # Post ID.
    pid: Field = models.BigAutoField(
        primary_key=True,
    )

    #
    author: Field = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name="posts",
    )

    # Text-field post content...
    content: Field = models.TextField(
        default="blank~",
    )

    #
    creation_date: Field = models.DateTimeField(
        auto_now_add=True,
    )

    #
    edit_date: Field = models.DateTimeField(
        auto_now_add=True,
        null=True,
    )

    #
    tags: Field = models.ManyToManyField(
        "Tag",
        related_name="posts",
        blank=True,
    )

    # ?
    class Meta:
        abstract: bool = False

    @property
    def public_id(self) -> str:
        """Public id of the post.

        :param      self: 1
        :return:    2
        """

        import hmac
        import hashlib

        key: bytes = b"segredo"
        msg: bytes = f"{self.pid}".encode("utf-8")

        return hmac.new(
            key=key,
            msg=msg,
            digestmod=hashlib.sha256,
        ).hexdigest()


class Review(Post):
    """
        A review-type post.
    """

    #
    game: Field = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    #
    rate: Field = models.PositiveSmallIntegerField()


class News(Post):
    """
        A news-type post.
    """

    #
    title: Field = models.CharField(
        max_length=255,
    )

    #
    description: Field = models.TextField(
        default="~",
    )

    #
    picture: Field = models.ImageField(
        upload_to="news-images/",
        default="news-images/default.png",
        blank=True,
    )


class Comment(models.Model):
    """
        Commentary...
    """

    # Comment ID.
    cid: Field = models.BigAutoField(
        primary_key=True,
    )

    #
    author: Field = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name="comments",
    )

    #
    content: Field = models.TextField(
        blank=True,
    )

    #
    creation_date: Field = models.DateTimeField(
        auto_now_add=True,
    )

    #
    edit_date: Field = models.DateTimeField(
        auto_now_add=True,
        null=True,
    )

    #
    post: Field = models.ForeignKey(
        "Post",
        on_delete=models.CASCADE,
        related_name="comments",
        blank=True,
    )

    #
    parent: Field = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="replies",
    )


#
#
#   Tag
#
#

class Tag(models.Model):
    """
        Tag.
    """

    #
    name: Field = models.CharField(
        max_length=127,
        unique=True,    # primary_key=True
    )

    #
    description: Field = models.TextField(
        blank=True,
    )

    #
    color = models.CharField(
        max_length=31,
        default="#ffffff",
    )

    #
    def __str__(self) -> str:
        return self.name


# related_name="%(class)s_posts",
