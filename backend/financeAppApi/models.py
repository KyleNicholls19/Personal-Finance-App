from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

class Expense(models.Model):
    title = models.CharField(max_length= 100)
    amount = models.FloatField()
    dates = models.JSONField()
        
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')

    def __str__(self):
        return self.title

