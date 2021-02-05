from django.contrib.auth.hashers import make_password
from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


class CustomAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(
            not request.method in ('POST',) and
            request.user and
            request.user.is_authenticated
        )


class CustomAllowAny(BasePermission):
    def has_permission(self, request, view):
        return request.method in ('GET', 'POST',) and not request.user.is_authenticated


class UserViewSet(viewsets.ModelViewSet):
    '''
    비회원 : list, retrieve 읽기가능, post 가능
    회원 : post 불가능, 각자 본인 오브젝트에 대해서 모든 권한(list, retrieve, put, patch, delete)
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CustomAuthenticated | CustomAllowAny]

    # def list(self, request, *args, **kwargs):
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        # client_ip 파싱후 추가
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ipaddress = x_forwarded_for.split(',')[-1].strip()
        else:
            ipaddress = self.request.META.get('REMOTE_ADDR')

        serializer.save(client_ip=ipaddress,
                        password=make_password(serializer.validated_data["password"]))
