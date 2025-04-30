from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CartSerializer,CartItemSerializer
from .models import Cart,CartItem,Product
from .models import User
from rest_framework import status

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
        

class AddToCartView(APIView):
    
    
    def post(self,request,format=None):
        print("Request data:",request.user)
        product_id = request.data.get("product_id")
        print("Product ID:",product_id)
        quantity = int(request.data.get("quantity",1))  # if quantity is not provided, default to 1
        
        print("Quantity:",quantity)
        product =Product.objects.get(id=product_id)
        print("Product:",product)
        
        #create or get
        cart,created = Cart.objects.get_or_create(owner=request.user,is_checked_out=False)
        
        if created:
            cart.save()
        
        #check if item is already in cart
        cart_item,item_created = CartItem.objects.get_or_create(cart=cart,product=product)
        
        if not item_created:
            cart_item.quantity += quantity 
        else:
            cart_item.quantity = quantity
        
        cart_item.save()
        
        
        return Response({"message":"Item added successfully to cart"},status=status.HTTP_200_OK)
    
    def delete(self,request,format=None):
        product_id = request.data.get("product_id")
        cart = Cart.objects.get(owner=request.user,is_checked_out=False)
        
        try:
            cartitem = CartItem.objects.get(cart=cart,product=product_id)
            cartitem.delete()
            return Response({"message":"Item removed successfully from cart"},status=status.HTTP_200_OK)
        except CartItem.DoesNotExit:
            return Response({"message":"Item did not found"},status=status.HTTP_404_NOT_FOUND)

    


    
    
    