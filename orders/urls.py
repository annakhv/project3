from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout",  views.logout_view, name="logout"),
    path("register",  views.register_view, name="register"),
    path("registerPage",  views.registerPage_view, name="registerPage"),
    path("review",  views.review_view, name="review")

]
