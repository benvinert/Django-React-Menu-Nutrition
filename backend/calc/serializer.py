from rest_framework import serializers
from .models import foods


class foodSerializers(serializers.ModelSerializer):
    class Meta(foods):
        model = foods
        fields = '__all__'
        