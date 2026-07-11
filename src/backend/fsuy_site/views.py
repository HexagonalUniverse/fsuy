"""         --------------------------
@file       backend/fsuy_site/views.py
@brief      ...
@date       05-2026
"""

# DJANGO imports
from django.conf import settings
import django.contrib.auth as auth
import django.http as http

from django.shortcuts import render, redirect
from django.core.handlers.asgi import ASGIRequest
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.password_validation import validate_password, get_default_password_validators
from django.views.decorators.http import require_POST

from django.core.exceptions import ValidationError
from django.db import IntegrityError

# other imports
import json
from typing import Any


User = auth.get_user_model()


#
#   Password check criteria
#

validators = get_default_password_validators()

password_criteria: list[str] = [
    validator.get_help_text()
    for validator in validators
]


# SLA CRSF
# from django.views.decorators.csrf import ensure_csrf_cookie
# @ensure_csrf_cookie
# def csrf(request): return http.JsonResponse({"ok": True})


class FrontendView(object):
    """
        ...
    """

    @staticmethod
    @csrf_exempt
    def serve_frontend(request: ASGIRequest) -> http.HttpResponse:
        """
        Serves the frontend page.
        :param request: the request.
        """

        if request.user.is_authenticated:
            print("auth:", request.user.is_authenticated)
            ...

        if request.user.is_authenticated:
            print("auth:", request.user.is_authenticated)
            ...

        # assert request.is_secure(), "N'é seguro coisa nenhuma!"

        return render(request, "index.html")

    @staticmethod
    @require_POST
    def unsafe_register(request: http.HttpRequest) -> http.HttpResponse:
        """
        Implements what is behind `register` method. "Unsafe" in terms of server exceptions...
        :param request:
        :return:
        """

        if request.user.is_authenticated:
            return http.JsonResponse(
                {
                    "error": "Usuário já autenticado!"
                },

                # HTTP: forbidden
                status=403,
            )

        body: Any = json.loads(request.body)

        # getting the POST attributes.
        username: str       = body["username"].strip()
        password: str       = body["password"]
        email: str          = body["email"].strip()
        public_name: str    = body["public_name"].strip()

        if not username or not password or not email or not public_name:
            return http.JsonResponse(
                {
                    "error": "Todos os campos são obrigatórios."
                },

                # HTTP: bad request
                status=400,
            )

        #   validating username.
        if User.objects.filter(username=username).exists():
            return http.JsonResponse(
                {
                    "error": "O nome de usuário já está em uso!",
                },

                # HTTP: conflict
                status=409,
            )

        #   validating the e-mail.
        elif User.objects.filter(email=email).exists():
            return http.JsonResponse(
                {
                    "error": "O e-mail já está em uso!",
                },

                # HTTP: conflict
                status=409,
            )

        elif User.objects.filter(public_name=public_name).exists():
            return http.JsonResponse(
                {
                    "error": "O nome público já está em uso!",
                },

                # HTTP: conflict
                status=409,
            )

        #   Validating the password.
        validate_password(
            password=password,
        )

        # creating the new user...
        user: User = User.objects.create_user( # noqa
            username=username,
            password=password,
            email=email,
            public_name=public_name,
        )

        # logging-in.
        auth.login(request, user)

        # Ok.
        return http.JsonResponse(
            {
                "message": "Usuário cadastrado com sucesso.",
            },

            # HTTP: created
            status=201,
        )

    @staticmethod
    @require_POST
    def register(request: http.HttpRequest) -> http.HttpResponse:
        """
        Endpoint to register the user.

        :param request: the HTTP request. Must be a POST with the fields `username`, `password`, `email` and
        `public_name`.
        :return:
        """

        try:
            return FrontendView.unsafe_register(request)

        except KeyError as e:
            return http.JsonResponse(
                {
                    "error": f"Campo obrigatório não informado: {e.args[0]}",
                },

                # HTTP: bad request
                status=400,
            )

        except ValidationError as e:

            return http.JsonResponse(
                {
                    "error": "Senha inválida.",
                    "password_errors": e.messages,
                    "criteria": password_criteria,
                },

                # HTTP: bad request
                status=400,
            )

        except IntegrityError as e:
            return http.JsonResponse(
                {
                    "error": "Não foi possível criar o usuário.",
                },

                # HTTP: conflict
                status=409,
            )

        except Exception as e:

            #
            print("Error não resolvido:", e)

            return http.JsonResponse(
                {
                    "error": "Erro interno do servidor.",
                },

                # HTTP: internal server error
                status=500,
            )

    @staticmethod
    @require_POST
    def unsafe_login(request: http.HttpRequest) -> http.HttpResponse:
        """
        Implements what is behind `request` method. "Unsafe" in terms of server exceptions...
        :param request:
        :return:
        """

        if request.user.is_authenticated:
            return http.JsonResponse(
                {
                    "error": "Usuário já autenticado!"
                },

                # HTTP: forbidden
                status=403,
            )

        body = json.loads(request.body)

        username = body["username"]
        password = body["password"]


        # getting the POST attributes.
        # username = request.POST["username"]
        # password = request.POST["password"]

        # attempting to authenticate the user...
        user: None | User = auth.authenticate(
            request,
            username=username,
            password=password,
        )

        if user is None:
            return http.JsonResponse(
                {
                    "error": "Usuário ou senha inválidos.",
                },

                # HTTP: unauthorized
                status=401,
            )

        # logging-in.
        auth.login(request, user)

        # for instance, 30 [s] of session...
        # session_in_seconds: int = 30
        # request.session.set_expiry(session_in_seconds)

        # Ok.
        # return redirect("/")
        return http.JsonResponse(
            {
                "success": True,
            },

            # HTTP: ok
            status=200,
        )

    @staticmethod
    @require_POST
    def login(request: http.HttpRequest) -> http.HttpResponse:
        try:
            return FrontendView.unsafe_login(request)

        except KeyError as e:
            return http.JsonResponse(
                {
                    "error": f"Campo obrigatório na requisição não informado: {e.args[0]}",
                },

                # HTTP: bad request
                status=400,
            )

    @staticmethod
    @require_POST
    def logout(request: http.HttpRequest) -> http.HttpResponse:
        """
        Logout view.
        :return:
        """

        if not request.user.is_authenticated:
            return http.JsonResponse(
                {
                    "error": "Nem sequer está logado...",
                },

                # HTTP: bad request
                status=400,
            )

        # not used for instance...
        # body = json.loads(request.body)

        # logging-out.
        auth.logout(request)

        # return redirect("/")
        # Ok.
        return http.JsonResponse(
            {
                "success": True,
            },

            # HTTP: ok
            status=200,
        )

    @staticmethod
    @require_POST
    def me(request):
        if not request.user.is_authenticated:
            return http.JsonResponse(
                {
                    "authenticated": False,
                },

                # HTTP: unauthorized
                status=401,
            )

        return http.JsonResponse(
            {
                "authenticated":    request.user.is_authenticated,

                "uid":              request.user.uid,
                "username":         request.user.username,
                "public_name":      request.user.public_name,
                "email":            request.user.email,
                "picture":          request.user.picture.url,
            },

            # HTTP: ok
            status=200,
        )

