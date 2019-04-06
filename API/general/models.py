from django.db import models

from django.contrib.auth.models import User

class RunAlgorithm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    input = models.TextField()
    output = models.TextField()
    run_at = models.DateTimeField()

    def __str__(self):
        return self.user.username if self.user else 'Anonymous'
