from django.urls import path
from . import views

urlpatterns = [
    path('', views.lista_ementa, name='lista_ementa'),
]