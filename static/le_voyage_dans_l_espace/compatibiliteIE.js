var compatibiliteIE = {

	// Évenements
	ajouterEvenement: function(element, event, fonction) {
		if (element.addEventListener) { // Si notre élément possède la propriété addEventListener()
			element.addEventListener(event, fonction, false);

		} else { // Si notre élément ne possède pas la propriété addEventListener() => IE
			element.attachEvent('on' + event, fonction);
		}
	},

	// Navigation entre les élements
	// Élements enfants
	premierElementEnfant: function(element) {
		var premierElement = undefined;

		if (element.firstElementChild) { // Si l'élement possède firstElementChild (>= IE9 et autres)
			premierElement = element.firstElementChild;
		} else {			// Pour IE6-7-8 et autres
			for (var i = 0, c = element.childNodes.length; i < c; i++) {
				if (element.childNodes[i].nodeName !== "#text") {
					premierElement = element.childNodes[i];
					break;
				}
			}
		}

		return premierElement;
	},

	dernierElementEnfant: function(element) {
		var dernierElement = undefined;

		if (element.lastElementChild) { // Si l'élement possède lastElementChild (>= IE9 et autres)
			dernierElement = element.lastElementChild;
		} else {			// Pour IE6-7-8 et autres
			for (var i = element.childNodes.length - 1; i >= 0; i--) {
				if (element.childNodes[i].nodeName !== "#text") {
					dernierElement = element.childNodes[i];
					break;
				}
			}
		}

		return dernierElement;
	},

	// Navigation entre les éléments d'un même niveau
	elementPrecedant: function(element) {
		var elementPrecedant = undefined;

		if (element.previousElementSibling) { 	// Si l'élement possède lastElementChild (>= IE9 et autres)
			elementPrecedant = element.previousElementSibling;
		} else {				// Pour IE6-7-8 et autres
			elementPrecedant = element.previousSibling;

			while (elementPrecedant.nodeName === "#text" && elementPrecedant !== undefined) {
				elementPrecedant = elementPrecedant.previousSibling;
			}
		}

		return elementPrecedant;
	},

	elementSuivant: function(element) {
		var elementSuivant = undefined;

		if (element.nextElementSibling) { 	// Si l'élement possède lastElementChild (>= IE9 et autres)
			elementSuivant = element.nextElementSibling;
		} else {				// Pour IE6-7-8 et autres
			elementSuivant = element.nextSibling;

			while (elementSuivant.nodeName === "#text" && elementSuivant !== undefined) {
				elementSuivant = elementSuivant.nextSibling;
			}
		}

		return elementSuivant;
	},
	
	// Récuperation d'un élement selon sa classe:
	getElementsByClass: function(tagName, classe) {
		var elements = [];
		
		classe = (classe.charAt(0) !== '.' ? classe : classe.substring(1))
		
		if (!document.querySelectorAll) {
			elements = document.querySelectorAll('.' + classe);
		} else {
			
			for (var i = 0, c = tagName.length; i < c; i++) {
			
				var elements_a_fouiller = document.getElementsByTagName(tagName[i]);
			
				for (var i2 = 0, c2 = elements_a_fouiller.length; i2 < c2; i2++) {
				
					if (elements_a_fouiller[i2].className === classe) {
						elements.push(elements_a_fouiller[i2]);
					}
				}
			}
		}
		
		return elements;
	},

	// Récuperation du contenu d'un élement
	contenu: function(element) {
		var texte = undefined;

		if (element.textContent) {
			texte = element.textContent;
		} else if (element.innerText) {	// Pour IE
			texte = element.innerText;
		}

		return texte;
	},
	
	// Récuperation du style d'un élement
	style: function(element) {
		var style = undefined;
	
		if (element.currentStyle) { // pour IE
			style = element.currentStyle;
		} else if (getComputedStyle) {
			style = getComputedStyle(element);
		}
		
		return style;
	}
};
