from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from insurance_backend import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=150, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name','email']

    def __str__(self):
        return self.username

class ClaimRequest(models.Model):
    username = models.CharField(max_length=100)
    policy_number = models.CharField(max_length=100)  
    policy_type = models.CharField(max_length=100, default='Life Insurance')  
    claim_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Claim {self.id} by {self.username}"

class Policy(models.Model):
    policy_number = models.CharField(max_length=100, unique=True)
    policy_type = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    policy_value = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # New field
    status = models.CharField(max_length=50, default='Active')  # New field

    def __str__(self):
        return self.policy_number


class SupportRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    category = models.CharField(max_length=50)
    order_id = models.CharField(max_length=100, blank=True, null=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Support Request from {self.name} - {self.subject}"
