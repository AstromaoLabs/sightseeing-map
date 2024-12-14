from django.db import models

# Create model for API data example
class SimpleModel(models.Model):
    message = models.CharField(max_length=255)
    number = models.IntegerField()

    def __str__(self):
        return self.message
    
    # To apply changes to the database, run the following commands:
    #python manage.py makemigrations
    #python manage.py migrate

    # To quickly populate the database with some data, run the following command:
    #python manage.py shell

    #from simpleapi.models import SimpleModel
    #SimpleModel.objects.create(message='Hello from the database!', number=42)
    #SimpleModel.objects.create(message='Another message', number=123)

    # To see the data in the database, run the following command:
    #print(SimpleModel.objects.all())
    #exit()
