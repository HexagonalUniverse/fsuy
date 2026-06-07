from django.contrib import admin

# Register your models here.
from .models import TestModel, Game

admin.site.register(TestModel)
admin.site.register(Game)