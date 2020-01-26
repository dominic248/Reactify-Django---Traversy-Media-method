from django.contrib import admin
from .models import Statement,Tag,StatementTag


class StatementAdmin(admin.ModelAdmin):
    list_display = ('text', 'in_response_to', 'conversation', 'created_at','get_tags' )
    list_filter = ('text', 'created_at')
    search_fields = ('text', )

    def get_tags(self, obj):
        return "\n".join([p.name for p in obj.tags.all()])


class TagAdmin(admin.ModelAdmin):
    list_display = ('name', )
    list_filter = ('name', )
    search_fields = ('name', )
