from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password

# Create your models here.

class UserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **kwargs):
        if email is None:
            raise TypeError('Users must have an email.')
        
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_superuser = False
        user.is_staff = True
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password):
        if password is None:
            raise TypeError('Superuser must have a password.')
        if email is None:
            raise TypeError('Superuser must have an email.')
        
        user = self.create_user(email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user
    

class User(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(db_index=True, unique=True, null=False, blank=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"