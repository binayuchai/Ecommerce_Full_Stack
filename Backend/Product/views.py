from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ProductSerializer
from rest_framework import status
from .models import Product
from django.http import Http404
from rest_framework.response import Response

class ProductList(APIView):
    
    def get(self,request):
        products = Product.objects.all()
        serializer = ProductSerializer(products,many=True,context={'request':request})
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    

class ProductDetail(APIView):
    
    def get_object(self,id):
        try:
            return Product.objects.get(id=id)         
            
        except Product.DoesNotExist:
            raise Http404
    
    def get(self,request,id):
        product = self.get_object(id)
        serializer = ProductSerializer(product,context={'request':request})
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
