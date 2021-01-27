from django.db import models
from jsonfield import JSONField

class pizza(models.Model):
    name=models.CharField(max_length=64)
    size=models.CharField(max_length=64)
    toppingQuantity=models.IntegerField()
    price=models.FloatField()
    def __str__(self):
          return f"{self.name}  {self.size} with {self.toppingQuantity} topping costs {self.price} "
  
class toppings(models.Model):
    topping=models.CharField(max_length=64)
    toPizza=models.ManyToManyField(pizza, blank=True, related_name="pizzaToppings")
    def __str__(self):
          return f"{self.topping} "

class subs(models.Model):
     subName=models.CharField(max_length=64)
     subSize=models.CharField(max_length=64)
     price=models.FloatField()
     def __str__(self):
          return f"{self.subName} sub  {self.subSize}  costs {self.price} "

class subsAdds(models.Model):
       addsName=models.CharField(max_length=64)
       price=models.FloatField()
       subs=models.ManyToManyField(subs, blank=True, related_name="adds" )
       def __str__(self):
              return f"{self.addsName}  costs {self.price} "

class pasta(models.Model):
     pastaName=models.CharField(max_length=64)
     price=models.FloatField()
     def __str__(self):
              return f"{self.pastaName}  costs {self.price} "

class Salads(models.Model):
     saladName=models.CharField(max_length=64)
     price=models.FloatField()
     def __str__(self):
              return f"{self.saladName}  costs {self.price} "

class DinnerPlatters(models.Model):
     dinnerplatter=models.CharField(max_length=64)
     size=models.CharField(max_length=64)
     price=models.FloatField()   
     def __str__(self):
              return f"{self.dinnerplatter} dinnerplatter size {self.size} costs {self.price} "

class order(models.Model):
     orderNumber=models.CharField(max_length=64)
     orderItems=models.JSONField()
     orderComplete=models.BooleanField(default=False)
     def __str__(self):
          return f"order N: {self.orderNumber}  {self.orderItems} status {self.orderComplete}"