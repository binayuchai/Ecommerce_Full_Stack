from django.db import models
from Product.models import Product
from django.contrib.auth.models import User
# Create your models here.
class Cart(models.Model):
    cart_id = models.CharField(max_length=255,blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.cart_id
    


class CartItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    quantity = models.IntegerField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    
    
    
    
    def sub_total(self):
        return self.product.price * self.quantity
    