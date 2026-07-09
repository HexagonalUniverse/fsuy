"""         -------------------------
@file       backend/fsuy_site/urls.py
@brief      URL configuration for fsuy_site Django's application.
@date       05-2026
"""

from django.urls import path, include
from django.urls.resolvers import URLPattern, URLResolver
from django.contrib import admin
from . import views

from rest_framework.routers import DefaultRouter
from .views import TestModelViewSet, GameModelViewSet

router: DefaultRouter = DefaultRouter()
router.register("test_objects", TestModelViewSet)
router.register("games", GameModelViewSet)

#
#   API URLs
#

from .models.viewsets import API_Viewset_User, API_Viewset_Game, API_Viewset_Review, API_Viewset_News
from .models.viewsets import API_Viewset_Comment
from rest_framework.routers import DefaultRouter, BaseRouter


api_router: BaseRouter = DefaultRouter()


for prefix, viewset in [
    #
    ("user", API_Viewset_User),
    ("game", API_Viewset_Game),
    ("review", API_Viewset_Review),
    ("news", API_Viewset_News),
    ("comments", API_Viewset_Comment),
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
