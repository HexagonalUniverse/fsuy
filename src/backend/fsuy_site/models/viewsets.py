"""         ------------------------------------
@file       backend/fsuy_site/models/viewsets.py
@brief      For the API data communication.
@date       06-2026
"""

import rest_framework.viewsets
import rest_framework.pagination
import rest_framework.serializers
from django.core.exceptions import ValidationError

from rest_framework.decorators import action
from rest_framework.response import Response

from django.db import models, IntegrityError
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT

from .users import User
from .games import Game
from .posts import Review, News, Comment, Tag, Post

#
#   Parameters
#

PAGE_SIZE: int = 16


#
#
#   Serializers
#
#


class GenreSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model: models.Model = Tag
        fields = [
            "name",
        ]


class PlatformSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model: models.Model = Tag
        fields = [
            "name",
        ]


class GameFullSerializer(rest_framework.serializers.ModelSerializer):
    """Serializes the Game Model, entirely."""

    # tags = TagSerializer(many=True, read_only=True)
    genres = GenreSerializer(read_only=True, many=True)
    platforms = PlatformSerializer(read_only=True, many=True)

    class Meta:
        model: models.Model = Game
        fields: list[str] = [
            "gid",
            "name",
            "slug",
            "description",

            "developer",
            "publisher",

            "portrait",
            "cover",
            "logo",

            "launch_date",
            "genres",
            "platforms",

            "steam_id",
        ]


class GameRefSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    class Meta:
        model: models.Model = Game

        fields: list[str] = [
            "name",
            "portrait",
        ]


class TagSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model: models.Model = Tag
        fields = [
            "name",
            "description",
            "color",
        ]


class AuthorSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model: models.Model = User
        fields = [
            "uid",
            "public_name",
            "picture",
        ]


class ReviewSerializer(rest_framework.serializers.ModelSerializer):
    """..."""

    # @TODO HASH ENDPOINTS...
    # public_id = rest_framework.serializers.SerializerMethodField()

    # def get_public_id(self, obj: Review) -> str:
    #   return obj.public_id

    # tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    game = GameRefSerializer(read_only=True)

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

    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)

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

    author = AuthorSerializer(read_only=True)
    children_count = rest_framework.serializers.SerializerMethodField()

    class Meta:
        model: models.Model = Comment

        fields: list[str] = [
            "cid",
            "author",
            "content",
            "creation_date",
            "edit_date",
            "post",
            "parent",
            "children_count"
        ]

    def get_children_count(self, obj: Comment) -> int:
        return obj.children.count()


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
            "portrait",
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
    serializer_class: rest_framework.serializers.ModelSerializer = GameFullSerializer
    pagination_class = GlancePagination     # @TODO

    lookup_field: str = "gid"

    def get_serializer_class(self):
        if self.request.query_params.get("preview") == "true":
            return GameGlanceSerializer

        return GameFullSerializer

    @action(detail=True, methods=["get"])
    def reviews(self, request, gid: str | None = None):
        """Collect the game reviews.

        :param request:
        :param gid:
        :return:
        """
        games = self.get_object()

        queryset = games.reviews.order_by("-creation_date")
        # .select_related("author")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ReviewSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def review(self, request, gid: str | None = None) -> Response:
        """Writes a review to a given game.

        :param request: ~
        :param gid: ~
        :return:
        """

        try:
            corresponding_game: Game = Game.objects.get(gid=gid)

        except Game.DoesNotExist:
            return Response(
                {
                    "error": f"O jogo {gid} nem existe...",
                },

                status=HTTP_400_BAD_REQUEST,
            )

        if not request.user.is_authenticated:
            return Response(
                {
                    "error": "Impossível escrever uma revisão sem uma sessão!",
                },

                status=HTTP_401_UNAUTHORIZED,
            )

        #
        try:
            content: str = request.data["content"]
            API_Viewset_Review.validate_comment_content(content)

            ...

        except KeyError:
            return Response(
                {
                    "error": "Conteúdo da revisão não especificado.",
                },

                status=HTTP_400_BAD_REQUEST,
            )

        except ValidationError as e:
            return Response(
                {
                    "error":    "O conteúdo revisão é inválido.",
                    "details":  e.messages,
                },

                status=HTTP_400_BAD_REQUEST,
            )

        try:

            review: Review = Review.objects.create(  # noqa
                author=request.user,
                game=corresponding_game,
                content=content,
                rate=0,
            )

        except IntegrityError as e:
            print(e)

            return Response(
                {
                    "error": "Erro de integridade~",
                },

                status=HTTP_409_CONFLICT,
            )

        return Response(
            {},
            status=HTTP_200_OK,
        )


