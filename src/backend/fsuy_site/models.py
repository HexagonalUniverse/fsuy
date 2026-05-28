from django.db import models

# Create your models here.

class TestModel(models.Model):
    tmid = models.IntegerField(primary_key=True)

    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    value = models.DecimalField(max_digits=10, decimal_places=2)