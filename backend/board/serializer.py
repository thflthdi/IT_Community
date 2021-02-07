from rest_framework import serializers

from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['pk', 'title', 'content', 'user', 'created_at', 'updated_at']
        read_only_fields = ['user']


class BoardQuerySerializer(serializers.Serializer):
    query = serializers.CharField(help_text="제목과 내용으로 검색", required=False)
