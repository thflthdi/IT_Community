from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'password', 'client_ip', 'created_at', 'updated_at']
        # read_only_fields = ['client_ip']
        extra_kwargs = {'password': {'write_only': True},
                        'client_ip': {'read_only': True},
                        }
