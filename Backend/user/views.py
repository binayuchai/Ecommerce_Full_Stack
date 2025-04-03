from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer,LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from user.renderers import UserJSONRenderer

#create token manually
def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    
    return{
        'refresh':str(refresh),
        'access':str(refresh.access_token),
    }
    
class UserRegisterView(APIView):
    renderer_classes = [UserJSONRenderer]
    def post(self,request,format=None):
        serializer = UserSerializer(data=request.data)
        print("Serializer: ",serializer)

        if serializer.is_valid():
            print("Serializer: ",serializer)
            user = serializer.save()
            token = get_token_for_user(user)
            return Response({'token':token,'message':'Registration successful'},status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors['email'])
            print(type(serializer.errors['email']))

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
    

class UserLoginView(APIView):
    renderer_classes = [UserJSONRenderer]

    def post(self,request,format=None):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            print('Email',email)
            
            password = serializer.data.get('password')
            print("Password",password)
            
            user = authenticate(email=email,password=password)
            print(user)
            if user is not None:
                token = get_token_for_user(user)
                return Response({'token':token,'message':'Login Successful'},status=status.HTTP_200_OK)
            else:
                return Response({'message':'Email or Password is not valid'},status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
            