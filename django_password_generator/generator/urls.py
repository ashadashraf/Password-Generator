from django.urls import path
from .views import GeneratePassword, AllPasswords
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

urlpatterns = [
    path('', GeneratePassword.as_view(), name='generate-password'),
    path('allpasswords', AllPasswords.as_view(), name='all-password'),
]

urlpatterns += router.urls