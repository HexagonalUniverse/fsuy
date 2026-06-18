"""         -------------------------
@file       backend/fsuy_site/urls.py
@brief      URL configuration for fsuy_site Django's application.
@date       05-2026
"""

from django.urls import path, include
from django.urls.resolvers import URLPattern, URLResolver
from django.contrib import admin
from . import views

#
#   API URL
#

from .models.viewsets import API_Viewset_Game
from rest_framework.routers import DefaultRouter, BaseRouter

api_router: BaseRouter = DefaultRouter()

for prefix, viewset in [
    ("games", API_Viewset_Game),
]:
    prefix: str

    api_router.register(
        prefix,
        viewset,
        basename=prefix,
    )

#
#   Patterns
#

urlpatterns: list[URLPattern | URLResolver] = [
    #   Frontend
    path("", views.FrontendView.serve_frontend, name="main"),

    #   Login
    path("register/", views.FrontendView.register, name="register"),
    path("login/", views.FrontendView.login, name="login"),
    path("logout/", views.FrontendView.logout, name="logout"),

    #   Admin
    path("admin/", admin.site.urls),

    #   API
    path("api/", include(api_router.urls)),
]
