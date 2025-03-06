from typing import Optional

from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    label = serializers.SerializerMethodField(help_text='The full name of the user if it exists, otherwise the username')

    @staticmethod
    def get_label(obj: Optional[User]) -> Optional[str]:
        if obj is None:
            return None

        return obj.get_full_name() or obj.username

    class Meta:
        # Note; When changing this, please change the classes that extend this serializer
        # IssueWatcherViewPayloadSerializer
        model = User
        fields = [
            'id',
            'label',
            'username',
            'email',
            'first_name',
            'last_name',
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        # Note; When changing this, please change the classes that extend this serializer
        # IssueWatcherViewPayloadSerializer
        model = Profile
        fields = '__all__'
        read_only_fields = ['user',]


class UserMeProfileSerializer(UserProfileSerializer):
    class Meta:
        model = UserProfileSerializer.Meta.model
        fields = UserProfileSerializer.Meta.fields
        read_only_fields = UserProfileSerializer.Meta.read_only_fields + [
            'type',
        ]


class UserWithProfileSerializer(UserSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = UserSerializer.Meta.fields + [
            'profile',
        ]


class UserWithPermissionsSerializer(UserWithProfileSerializer):
    permissions = serializers.SerializerMethodField()
    group_permissions = serializers.SerializerMethodField()

    is_staff = serializers.BooleanField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)

    @staticmethod
    def get_permissions(instance: User):
        return list(instance.get_user_permissions())

    @staticmethod
    def get_group_permissions(instance: User):
        return list(instance.get_group_permissions())

    class Meta:
        model = User
        fields = UserWithProfileSerializer.Meta.fields + [
            'permissions',
            'group_permissions',
            'is_staff',
            'is_superuser',
        ]


class AbbreviatedUserSerializer(UserSerializer):
    class Meta:
        model = UserSerializer.Meta.model
        fields = [
            'id',
            'label',
        ]


class CreatedByModelSerializer(serializers.ModelSerializer):
    created_by = AbbreviatedUserSerializer(read_only=True)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
