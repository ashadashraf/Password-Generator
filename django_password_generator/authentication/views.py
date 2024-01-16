from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class LoginAPI(APIView):
    def post(self, request):
        try:
            data = request.data
            serializer = LoginSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data['email']
                password = serializer.data['password']

                users = User.objects.filter(email=email)
                if not users.exists():
                    return Response({
                        'status': 400, 
                        'message': 'user does not exist',
                        'data': {},
                    })

                user = authenticate(email=email, password=password)
                if user is None:
                    return Response({
                        'status': 400, 
                        'message': 'invalid password',
                        'data': {},
                    })
                
                # if user.is_verified is False:
                #     return Response({
                #         'status': 400, 
                #         'message': 'your account is not verified',
                #         'data': {},
                #     })
                
                refresh = RefreshToken.for_user(user)
                return Response({
                    'status': 200,
                    'message': 'login success',
                    'data': {
                        'userId': user.id,
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })

            
            return Response({
                'status': 400, 
                'message': 'something went wrong',
                'data': serializer.errors,
            })
        
        except Exception as e:
            print(e)

class Register(APIView):
    def post(self, request):
        try:
            data = request.data
            users = User.objects.filter(email=data['email'])
            if users:
                return Response({
                    'status': 400, 
                    'message': 'email already exist',
                })
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()

                return Response({
                    'status': 200, 
                    'message': 'registeration success',
                    'data': serializer.data,
                })
            
            return Response({
                'status': 400, 
                'message': 'something went wrong',
                'data': serializer.errors,
            })
        
        except Exception as e:
            print(e)