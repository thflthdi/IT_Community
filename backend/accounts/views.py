from django.contrib.auth.hashers import make_password
from rest_framework import viewsets
from rest_framework.permissions import BasePermission

from .models import User
from .serializers import UserSerializer


class CustomAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # 비회원 GET, POST 권한 부여
        if not request.user.is_authenticated and request.method in ('GET', 'POST',):
            return True

        # 회원은 POST 불가능
        return bool(
            request.method not in ('POST',) and
            request.user and
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        # 본인 오브젝트에 한하여 모든 권한 부여
        if request.method in ('PUT', 'PATCH', 'DELETE',):
            return obj == request.user
        return True


class UserViewSet(viewsets.ModelViewSet):
    '''
    비회원 : list, retrieve 읽기가능, post 가능
    회원 : list, retrieve, 읽기 가능, post 불가능, 각자 본인 오브젝트에 대해서만 모든 권한(put, patch, delete)
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CustomAuthenticated]

    def perform_create(self, serializer):
        # client_ip 파싱후 추가
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ipaddress = x_forwarded_for.split(',')[-1].strip()
        else:
            ipaddress = self.request.META.get('REMOTE_ADDR')

        # password 암호화 저장
        serializer.save(client_ip=ipaddress,
                        password=make_password(serializer.validated_data["password"]))
