from django.contrib import admin

from general.models import *

class RunAlgorithmAdmin(admin.ModelAdmin):
    list_display = ['user', 'run_at']
    list_filter = ['user']


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    list_filter = ['user']


class MaintenanceAdmin(admin.ModelAdmin):
	list_display = ['title', 'start_at', 'end_at', 'status']
	list_filter = ['status']

admin.site.register(RunAlgorithm, RunAlgorithmAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Maintenance, MaintenanceAdmin)