class API_Viewset_Review(rest_framework.viewsets.ModelViewSet):
    """Viewset for the Review. ~"""

    queryset = Review.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = ReviewSerializer
    pagination_class = GlancePagination     # @TODO

    # post id.
    lookup_field: str = "pid"

    def get_serializer_class(self):
        if self.request.query_params.get("preview") == "true":
            return ReviewGlanceSerializer

        return ReviewSerializer

    @action(detail=True, methods=["get"])
    def comments(self, request, pid: str | None = None):
        """
        :param request: ~
        :param pid: the review post id.
        :return: the comments on the given review.
        """

        reviews = self.get_object()

        queryset = reviews.comments.order_by("-creation_date")
        # .select_related("author")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def comment(self, request, pid: str | None = None) -> Response:
        """Writes a comment on the given review.

        :param request: ~
        :param pid: the review post id.
        :return:
        """

        print(pid)
        print(request.data)
        print(request.user.uid)

        try:
            corresponding_post: Post = Post.objects.get(pid=pid)

        except Post.DoesNotExist:
            return Response(
                {
                    "error": f"A review {pid} nem existe...",
                },

                status=HTTP_400_BAD_REQUEST,
            )

        if not request.user.is_authenticated:
            return Response(
                {
                    "error": "Impossível escrever comentário sem uma sessão!",
                },

                status=HTTP_401_UNAUTHORIZED,
            )

        #
        try:
            content: str = request.data["content"]
            API_Viewset_Review.validate_comment_content(content)

            ...

        except KeyError:
            return Response(
                {
                    "error": "Conteúdo do comentário não especificado.",
                },

                status=HTTP_400_BAD_REQUEST,
            )

        except ValidationError as e:
            return Response(
                {
                    "error": "O conteúdo do comentário é inválido.",
                    "details": e.messages,
                },

                status=HTTP_400_BAD_REQUEST,
            )

        #
        parent: int | None = None
        try:
            parent: int = request.data["parent"]

        except KeyError:
            # no parent specified.
            ...

        if parent is not None:

            try:
                parent_comment: Comment = Comment.objects.get(
                    cid=parent,
                )

            except Comment.DoesNotExist:
                return Response(
                    {
                        "error": f"Comentário \"{parent}\" não existe.",
                    },

                    status=HTTP_400_BAD_REQUEST,
                )

            if parent_comment.post != pid:
                return Response(
                    {
                        "error": "Comentário respondendo outro d'outro post?",
                    },

                    status=HTTP_400_BAD_REQUEST,
                )

        try:

            comment: Comment = Comment.objects.create(  # noqa
                author=request.user,
                post=corresponding_post,
                content=content,
                parent=parent,
                edit_date=None,
            )

        except IntegrityError as e:
            print(e)

            return Response(
                {
                    "error": "Erro de integridade~",
                },

                status=HTTP_409_CONFLICT,
            )

        return Response(
            {},
            status=HTTP_200_OK,
        )

    @staticmethod
    def validate_comment_content(content: str) -> None:

        ...

        return None

    @action(detail=True, methods=["post"])
    def delete(self, request, pid: str | None = None) -> Response:
        """~

        :param request: ~
        :param pid: the review post id.
        :return:
        """

        try:
            corresponding_review: Review = Review.objects.get(pid=pid)

        except Post.DoesNotExist:
            return Response(
                {
                    "error": f"A revisão {pid} nem existe...",
                },

                status=HTTP_400_BAD_REQUEST,
            )

        if not request.user.is_authenticated or corresponding_review.author != request.user:
            return Response(
                {
                    "error": "Deletar a revisão não é permitido.",
                },

                status=HTTP_401_UNAUTHORIZED,
            )

        try:
            corresponding_review.delete()

        except Exception as e:
            print(e)

            return Response(
                {
                    "error": "Erro ao tentar deletar a revisão.",
                },

                status=HTTP_409_CONFLICT,
            )

        return Response(
            {},
            status=HTTP_200_OK,
        )


class API_Viewset_News(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = News.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = NewsSerializer
    pagination_class = GlancePagination     # @TODO

    lookup_field: str = "pid"

    def get_serializer_class(self):
        if self.request.query_params.get("preview") == "true":
            return NewsGlanceSerializer

        return NewsSerializer

    @action(detail=True, methods=["get"])
    def comments(self, request, pid: str | None = None):
        news = self.get_object()

        queryset = news.comments.order_by("-creation_date")
        # .select_related("author")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)


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

    queryset = Comment.objects.order_by("-creation_date")
    serializer_class: rest_framework.serializers.ModelSerializer = CommentSerializer
    pagination_class = GlancePagination     # @TODO

    @action(detail=True, methods=["get"])
    def children(self, request, cid: str | None = None):
        comments = self.get_object()

        queryset = comments.filter(parent=cid).order_by("-creation_date")
        # .select_related("author")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)


class API_Viewset_User(rest_framework.viewsets.ModelViewSet):
    """..."""

    queryset = User.objects.all()
    serializer_class: rest_framework.serializers.ModelSerializer = UserSerializer
    pagination_class = GlancePagination

    lookup_field = "uid"

# ~
