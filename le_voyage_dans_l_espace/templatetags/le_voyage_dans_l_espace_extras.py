# -*- coding: UTF-8 -*-
from django import template
import re

register = template.Library()

# regex:
trouve_script = re.compile(r"^(?P<avant>.*)<script(?P<args>.*)>(?P<contenu>.*)</script>(?P<apres>)$", re.DOTALL)
trouve_style = re.compile(r"^(?P<avant>.*)<style(?P<args>.*)>(?P<contenu>.*)</style>(?P<apres>)$", re.DOTALL)
trouve_form = re.compile(r"^(?P<avant>.*)<form(?P<args>.*)>(?P<contenu>.*)</form>(?P<apres>)$", re.DOTALL)
trouve_input = re.compile(r"^(?P<avant>.*)<input(?P<args>.*)>(?P<contenu>.*)</input>(?P<apres>)$", re.DOTALL)
trouve_rien = re.compile(r"^(?P<avant>.*)<rien />(?P<apres>)$", re.DOTALL)

# dicos:
chiffres_romains = (
	{
		"multiple": 100,
		9: "CM",
		5: "D",
		4: "CD",
		1: "C"
	},
	
	{
		"multiple": 10,
		9: "XC",
		5: "L",
		4: "XL",
		1: "X"
	},
	
	{
		"multiple": 1,
		9: "IX",
		5: "V",
		4: "IV",
		1: "I"
	}
)


@register.filter()
def smart_escape(texte):
	"""
		Échappe les balises script, style, form et input
	"""
	
	cond = trouve_script.match(texte) or trouve_style.match(texte) or trouve_form.match(texte) or trouve_input.match(texte) or trouve_rien.match(texte)
	
	while cond:
		texte = trouve_script.sub(r'\g<avant>&ltscript\g<args>&gt\g<contenu>&lt/script&gt\g<apres>', texte)
		texte = trouve_style.sub(r'\g<avant>&ltstyle\g<args>&gt\g<contenu>&lt/style&gt\g<apres>', texte)
		texte = trouve_form.sub(r'\g<avant>&ltform\g<args>&gt\g<contenu>&lt/form&gt\g<apres>', texte)
		texte = trouve_input.sub(r'\g<avant>&ltinput\g<args>&gt\g<contenu>&lt/input&gt\g<apres>', texte)
		texte = trouve_rien.sub(r'\g<avant>\g<apres>', texte)
		
		cond = trouve_script.match(texte) or trouve_style.match(texte) or trouve_form.match(texte) or trouve_input.match(texte) or trouve_rien.match(texte)
	
	return texte


@register.filter()
def decimal_vers_romain(nombre):
	"""
		Transforme un nombre decimal en un nombre romain
	"""

	try:
		nombre = int(nombre)
	except ValueError:
		return nombre

	if nombre == 0:
		return "0"
	
	nb_romain = "M"*(nombre // 1000)
	nombre %= 1000
	
	for niveau in chiffres_romains:
		if nombre >= 9 * niveau["multiple"]:
			nb_romain += niveau[9]
			nombre %= niveau["multiple"]
			
		elif nombre >= 5 * niveau["multiple"]:
			nb_romain += niveau[5]
			nombre %= 5 * niveau["multiple"]
			
		elif nombre >= 4 * niveau["multiple"]:
			nb_romain += niveau[4]
			nombre %= niveau["multiple"]
			
		nb_romain += niveau[1] * (nombre // niveau["multiple"])
		nombre %= niveau["multiple"]
	
	return nb_romain
