from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BoardViewSet, BoardSearchView

board_router = DefaultRouter()
board_router.register('posts', BoardViewSet)

urlpatterns = [
    path('search/', BoardSearchView.as_view()),
    path('', include(board_router.urls)),
]
