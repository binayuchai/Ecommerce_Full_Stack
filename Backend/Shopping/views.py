from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CartSerializer,CartItemSerializer
from .models import Cart,CartItem,Product
from .models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
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
    

        
    
    def put(self,request,format=None):
        print("Request data:",request.data)
        print("User:",request.user)
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        
        if not item_id or not quantity:
            return Response({"message":"Item ID and quantity are required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart_item = CartItem.objects.get(id=item_id)
            cart_item.quantity = quantity
            cart_item.save()
            return Response({"message":"Item quantity updated successfully"},status=status.HTTP_200_OK)
        
        except CartItem.DoesNotExist:
            return Response({"message":"Item not found"},status=status.HTTP_404_NOT_FOUND)
        

    

class CartItemList(APIView):
    
    permission_classes = [IsAuthenticated]
    
    
    def get(self,request,format=None):
        cart = Cart.objects.get(owner=request.user,is_checked_out=False)
        cart_items = CartItem.objects.filter(cart=cart)
        serializer = CartItemSerializer(cart_items,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    

class CartItemDelete(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def delete(self,request,format=None):
        item_id = request.data.get("item_id")
        
        if not item_id:
            return Response({"message":"Item ID is required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart_item = CartItem.objects.get(id=item_id)
            cart_item.delete()
            return Response({"message":"Item deleted successfully"},status=status.HTTP_200_OK)
        
        except CartItem.DoesNotExist:
            return Response({"message":"Item not found"},status=status.HTTP_404_NOT_FOUND)