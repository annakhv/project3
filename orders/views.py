from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.urls import reverse
from .models import DinnerPlatters, Salads, pasta, pizza, toppings, subs, subsAdds

def index(request):
    if not request.user.is_authenticated:
        return render(request, "orders/login.html", {"message": None})
    context ={
        "user" : request.user,
        "platters": DinnerPlatters.objects.all(),
        "salads" : Salads.objects.all(),
         "pasta" :pasta.objects.all(),
         "pizza" : pizza.objects.all(),
         "toppings": toppings.objects.all(),
         "subs" : subs.objects.all(),
         "subadds" : subsAdds.objects.all()
      
    }
   
    return render(request, "orders/user.html", context)

def registerPage_view(request):
    return render(request, "orders/register.html", {"message": None})

def register_view(request):
    print("hello")
    username=request.POST["username"]    
    password=request.POST["password"]
    email=request.POST["password"]
    fname=request.POST["fname"]
    lname=request.POST["lname"]
    user = User.objects.create_user(username, email, password)
    user.first_name=fname
    user.last_name=lname
    user.save()
    return render(request, "orders/login.html", {"message": "user is successfuly registered, login in now with your credentials"})


def login_view(request):
    username=request.POST["username"] 

    password=request.POST["password"]
    user=authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        
        return render(request, "orders/login.html", {"message": "Invalid credentials"})

def logout_view(request):
    logout(request)
    return render(request, "orders/login.html", {"message": "logged out"})
      
def review_view(request):
    return render(request, "orders/review.html")