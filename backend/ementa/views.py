from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ementa

@api_view(['GET'])
def lista_ementa(request):
    itens = Ementa.objects.filter(disponivel=True).select_related('categoria')
    data = [{
        'id': item.id,
        'nome': item.nome,
        'tipo': item.tipo,
        'preco': float(item.preco),
        'descricao': item.descricao,
        'categoria': item.categoria.nome if item.categoria else None
    } for item in itens]
    return Response(data)