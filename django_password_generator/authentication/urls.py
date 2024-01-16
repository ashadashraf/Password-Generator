from django.urls import path
from .views import Register, LoginAPI

urlpatterns = [
    path('register/', Register.as_view()),
    path('login/', LoginAPI.as_view()),
]
