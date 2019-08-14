from django.contrib import admin

from general.models import *

class RunAlgorithmAdmin(admin.ModelAdmin):
    list_display = ['user', 'run_at']
    list_filter = ['user']


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    list_filter = ['user']

admin.site.register(RunAlgorithm, RunAlgorithmAdmin)
admin.site.register(Feedback, FeedbackAdmin)
