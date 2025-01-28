from django.db import models

# Create your models here.
class PasswordReset(models.Model):
    email = models.EmailField(max_length=255)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email