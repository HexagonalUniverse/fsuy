"""
@file       backend/fsuy_site/views.py
@brief      ...
@date       05-2026
"""

from django.core.handlers.asgi import ASGIRequest
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


class FrontendView(object):
    """
    ...
    """

    @staticmethod
    @csrf_exempt
    def serve_frontend(request: ASGIRequest) -> HttpResponse:
        if request.user.is_authenticated:
            ...

        # assert request.is_secure(), "N'é seguro coisa nenhuma!"

        return render(request, "index.html")

