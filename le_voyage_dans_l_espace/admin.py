# -*- coding: UTF-8 -*-
from django.contrib import admin
from le_voyage_dans_l_espace.models import Partie, Page
import re

# regex
trouve_balises = re.compile(r"^(?P<avant>.*)<(?P<contenu>.+)>(?P<apres>.*)$", re.DOTALL)


# Modifications des listes:
class PageAdmin(admin.ModelAdmin):
	# Méthodes
	def apercu_contenu(self, page):
		if page.contenu == "<rien />":
			return "Vide"
		else:
			texte = page.contenu
			cond = trouve_balises.match(texte)
			while cond:
				texte = trouve_balises.match(texte).groupdict()["avant"] + trouve_balises.match(texte).groupdict()["apres"]
				cond = trouve_balises.match(texte)
				
			if len(texte) <= 40:
				return texte
			else:
				return texte[:40] + " ..."

	apercu_contenu.short_description = "aperçu contenu"
	
	def avec_images(self, page):
		if page.images:
			return "Avec"
		else:
			return "Sans"
			
	avec_images.short_description = "Images"
	
	def avec_liens(self, page):
		if page.liens_vues:
			return "Avec"
		else:
			return "Sans"
			
	avec_liens.short_description = "Liens vers des vues"

	# Attributs
	# listes
	list_display = ('titre', 'apercu_contenu', 'avec_images', 'avec_liens', 'partie', 'numero')
	list_filter = ('partie',)
	ordering = ('partie', 'numero')
	search_fields = ('titre', '_contenu')
	
	# édition
	fieldsets = (
		('Général', {
			'fields': ('titre', 'slug', 'partie', 'numero')
		}),
		('Contenu de la page', {
			'description': "Ce formulaire accepte les balises HTML.",
			'fields': ('_contenu', 'images', 'liens_vues')
		}),
	)
	prepopulated_fields = {'slug': ('titre',)}


class PartieAdmin(admin.ModelAdmin):
	# Méthodes
	def get_nombre_pages(self, partie):
		return len(partie.page_set.all())

	get_nombre_pages.short_description = "nombre de pages"

	# Attributs
	list_display = ('titre', 'get_nombre_pages')
	ordering = ('numero',)
	search_fields = ('titre',)
	
	# édition
	prepopulated_fields = {'slug': ('titre',)}


# Register your models here.
admin.site.register(Partie, PartieAdmin)
admin.site.register(Page, PageAdmin)
