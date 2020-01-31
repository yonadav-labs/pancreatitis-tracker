from django.db import models

from django.contrib.auth.models import User

class RunAlgorithm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    input = models.TextField()
    output = models.TextField()
    run_at = models.DateTimeField()

    def __str__(self):
        return self.user.username


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Maintenance(models.Model):
    title = models.TextField()
    start_at = models.DateTimeField(null=True, blank=True)
    end_at = models.DateTimeField(null=True, blank=True)
    status = models.BooleanField()

    def __str__(self):
        return self.title
