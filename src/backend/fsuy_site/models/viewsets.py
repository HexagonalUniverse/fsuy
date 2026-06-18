"""         ------------------------------------
@file       backend/fsuy_site/models/viewsets.py
@brief      For the API data communication.
@date       06-2026
"""

import rest_framework.viewsets
import rest_framework.pagination
import rest_framework.serializers

from django.db import models
from .users import User
from .games import Game
from .posts import Review, News, Comment


#
#   Parameters
#

PAGE_SIZE: int = 16


#
#
#   Serializers
#
#

class GameSerializer(rest_framework.serializers.ModelSerializer):
    """Serializes the Game Model, entirely."""

    class Meta:
        model: models.Model = Game

        fields: list[str] = [
            "gid",
            "name",
            "picture",

            "description",
            "launch_date",
            "genre",
        ]


class ReviewSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    # @TODO HASH ENDPOINTS...
    # public_id = rest_framework.serializers.SerializerMethodField()

    # def get_public_id(self, obj: Review) -> str:
    #   return obj.public_id

    class Meta:
        model: models.Model = Review

        fields: list[str] = [
            "pid",
            "author",
            "content",
            "creation_date",
            "edit_date",
            "game",
            "rate",
        ]


class NewsSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    class Meta:
        model: models.Model = News

        fields: list[str] = [
            "pid",
            "author",
            "creation_date",
            "edit_date",
            "tags",

            "content",

            "title",
            "description",
            "picture",
        ]


class CommentSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    class Meta:
        model: models.Model = Comment

        fields: list[str] = [
            "author",
            "content",
            "creation_date",
            "edit_date",
            "post",
            "parent",
        ]


class UserSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    class Meta:
        model: models.Model = User

        fields: list[str] = [
            "uid",
            "public_name",

            "picture",
            "creation_date",
            "last_login",
            "socials",
            "steam",
            "discord",
        ]


class GameGlanceSerializer(rest_framework.serializers.ModelSerializer):
    """Serializes the glance at the Game Model. As such, just information like the game's title and picture."""

    class Meta:
        model: models.Model = Game

        fields: list[str] = [
            "gid",
            "name",
            "picture",
        ]


class ReviewGlanceSerializer(rest_framework.serializers.ModelSerializer):
    """Serializes the glance at the Review Model."""

    class Meta:
        model: models.Model = Review

        # @TODO
        fields: list[str] = [
            "pid",
            "author",

            "creation_date",
            "edit_date",
            "rate",
        ]


class NewsGlanceSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    class Meta:
        model: models.Model = News

        fields: list[str] = [
            "pid",
            "author",
            "creation_date",
            "edit_date",
            "tags",

            "title",
            "description",
            "picture",
        ]


class GlancePagination(rest_framework.pagination.PageNumberPagination):
    """Pagination class for glances."""

    page_size: int = PAGE_SIZE


#
#
#   Viewsets
#
#

class API_Viewset_Game(rest_framework.viewsets.ModelViewSet):
    """Viewset for the game API."""

    queryset = Game.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = GameSerializer
    pagination_class = GlancePagination     # @TODO

    lookup_field: str = "gid"


class API_Viewset_Review(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = Review.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = ReviewSerializer
    pagination_class = GlancePagination     # @TODO

    lookup_field: str = "pid"


class API_Viewset_News(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = News.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = NewsSerializer
    pagination_class = GlancePagination     # @TODO

    lookup_field: str = "pid"


class API_Viewset_Comment(rest_framework.viewsets.ModelViewSet):
    """..."""

    # queryset = Comment.objects.all()
    def get_queryset(self):
        pid: str | None = self.request.query_params.get("pid")

        if pid is None:
            return Comment.objects.none()

        return Comment.objects.filter(
            post_id=pid,
        )

    serializer_class: rest_framework.serializers.ModelSerializer = CommentSerializer
    pagination_class = GlancePagination     # @TODO


class API_Viewset_GameGlance(rest_framework.viewsets.ModelViewSet):
    """Viewset for the game (glance) API."""

    queryset = Game.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = GameGlanceSerializer
    pagination_class = GlancePagination

    lookup_field: str = "gid"


class API_Viewset_ReviewGlance(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = Review.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = ReviewGlanceSerializer
    pagination_class = GlancePagination

    lookup_field: str = "pid"


class API_Viewset_NewsGlance(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = News.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = NewsGlanceSerializer
    pagination_class = GlancePagination

    lookup_field: str = "pid"


class API_Viewset_User(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = User.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = UserSerializer
    pagination_class = GlancePagination

    lookup_field = "uid"

# ~
