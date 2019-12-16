from django.urls import path, include
from .views import (
    # UserCreateAPIView,
    # UserLoginAPIView,
    CurrentUserAPIView,
    UserRUDView, 
    UserListAPIView,
    # UserPostListAPIView,
    FollowRemoveAPIView,
    FollowUnfollowAPIView,
    GoogleLogin,
    DeleteAllUnexpiredSessionsForUser

)

app_name = 'core-api'

urlpatterns = [
    path('', UserListAPIView.as_view(),name='list-user-api'),
    path('sessions/all/delete/', DeleteAllUnexpiredSessionsForUser.as_view(),name='del'),
    path('current/', CurrentUserAPIView.as_view(),name='current-user-api'),
    # path('create/', UserCreateAPIView.as_view(),name='create-user-api'),
    # path('login/', UserLoginAPIView.as_view(),name='login-user-api'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    # path('posts/<slug>/', UserPostListAPIView.as_view(),name='user-posts-api'),
    path('<username>/', UserRUDView.as_view(),name='rud-user-api'),
    path('<slug>/follow/', FollowUnfollowAPIView.as_view(), name='user-follow-toggle'),
    path('<slug>/followremove/', FollowRemoveAPIView.as_view(), name='user-follow-remove'),

]
