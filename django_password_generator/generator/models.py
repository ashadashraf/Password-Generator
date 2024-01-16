from django.db import models
from django.utils import timezone
from authentication.models import User

# Create your models here.

class GenPass(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    site = models.CharField(max_length=30)
    time = models.DateTimeField(default=timezone.now)
    password = models.CharField(max_length=300)

    def __str__(self):
        return self.site