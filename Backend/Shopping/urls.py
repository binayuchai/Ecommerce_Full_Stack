from django.urls import path
from .views import AddToCartView,CartItemList,CartItemDelete
app_name="shopping"
urlpatterns = [
    path("api-cart-add/",AddToCartView.as_view(),name="cart-list"),
    path("api-cart-item/",CartItemList.as_view(),name="cart-item"),
    path("api-cart-delete/",CartItemDelete.as_view(),name="cart-item-delete")
    
    
 ]
