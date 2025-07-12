from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator

class Categoria(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    ordem = models.PositiveIntegerField(default=0)
    slug = models.SlugField(max_length=50, unique=True, blank=True)
    
    class Meta:
        ordering = ['ordem']
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.nome

class Ementa(models.Model):  
    TIPO_CHOICES = [
        ('ENT', 'Entrada'),
        ('PRIN', 'Prato Principal'),  
        ('BEB', 'Bebida'),
        ('SOB', 'Sobremesa'),
        ('OUT', 'Outros'),
    ]
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    imagem = models.ImageField(upload_to='ementa/', blank=True, null=True)



    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)

    nome = models.CharField("Nome", max_length=100)
    categoria = models.ForeignKey(
        Categoria, 
        verbose_name="Categoria",
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='itens_ementa'  
    )
    tipo = models.CharField(
        "Tipo", 
        max_length=4, 
        choices=TIPO_CHOICES,
        default='PRIN'
    )
    preco = models.DecimalField(
        "Preço", 
        max_digits=6, 
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    descricao = models.TextField("Descrição", blank=True)
    ingredientes = models.TextField("Ingredientes", blank=True)  
    disponivel = models.BooleanField("Disponível", default=True)
    destaque = models.BooleanField("Destaque", default=False)
    imagem = models.ImageField(
        "Imagem",
        upload_to='ementa/itens/',  # Alterado o path
        blank=True,
        null=True
    )
    data_criacao = models.DateTimeField("Data de criação", auto_now_add=True)
    data_atualizacao = models.DateTimeField("Data de atualização", auto_now=True)

    class Meta:
        ordering = ['tipo', 'nome']
        verbose_name = "Item da Ementa"  # PT-PT
        verbose_name_plural = "Itens da Ementa"  # PT-PT
        indexes = [
            models.Index(fields=['tipo', 'disponivel']),
        ]

    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()}) - {self.preco}€"  # Símbolo €