"""         --------------------------
@file       backend/fsuy_site/views.py
@brief      ...
@date       05-2026
"""

import django.contrib.auth as auth
import django.http as http

from django.shortcuts import render, redirect
from django.core.handlers.asgi import ASGIRequest
from django.views.decorators.csrf import csrf_exempt

from django.views.decorators.http import require_POST

User = auth.get_user_model()


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

        # assert request.is_secure(), "N'é seguro coisa nenhuma!"

        return render(request, "index.html")

    @staticmethod
    @require_POST
    def register(request: http.HttpRequest) -> http.HttpResponse:
        """
        Register view.
        :param request:
        :return:
        """

        if request.method != "POST":
            # isn't a post request -> renders the default page...
            return render(
                request,
                "register.html"
            )

        # getting the POST attributes.
        username: str = request.POST["username"]
        password: str = request.POST["password"]

        # creating the new user...
        user: User = User.objects.create_user(
            username=username,
            password=password
        )

        # logging-in.
        auth.login(request, user)

        # Ok.
        return redirect("/")

    @staticmethod
    @require_POST
    def login(request: http.HttpRequest) -> http.HttpResponse:
        """
        Login view.
        :return:
        """
        import json

        body = json.loads(request.body)

        username = body["username"]
        password = body["password"]

        # getting the POST attributes.
        #username = request.POST["username"]
        #password = request.POST["password"]

        # attempting to authenticate the user...
        user: None | User = auth.authenticate(
            request,
            username=username,
            password=password,
        )

        if user is None:
            return http.HttpResponse(
                "Invalid credentials.",
                status=401,
            )

        # logging-in.
        auth.login(request, user)

        # for instance, 30 [s] of session...
        session_in_seconds: int = 30
        request.session.set_expiry(session_in_seconds)

        # Ok.
        # return redirect("/")
        return http.JsonResponse({
            "success": True,
        },)

    @staticmethod
    def logout(request: http.HttpRequest) -> http.HttpResponse:

        # logging-out.
        auth.logout(request)

        # Ok.
        return redirect("/")

    @staticmethod
    def me(request):
        return http.JsonResponse({
            "authenticated": request.user.is_authenticated,
            "username": request.user.username if request.user.is_authenticated else None,
        })
