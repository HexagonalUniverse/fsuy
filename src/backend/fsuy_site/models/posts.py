"""
@file       backend/fsuy_site/models/posts.py
@brief      ...
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
        #related_name="%(class)s_posts",
        related_name="posts",
    )

    # Text-field post content...
    content: Field = models.TextField()

    #
    timestamp: Field = models.DateTimeField(
        auto_now_add=True,
    )

    #
    tags: Field = models.ManyToManyField(
        "Tag",
        #related_name="%(class)s_posts",
        related_name="posts",
        blank=True,
    )

    # ?
    class Meta:
        # - caso verdadeiro, não cria uma tabela própria...
        abstract: bool = False


class Review(Post):
    """
    A review-type post.
    """

    #
    game: Field = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name="reviews"
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


class Comment(models.Model):
    """
    Commentary...
    """

    # Comment ID.
    cid: Field = models.BigAutoField(
        primary_key=True
    )

    #
    author: Field = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name="comments",
    )

    #
    content: Field = models.TextField()

    #
    timestamp: Field = models.DateTimeField(
        auto_now_add=True,
    )

    #
    review: Field = models.ForeignKey(
        "Review",
        on_delete=models.CASCADE,
        related_name="comments",
        null=True,
        blank=True,
    )

    #
    parent: Field = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
    )


#
#
#   Tag
#
#

class Tag(models.Model):
    """

    """

    #
    name: Field = models.CharField(
        max_length=127,
        unique=True,
    )

    #
    description: Field = models.TextField(
        blank=True,
    )

    #
    color = models.CharField(
        max_length=31,
    )

    #
    def __str__(self) -> str:
        return self.name
