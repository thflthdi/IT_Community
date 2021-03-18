from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.permissions import BasePermission

from .models import User
from .serializers import UserSerializer, UserPutSerializer


class UserAuthenticated(BasePermission):
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
        # 단, 본인 오브젝트에 한하여 수정, 삭제 권한 부여
        if request.method in ('PUT', 'PATCH', 'DELETE',):
            return obj == request.user
        return True


class UserViewSet(viewsets.ModelViewSet):
    '''
    회원 CRUD

    비회원 : list, retrieve 읽기가능, post 가능
    회원 : list, retrieve, 읽기 가능, post 불가능, 각자 본인 오브젝트에 대해서만 모든 권한(put, patch, delete)
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserAuthenticated]

    def perform_create(self, serializer):
        # client_ip 파싱후 추가
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ipaddress = x_forwarded_for.split(',')[-1].strip()
        else:
            ipaddress = self.request.META.get('REMOTE_ADDR')

        serializer.save(client_ip=ipaddress)

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserPutSerializer
        return super().get_serializer_class()

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('Authorization', openapi.IN_HEADER, description="입력: 'JWT [token값]'",
                          type=openapi.TYPE_STRING)])
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('Authorization', openapi.IN_HEADER, description="입력: 'JWT [token값]'",
                          type=openapi.TYPE_STRING)])
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('Authorization', openapi.IN_HEADER, description="입력: 'JWT [token값]'",
                          type=openapi.TYPE_STRING)])
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
