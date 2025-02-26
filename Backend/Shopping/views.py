from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
# from .serializers import CartSerializer,CartItemSerializer
from .models import Cart,CartItem,Product
from .models import User
from rest_framework.response import Response
# class CartList(generics.ListCreateAPIView):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer
    


# class CartItemList(generics.ListCreateAPIView):
#     queryset = CartItem.objects.all()
#     serializer_class = CartItemSerializer
    
    
    
# class CartView(APIView):
    
#     def post(self,request,format=None):
#         productid = request.POST.get("productid")
#         slug = Product.objects.get(id=productid).slug
        
#         cart,created = Cart.objects.get_or_create(
#             is_checked_out = False,
#             owner = request.user,
#         )
        
        
        
        
       
    


    
    
    