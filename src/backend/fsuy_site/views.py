"""
@file       backend/fsuy_site/views.py
@brief      ...
@date       05-2026
"""

import django.contrib.auth as auth
import django.http as http

from django.shortcuts import render, redirect
from django.core.handlers.asgi import ASGIRequest
from django.views.decorators.csrf import csrf_exempt

User = auth.get_user_model()



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
            ...

        # assert request.is_secure(), "N'é seguro coisa nenhuma!"

        return render(request, "index.html")

    @staticmethod
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
    def login(request: http.HttpRequest) -> http.HttpResponse:
        """
        Login view.
        :return:
        """

        if request.method != "POST":
            return render(
                request,
                "login.html",
            )

        # getting the POST attributes.
        username = request.POST["username"]
        password = request.POST["password"]

        # attempting to authenticate the user...
        user: None | User = auth.authenticate(
            request,
            username=username,
            password=password
        )

        if user is None:
            return http.HttpResponse(
                "Invalid credentials.",
                status=401,
            )

        # logging-in.
        auth.login(request, user)

        # Ok.
        return redirect("/")

    @staticmethod
    def logout(request: http.HttpRequest) -> http.HttpResponse:

        # logging-out.
        auth.logout(request)

        # Ok.
        return redirect("/")
