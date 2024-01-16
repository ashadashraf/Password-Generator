from rest_framework import generics
from .models import GenPass
from .serializers import GeneratePasswordSerializer, AllPasswordSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication
import random
from authentication.models import User

# Create your views here.

class GeneratePassword(generics.CreateAPIView):
    queryset = GenPass.objects.all()
    serializer_class = GeneratePasswordSerializer
    # permission_classes = IsAuthenticated

    def create(self, request, *args, **kwargs):
        site = request.data.get('site')
        word_length = request.data.get('word_length')
        upper_case = request.data.get('upper_case')
        lower_case = request.data.get('lower_case')
        special_char = request.data.get('special_char')
        numbers = request.data.get('numbers')
        user_id = request.data.get('user_id')
        prep = ''
        if word_length < 6 and word_length > 30:
            return Response({'message': 'Password length should be more than 6 or less than 30'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if not upper_case and lower_case and special_char and numbers:
            return Response({'message': 'Kindly select any of the attributes'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if upper_case:
            prep += "QWERTYUIOPASDFGHJKLMNBVCXZ"
        if lower_case:
            prep += "qwertyuioplkjhgfdsazxcvbnm"
        if special_char:
            prep += "!@#$%^&**()_+"
        if numbers:
            prep += '1234567890'
        
        # password = ''.join(random.sample(prep, k=word_length))
        password = ''
        for x in range(word_length):
            password += random.choice(prep)
        user = User.objects.get(id=user_id)
        p = GenPass.objects.create(site=site, password=password, user=user).save()
        response = {
            'message': 'Password generated successfully',
            'data': password,
        }
        return Response(response, status=status.HTTP_201_CREATED)
    

class AllPasswords(generics.ListAPIView):
    queryset = GenPass.objects.all()
    serializer_class = AllPasswordSerializer

    def get(self, request, *args, **kwargs):
        user_id = self.request.query_params.get('user_id')
        user = User.objects.get(id=user_id)
        queryset = GenPass.objects.filter(user=user)
        serializer = self.serializer_class(queryset, many=True)
        response = {
            'message': 'All passwords',
            'data': serializer.data,
        }
        return Response(response, status=status.HTTP_200_OK)