"""
@file       backend/fsuy_site/urls.py
@brief      URL configuration for fsuy_site Django's application.
@date       05-2026
"""

from django.urls import path, include
from django.urls.resolvers import URLPattern, URLResolver
from . import views

from rest_framework.routers import DefaultRouter
from .views import TestModelViewSet

router: DefaultRouter = DefaultRouter()
router.register("test_objects", TestModelViewSet)

urlpatterns: list[URLPattern | URLResolver] = [
    #   Frontend
    path("", views.FrontendView.serve_frontend, name="main"),

    path("api/", include(router.urls))
]

