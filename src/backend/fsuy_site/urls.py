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

    #   Login
    path("register/", views.FrontendView.register, name="register"),
    path("login/", views.FrontendView.login, name="login"),
    path("logout/", views.FrontendView.logout, name="logout"),
]
