from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.urls import reverse
from .models import DinnerPlatters, Salads, pasta, pizza, toppings, subs
import stripe

stripe.api_key ='pk_test_51IBkC8J1fe6rYWd51rlp3fnB9c4wfbjgle2jQiKtnQ2wBYOlYvMO4yIrO1EcT8cm7Dp9FjKLTEUACEfbcZEGWu5n003lFwJuT2'

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

def sendOrder_view(request):
    print("something")
    order= request.POST.get('order', False)
    print(order)

def submitOrder_view(request):
    print("start")
    session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
      'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': 'T-shirt',
        },
        'unit_amount': 2000,
      },
      'quantity': 1,
    }],
    mode='payment',
    success_url='/success',
    
  )
    print(session.id)
    print(session)
    return jsonify(id=session.id)


def success_view(request):
    return render(request, "orders/success.html")