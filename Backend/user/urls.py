from django.urls import path
from .views import UserRegisterView,UserLoginView,current_user
app_name="user"
urlpatterns = [
    path("api/register/",UserRegisterView.as_view(),name="user-register"),
    path("api/login/",UserLoginView.as_view(),name="user-login"),
    path('api/user/', current_user,name="current-user"),

    
 ]
