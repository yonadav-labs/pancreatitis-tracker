from django.contrib import admin

from general.models import *

class RunAlgorithmAdmin(admin.ModelAdmin):
    list_display = ['user', 'run_at']

admin.site.register(RunAlgorithm, RunAlgorithmAdmin)
