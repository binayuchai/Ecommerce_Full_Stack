from django.urls import path
from .views import AddToCartView,CartItemList
app_name="shopping"
urlpatterns = [
    path("api-cart-add/",AddToCartView.as_view(),name="cart-list"),
    path("api-cart-item/",CartItemList.as_view(),name="cart-item"),
    
    
 ]
