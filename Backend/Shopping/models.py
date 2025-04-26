from django.db import models
from Product.models import Product,TimeStampModel
from user.models import MyUser as User
import uuid
from decimal import Decimal

# Create your models here.



class Cart(TimeStampModel):
    uuid= models.UUIDField(default=uuid.uuid4,unique=True,editable=False)
    owner = models.OneToOneField(User,on_delete=models.CASCADE)
    is_checked_out = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=4,decimal_places=2,default=0.00)
    amount = models.DecimalField(max_digits=8,decimal_places=2,default=0.00)
    
    
    def __str__(self):
        return f"Cart({self.owner}) - {self.uuid}"
    
    def calculate_total(self):
        if not self.pk:
            return Decimal("0.00")
        
        total = sum(item.total_price for item in self.items.all())
        print("Total before discount:", total)
        discount_amount = Decimal(total) * (self.discount / Decimal("100"))
        self.amount =total - discount_amount
        return self.amount
    
    
    # def save(self,*args,**kwargs):
    #     is_new = self.pk is None
    #     super().save(*args, **kwargs)
    #     self.calculate_total()
    #     print("Cart total calculated:", self.amount)
    #     if not is_new:
    #         super().save(*args, **kwargs)
        
    
    
    


class CartItem(TimeStampModel):
    product = models.ForeignKey(Product,on_delete=models.PROTECT)
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")
    quantity = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=8,decimal_places=2,default=0.00)

    def save(self,*args,**kwargs):
        self.total_price = Decimal(self.product.price * self.quantity)
        super().save(*args, **kwargs)
        
        #make sure cart is saved before updating it
        if self.cart.pk:
        #update the cart total
            print("Cart item saved, updating cart total")
            self.cart.calculate_total()
            print("Cart total after item save:", self.cart.amount)
            self.cart.save()
    
    def __str__(self):
        return f"{self.product}"