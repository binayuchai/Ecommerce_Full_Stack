from django.db import models
from django.urls import reverse                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
from django.utils.text import slugify
# Create your models here.

class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    
    class Meta:
        abstract = True
        
        

class Category(TimeStampModel):
    name=models.CharField(max_length=255)
    slug=models.SlugField(blank=True)
    
    
    def get_absolute_url(self):
        return f"/{self.slug}/"
    
    
    def save(self,*args, **kwargs):
        self.slug=slugify(self.name)
        super(Category,self).save(*args, **kwargs)
        
        
    def __str__(self):
        return self.name
    
    

class Tag(TimeStampModel):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
    
    def get_absolute_url(self):
        return f"/{self.name}/"


class Product(TimeStampModel):
    name=models.CharField(max_length=255)
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    tag=models.ForeignKey(Tag,on_delete=models.PROTECT)
    description=models.TextField()
    sku=models.IntegerField()
    slug=models.SlugField(unique=True,blank=True)
    image=models.ImageField(upload_to='products/',null=True,blank=True)
    stock=models.IntegerField(default=0)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    
    
    def __str__(self):
        return self.name
    
    def save(self,*args, **kwargs):
        self.slug=slugify(self.name)
        super(Product,self).save(*args,**kwargs)
        
        
        
    def get_absolute_url(self):
        return reverse("product:product_detail", kwargs={"category_slug": self.category.slug,'product_slug':self.slug})
    