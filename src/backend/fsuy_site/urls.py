"""
@file       backend/fsuy_site/urls.py
@brief      URL configuration for fsuy_site Django's application.
@date       05-2026
"""

from django.urls import path
from django.urls.resolvers import URLPattern, URLResolver
from . import views


urlpatterns: list[URLPattern | URLResolver] = [
    #   Frontend
    path("", views.FrontendView.serve_frontend, name="main"),
]


