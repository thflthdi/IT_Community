from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission
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
    list : Allow Any
    Retrieve : Allow Any
    Create : 인증된 회원만 못하게
    Update : IsAuth
    p_update : IsAuth
    Destroy : IsAuth
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
        serializer.save(client_ip=ipaddress)

        return super().perform_create(serializer)
