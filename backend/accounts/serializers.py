from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'password', 'first_name', 'last_name', 'client_ip', 'created_at', 'updated_at']
        # read_only_fields = ['client_ip']
        extra_kwargs = {'password': {'write_only': True},
                        'client_ip': {'read_only': True},
                        }

    def save(self, **kwargs):
        user = super().save(**kwargs)
        user.set_password(self.validated_data["password"])
        user.save()
        return user


class UserPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'first_name', 'last_name', 'client_ip', 'updated_at']
        read_only_fields = ['client_ip']
