"""
@file       backend/fsuy_site/adming.py
@brief      ...
@date       06-2026
"""

from django.contrib.auth.admin import UserAdmin
from django.contrib import admin


from .models import *


for model in [
    User, Review, News, Comment, Reaction, Tag, Game,
]:
    admin.site.register(model)


