from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _
from rest_framework.serializers import ( 
    CharField,
    EmailField,
    ModelSerializer,
    ValidationError,
    ImageField,
    PrimaryKeyRelatedField,
    Serializer,
    SerializerMethodField,
    RelatedField,
)
from rest_framework import exceptions
from core.models import Profile
import requests
import json
from allauth.account.forms import ResetPasswordForm
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from allauth.account.utils import url_str_to_user_pk
from allauth.account.forms import default_token_generator
from allauth.account.utils import send_email_confirmation
from allauth.utils import (email_address_exists,
                               get_username_max_length)
from allauth.account import app_settings as allauth_settings
from rest_auth.models import TokenModel
User=get_user_model()

class LoginSerializer(Serializer):
    username = CharField(required=False, allow_blank=True)
    password = CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_username_email(self, username, password):
        user = None
        if username and password:
            try:
                user_obj=User.objects.get(username=username)
                user = self.authenticate(username=user_obj.username, password=password)
            except:
                try:
                    user_obj=User.objects.get(email=username)
                    user = self.authenticate(username=user_obj.username, password=password)
                except:
                    pass
        else:
            msg = _('Must include either "username" or "email" and "password".')
            raise exceptions.ValidationError(msg)
        return user

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = None
        if 'allauth' in settings.INSTALLED_APPS:
            user = self._validate_username_email(username, password)
        else:
            # Authentication without using allauth
            if username:
                user = self._validate_username_email(username, password)
        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)
        # If required, is the email verified?
        if 'rest_auth.registration' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
                email_address = user.emailaddress_set.get(email=user.email)
                if not email_address.verified:
                    send_email_confirmation(self.context.get("request"), user)
                    raise ValidationError(_('E-mail is not verified. Verification Mail has been resent to your E-mail!'))
        attrs['user'] = user
        return attrs


class TokenSerializer(ModelSerializer):
    """
    Serializer for Token model.
    """
    session_key = SerializerMethodField('get_session_key')
    def get_session_key(self,attrs):
        return self.context.get("request").session.session_key

    class Meta:
        model = TokenModel
        fields = ('key','session_key')


class PasswordResetSerializer(Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = EmailField()
    password_reset_form_class = ResetPasswordForm
    def get_email_options(self):
        """Override this method to change default e-mail options"""
        return {}
    def validate_email(self, value):
        # Create PasswordResetForm with the serializer
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise ValidationError(self.reset_form.errors)
        return value
    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }
        opts.update(self.get_email_options())
        self.reset_form.save(**opts)

class PasswordResetConfirmSerializer(Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    new_password1 = CharField(max_length=128)
    new_password2 = CharField(max_length=128)
    uid = CharField()
    token = CharField()
    set_password_form_class = SetPasswordForm
    def custom_validation(self, attrs):
        pass
    def validate(self, attrs):
        self._errors = {}
        # Decode the uidb64 to uid to get User object
        try:
            uid = url_str_to_user_pk(attrs['uid'])
            self.user = User._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise ValidationError({'uid': ['Invalid value']})
        self.custom_validation(attrs)
        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )
        if not self.set_password_form.is_valid():
            raise ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise ValidationError({'token': ['Invalid value']})
        return attrs
    def save(self):
        return self.set_password_form.save()



class ProfileSerializer(ModelSerializer):   
    image=ImageField(required=False, max_length=None,allow_empty_file=True, use_url=True)
    following=SerializerMethodField()
    class Meta:
        model = Profile
        fields = [
            'following', 
            'bio', 
            'location', 
            'birth_date',
            'image',
        ]

    def get_following(self,obj):
        followers = []
        a=obj.following.get_queryset().values_list('username', flat=True)
        for i in a:
            followers.append(i)
            # print(followers)
        return followers

class UserSerializer(ModelSerializer):
    profile = ProfileSerializer(required=False)
    # pk = PrimaryKeyRelatedField(queryset=User.objects.all())
    current_user = SerializerMethodField('curruser')
    followed_by=SerializerMethodField()
    class Meta:
        model=User
        fields=[
            'id',
            # 'pk',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
            'current_user',
            'followed_by',
        ]
        
    def update(self, instance, validated_data, *args, **kwargs):
        # print("Instance is",instance.username)
        profile_data = validated_data.pop("profile")
        profile=Profile.objects.get(user=instance)
        profile.bio=profile_data.get("bio",profile.bio)
        profile.location=profile_data.get("location",profile.location)
        profile.birth_date=profile_data.get("birth_date",profile.birth_date)
        profile.image=profile_data.get("image",profile.image)
        profile.save()
        instance.username=validated_data.get("username",instance.username)
        instance.email=validated_data.get("email",instance.email)
        instance.first_name=validated_data.get("first_name",instance.first_name)
        instance.last_name=validated_data.get("last_name",instance.last_name)
        instance.save()
        return instance

    def curruser(self, obj):
        try:
            return self.context['request'].user.id
        except:
            pass

    def get_followed_by(self,obj):
        try:
            self.context['request'].user.id
            followers = []
            # print(obj.followed_by.get_queryset())
            a=obj.followed_by.get_queryset().values_list('user', flat=True)
            #obj.followed_by.all().distinct() values_list('user', flat=True).distinct()
            for i in a:
                followers.append(User.objects.filter(id=i)[0].username)
                # print(followers)
            return followers
        except:
            pass
         

