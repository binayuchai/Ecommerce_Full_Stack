from django.db import models
from Product.models import Product,TimeStampModel
from user.models import MyUser as User
import uuid
# Create your models here.



class Cart(TimeStampModel):
    uuid= models.UUIDField(default=uuid.uuid4)
    owner = models.OneToOneField(User,on_delete=models.CASCADE)
    is_checked_out = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=4,decimal_places=2,default=0.0)
    amount = models.DecimalField(max_digits=4,decimal_places=2,default=0.0)
    
    
    def __str__(self):
        return f"{self.uuid}"
    


class CartItem(TimeStampModel):
    product = models.ForeignKey(Product,on_delete=models.PROTECT)
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")
    quantity = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=8,decimal_places=2)

    def save(self,*args,**kwargs):
        self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.product}"