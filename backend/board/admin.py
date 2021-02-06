from django.contrib import admin

from .models import Board


@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'user', 'created_at', 'updated_at']
    list_display_links = ['title']
