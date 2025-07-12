from django.contrib import admin
from .models import Categoria, Ementa

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('nome',)}
    list_display = ('nome', 'ordem', 'slug')

@admin.register(Ementa)
class EmentaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo_formatado', 'preco_formatado', 'categoria')
    
    def tipo_formatado(self, obj):
        return dict(Ementa.TIPO_CHOICES).get(obj.tipo, obj.tipo)
    tipo_formatado.short_description = 'Tipo'
    
    def preco_formatado(self, obj):
        return f"{obj.preco}€"
    preco_formatado.short_description = 'Preço'