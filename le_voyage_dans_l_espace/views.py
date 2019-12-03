# -*- coding: UTF-8 -*-
from django.shortcuts import render, get_object_or_404
from django.http import Http404

from le_voyage_dans_l_espace.models import Page, Partie


# Create your views here.
def avoir_page(request, slug):
	parties = []
	for p in Partie.objects.exclude(numero=0).exclude(numero=4).order_by('numero'):
		parties.append((p, Page.objects.filter(partie__numero=p.numero).order_by('numero')))
		
	page = get_object_or_404(Page, slug=slug)
	try:
		page_prec = Page.objects.get(partie=page.partie, numero=(page.numero - 1))
	except Page.DoesNotExist:
		page_prec = None
		
	try:
		page_suiv = Page.objects.get(partie=page.partie, numero=(page.numero + 1))
	except Page.DoesNotExist:
		page_suiv = None

	try:
		part_suiv = Partie.objects.get(numero=page.partie.numero + 1)
	except Partie.DoesNotExist:
		part_suiv = None

	return render(request, 'le_voyage_dans_l_espace/base.html', {
		'page_actuelle': page,
		'page_precedente': page_prec,
		'page_suivante': page_suiv,
		'pages_debut': Page.objects.filter(partie__numero=0).order_by('numero'),
		'pages_fin': Page.objects.filter(partie__numero=4).order_by('numero'),
		'partie_suivante': part_suiv,
		'parties': parties
	})


def avoir_sommaire_partie(request, partie_slug):
	if partie_slug in ("debut", "fin"):
		raise Http404

	parties = []
	for p in Partie.objects.exclude(numero=0).exclude(numero=4).order_by('numero'):
		parties.append((p, Page.objects.filter(partie__numero=p.numero).order_by('numero')))
		
	partie = get_object_or_404(Partie, slug=partie_slug)

	try:
		part_prec = Partie.objects.get(numero=partie.numero - 1)
	except Partie.DoesNotExist:
		part_prec = None

	try:
		part_suiv = Partie.objects.get(numero=partie.numero + 1)
	except Partie.DoesNotExist:
		part_suiv = None
		
	return render(request, 'le_voyage_dans_l_espace/sommaire_partie.html', {
		'partie': partie,
		'pages_partie': partie.page_set.order_by('numero'),
		'pages_debut': Page.objects.filter(partie__numero = 0).order_by('numero'),
		'pages_fin': Page.objects.filter(partie__numero = 4).order_by('numero'),
		'partie_precedente': part_prec,
		'partie_suivante': part_suiv,
		'parties': parties
	})


def accueil(request):
	parties = []
	for p in Partie.objects.exclude(numero = 0).exclude(numero = 4).order_by('numero'):
		parties.append((p, Page.objects.filter(partie__numero = p.numero).order_by('numero')))
	
	return render(request, 'le_voyage_dans_l_espace/sommaire.html', {
		'pages_debut': Page.objects.filter(partie__numero = 0).order_by('numero'),
		'pages_fin': Page.objects.filter(partie__numero = 4).order_by('numero'),
		'parties': parties,
	})


def test(request):		
	return render(request, 'le_voyage_dans_l_espace/test.html', {})
