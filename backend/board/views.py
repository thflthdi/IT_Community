from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Board
from .serializer import BoardSerializer


class BoardAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # 비회원 GET 권한 부여
        if not request.user.is_authenticated and request.method in SAFE_METHODS:
            return True

        # 회원은 GET, POST 가능
        return bool(
            request.user and
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        # 단, 본인 오브젝트에 한하여 수정, 삭제 권한 부여
        if request.method in ('PUT', 'PATCH', 'DELETE',):
            return obj.user == request.user
        return True


class BoardViewSet(ModelViewSet):
    '''
    비회원 : GET 만 가능
    회원 : GET, POST 가능, 본인 오브젝트에 한하여 PUT, PATCH, DELETE 가능
    '''
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [BoardAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
