from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BoardViewSet

board_router = DefaultRouter()
board_router.register('posts', BoardViewSet)

urlpatterns = [
    path('', include(board_router.urls))
]
