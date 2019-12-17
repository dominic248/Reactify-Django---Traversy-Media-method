from django.urls import path, include
from .views import (
    # UserCreateAPIView,
    # UserLoginAPIView,
    CurrentUserAPIView,
    UserView,
    # UserPostListAPIView,
    FollowRemoveAPIView,
    FollowUnfollowAPIView,
    GoogleLogin,
    DeleteAllUnexpiredSessionsForUser

)
from rest_framework import routers
router = routers.DefaultRouter()
router.register('', UserView)

app_name = 'core-api'

urlpatterns = [
    path('current/details/', CurrentUserAPIView.as_view(),name='current-user-api'),
    path('', include(router.urls)),
    path('sessions/all/delete/', DeleteAllUnexpiredSessionsForUser.as_view(),name='del'),
    # path('create/', UserCreateAPIView.as_view(),name='create-user-api'),
    # path('login/', UserLoginAPIView.as_view(),name='login-user-api'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    # path('posts/<slug>/', UserPostListAPIView.as_view(),name='user-posts-api'),
    path('<slug>/follow/', FollowUnfollowAPIView.as_view(), name='user-follow-toggle'),
    path('<slug>/followremove/', FollowRemoveAPIView.as_view(), name='user-follow-remove'),

]
