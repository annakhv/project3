from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.urls import reverse
from .models import DinnerPlatters, Salads, pasta, pizza, toppings, subs, order
import stripe
from django.views.decorators.csrf import csrf_exempt
import json

stripe.api_key ='sk_test_51IBkC8J1fe6rYWd5w12jcwF8eYDej0CStL3qHKHOU5aJTwHsd1X0gvxBSZT9AQa7RaThZmtiAVmbbzVmVmjSHf6p00NGYUcWps'

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

@csrf_exempt
def sendOrder_view(request):
    adminOrder={}
    thisOrder= request.POST.get('order', False)
    charge= request.POST.get('charge', False)
    orderNum= request.POST.get('orderNum', False)
    orderNum=int(orderNum)
    currentOrder=json.loads(thisOrder)
    for objects in currentOrder:
        items=currentOrder[objects]
        for keys in items:
            if keys=="name":    
               print(items[keys])
            else:
               print(items[keys]) ##these are toppings or subadds

    nextOrder=order(orderNumber=orderNum, orderItems=thisOrder)
    print(nextOrder)
    
    data={
        "order":"sent"
    }

    return JsonResponse(data)





def submitOrder_view(request):
    print(request)
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
    success_url='http://127.0.0.1:8000/success',
    cancel_url='http://127.0.0.1:8000/review',
    
  )
    print(session.id)
    print(session)
    return jsonify(id=session.id)


def success_view(request):
    return render(request, "orders/success.html")