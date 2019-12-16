from django.contrib.auth import get_user_model
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q
from django.db.models.functions import Concat
from django.db.models import Value
from .serializers import (
    UserDetailSerializer,
    UserRUDSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from ..models import Profile
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED
)
from rest_framework.views import APIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

User=get_user_model()
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.http import HttpResponse, HttpResponseRedirect
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.registration.views import SocialConnectView
# from posts.api.serializers import PostDetailSerializer
# from posts.api.pagination import StandardResultPagination
# from posts.models import Post
from django.utils import timezone
from django.contrib.sessions.models import Session
import datetime

class GoogleLogin(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter


class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        try:
            confirmation.confirm(self.request)
            return Response({"details":"E-mail ID registered successfully!"})
        except:
        # A React Router Route will handle the failure scenario
            return Response({"details":"Failed to register E-mail ID. Invalid Link!"})

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return Response({"details":"Failed to register E-mail ID. An error occured!"})
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs

    
class DeleteAllUnexpiredSessionsForUser(APIView):
    def get(self, request):
        try:
            unexpired_sessions = Session.objects.filter(expire_date__gte=timezone.now())
            [
                session.delete() for session in unexpired_sessions
                if str(request.user.id) == session.get_decoded().get('_auth_user_id')
            ] 
        except:
            return Response({"detail":"Error!"})
        return Response({"detail":"Successfully deleted all existing sessions!"})


class CurrentUserAPIView(APIView):
    def get(self, request):
        serializer = UserDetailSerializer(request.user,context={'request': request})
        newdict={"sessionkey":request.session.session_key}
        newdict.update(serializer.data)
        return Response(serializer.data)


class UserListAPIView(ListAPIView):
    serializer_class=UserDetailSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        qs=User.objects.all()
        query=self.request.GET.get('s')
        if query is not None:
            qs=qs.filter(
                Q(username__icontains=query)|
                Q(first_name__icontains=query)|
                Q(last_name__icontains=query)
            ).distinct()
        return qs

class UserRUDView(RetrieveUpdateDestroyAPIView):
    lookup_field= 'username'
    serializer_class=UserRUDSerializer
    queryset=User

    def get(self, request, username, *args, **kwargs):
        if(username!=request.user.username):
            return Response({"detail": "Not found."}, status=400)
        else:
            serializer = UserRUDSerializer(request.user,context={'request': request})
            return Response(serializer.data)
    def update(self, request, username, *args, **kwargs):
        if(username!=request.user.username):
            return Response({"detail": "Not found."}, status=400)
        else:
            serializer = UserRUDSerializer(request.user,context={'request': request})
            return Response(serializer.data)

    def destroy(self, request, username, *args, **kwargs):
        if(username!=request.user.username):
            return Response({"detail": "Not found."}, status=400)
        else:
            serializer = UserRUDSerializer(request.user,context={'request': request})
            return Response(serializer.data)

    # def get_queryset(self,*args, **kwargs):
    #     print(*args, **kwargs)
    #     return User.objects.all()


class FollowUnfollowAPIView(APIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'
    queryset = User.objects.all()

    def get(self, request, slug, format=None):
        message = "ERROR"
        toggle_user = get_object_or_404(User, username__iexact=slug)
        if request.user.is_authenticated:
            # print("Hey", request.user, toggle_user)
            is_following = Profile.objects.toggle_follow(request.user, toggle_user)
            user_qs = get_object_or_404(User, username=toggle_user)
            serializer = UserDetailSerializer(user_qs,context={'request': request})
            serializer2 = UserDetailSerializer(request.user,context={'request': request})
            new_serializer_data = dict(serializer.data)
            new_serializer_data2 = dict(serializer2.data)
            new_serializer_data.update({'following': is_following})
            new_serializer_data.update({'count': request.user.profile.following.all().count()})
            new_serializer_data.update({'count2': toggle_user.followed_by.all().count()})
            new_serializer_data.update({'logged': new_serializer_data2})
            return Response(new_serializer_data)
        return Response({"message": message}, status=400)


class FollowRemoveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, format=None):
        message = "ERROR"
        toggle_user = get_object_or_404(User, username__iexact=slug)
        if request.user.is_authenticated:
            # print("Hey", request.user, toggle_user)
            is_following = Profile.objects.toggle_remove_follow(request.user, toggle_user)
            user_qs = get_object_or_404(User, username=toggle_user)
            serializer = UserDetailSerializer(user_qs,context={'request': request})
            new_serializer_data = dict(serializer.data)
            new_serializer_data.update({'following': is_following})
            new_serializer_data.update({'count': request.user.followed_by.all().count()})
            return Response(new_serializer_data)
        return Response({"message": message}, status=400)

# class UserPostListAPIView(ListAPIView):
#     serializer_class = PostDetailSerializer
#     pagination_class = StandardResultPagination

#     def get_queryset(self, *args, **kwargs):
#         qsuser = Post.objects.filter(user__username=self.kwargs['slug']).order_by("-updated_on")
#         print(self.request.GET)
#         search = self.request.GET.get("s", None)
#         if search:
#             qsfn = qsuser.annotate(full_name=Concat('user__first_name', Value(' '), 'user__last_name'))
#             qs=qsfn.filter(
#                 Q(content__icontains=search) |
#                 Q(user__username__icontains=search) |
#                 Q(user__first_name__icontains=search) |
#                 Q(user__last_name__icontains=search) |
#                 Q(full_name__icontains=search)
#             )
#             return qs
#         else:
#             return qsuser






#Useless
# class UserCreateAPIView(CreateAPIView):
#     serializer_class = UserCreateSerializer
#     queryset = User.objects.all()
#     def post(self,request,*args,**kwargs):
#         serializer = UserCreateSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             subject="Thank you for signing up!"
#             message="Welcome to local host"
#             from_mail=settings.EMAIL_HOST_USER
#             to_list=[serializer.data['email'],settings.EMAIL_HOST_USER]
#             # send_mail(subject,message,from_mail,to_list,fail_silently=True)
#             return Response(serializer.data, status=HTTP_201_CREATED)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
# class UserLoginAPIView(APIView):
#     permission_classes=[AllowAny]
#     serializer_class = UserLoginSerializer
#     def post(self,request,*args,**kwargs):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             return Response(serializer.data,status=HTTP_200_OK)
#         return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)    