class UserRUDSerializer(ModelSerializer):
    profile = ProfileSerializer(required=True)
    pk = PrimaryKeyRelatedField(queryset=User.objects.all())
    current_user = SerializerMethodField('curruser')
    followed_by=SerializerMethodField()
    class Meta:
        model=User
        fields=[
            'pk',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
            'current_user',
            'followed_by',
        ]
    # def destroy(self, instance, validated_data, *args, **kwargs):
    #     if(self.context['request'].user.username==instance.username):
    #         print("Instance is",instance.username)
    #         # instance.delete()
    #     else:
    #         return self.context['request'].user
    def curruser(self, obj):
        try:
            return self.context['request'].user.id
        except:
            pass

    def get_followed_by(self,obj):
        followers = []
        a=obj.followed_by.get_queryset().values_list('user', flat=True)
        for i in a:
            followers.append(User.objects.filter(id=i)[0].username)
        return followers



# class UserCreateSerializer(ModelSerializer):
#     email=EmailField(label='E-Mail Address')
#     profile = ProfileSerializer(required=True)
#     class Meta:
#         model=User
#         fields=[
#             'username',
#             'password',
#             'email',
#             'profile'
#         ]
#         extra_kwargs={'password':{'write_only':True}}
#     # def validate(self,data):
#     #     email=data['email']
#     #     user_qs=User.objects.filter(email=email)
#     #     if user_qs.exists():
#     #         raise ValidationError("This email has already been registered!")
#     #     return data
#     def validate_email(self,value):
#         email=value
#         user_qs=User.objects.filter(email=email)
#         if user_qs.exists():
#             raise ValidationError("This email has already been registered!")
#         return value
#     def create(self, validated_data):
#         password=validated_data['password']
#         username=validated_data['username']
#         user_obj=User.objects.create(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             # is_active=False
#         )
#         user_obj.set_password(password)   
#         # user_obj.save()
#         profile_data = validated_data.pop('profile')
#         try:
#             prof_obj = Profile.objects.get(user=user_obj)
#         except:
#             prof_obj = None
#         user_o=User.objects.filter(username=username).first()
#         try:
#             image=profile_data['image']
#             if not prof_obj:
#                 prof=Profile.objects.create(
#                     user = user_obj,
#                     bio=profile_data['bio'],
#                     location=profile_data['location'],
#                     birth_date=profile_data['birth_date'],
#                     image=profile_data['image'],
#                 )
#             else:
#                 prof=Profile.objects.filter(user=user_o).update(
#                     user = user_o,
#                     bio=profile_data['bio'],
#                     location=profile_data['location'],
#                     birth_date=profile_data['birth_date'],
#                     image=profile_data['image'],
#                 )
#         except:
#             if not prof_obj:
#                 prof=Profile.objects.create(
#                     user = user_obj,
#                     bio=profile_data['bio'],
#                     location=profile_data['location'],
#                     birth_date=profile_data['birth_date'],
#                 )
#             else:
#                 prof=Profile.objects.filter(user=user_o).update(
#                     user = user_o,
#                     bio=profile_data['bio'],
#                     location=profile_data['location'],
#                     birth_date=profile_data['birth_date'],
#                 )
#         return user_obj
# class UserLoginSerializer(ModelSerializer):
#     token=CharField(allow_blank=True,read_only=True)
#     username=CharField(required=False,allow_blank=True)
#     email=EmailField(label='E-Mail Address',required=False,allow_blank=True)
#     class Meta:
#         model=User
#         fields=[
#             'username',  
#             'email',
#             'password',
#             'token'
#         ]
#         extra_kwargs={'password':{'write_only':True}}
#     def validate(self,data):
#         user_obj=None
#         email=data.get("email",None)
#         username=data.get("username",None)
#         password=data["password"]
#         if not email and not username:
#             raise ValidationError("A username or email is required!")
#         user=User.objects.filter(
#             Q(email=email) |
#             Q(username=username)
#         ).distinct()
#         user=user.exclude(email__isnull=True).exclude(email__iexact='')
#         if user.exists() and user.count()==1:
#             user_obj=user.first()
#         else:
#             raise ValidationError("Entered username or email is invalid!")
#         if user_obj:
#             if not user_obj.check_password(password):
#                 raise ValidationError("Incorrect credentials please try again!")
#             else:
#                 print(user_obj.username)
#                 headers = {'Content-Type': "application/json", 'Accept': "application/json"}
#                 data={"username":user_obj.username,"password":password}
#                 res = requests.post('http://127.0.0.1:8000/api/auth/token/', json=data, headers=headers)
#                 print(res.status_code)
#                 print(res.raise_for_status())
#                 text=res.json()
#         data["token"]=text['token']
#         return data   