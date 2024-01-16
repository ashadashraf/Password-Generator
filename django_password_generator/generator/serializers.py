from rest_framework import serializers
from .models import GenPass
from authentication.serializers import UserSerializer

class GeneratePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenPass
        fields = "__all__"

class AllPasswordSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = GenPass
        fields = ['site', 'time', 'password', 'user']