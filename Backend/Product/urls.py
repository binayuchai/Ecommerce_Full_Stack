from django.contrib import admin
from django.urls import path
from .views import ProductList,ProductDetail
app_name="product"
urlpatterns = [
    path("api-product-list/",ProductList.as_view(),name="product-list"),
    path("api-product-detail/<int:id>/",ProductDetail.as_view(),name="product-detail"),
    
    
]

