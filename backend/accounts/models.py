from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    client_ip = models.GenericIPAddressField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username