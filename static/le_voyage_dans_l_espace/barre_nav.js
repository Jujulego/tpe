
// Définitions des objets
function Lien(lien, texte) {
	// propriétés
	this.lien = lien;
	this.texte = texte;

	// méthodes
	this.creerElementHTML = function() {
		var lien = document.createElement('a');
		var texte = document.createTextNode(this.texte);

		lien.href = this.lien;
		lien.appendChild(texte);

		return lien;
	}
}

// Définition des fonctions:
function creerListe(listeLiens) {

	var liste = document.createElement('ul');

	for (var i = 0, c = listeLiens.length; i < c; i++) {
		if (listeLiens[i] instanceof Lien) {
			var elementListe = document.createElement('li');

			elementListe.appendChild(listeLiens[i].creerElementHTML());
			liste.appendChild(elementListe);
		} else {
			alert("Ce n'est pas un lien !");
		}
	}

	return liste;
}

(function() {		// Isolation du code

	var nav = document.getElementById('nav');
	var boutonBase = document.getElementById("bouton_base");
	var boutonRetour = document.getElementById("bouton_retour");
	var div = document.getElementById('div_principale');
	var divListe = document.getElementById('div_liste');
	var lignesTitresLiens = compatibiliteIE.getElementsByClass(['tr'], '.titre_partie_liens');
	var tbodyListesLiens = compatibiliteIE.getElementsByClass(['tbody'], '.partie_liens');
	var listesLiens = [];
	var header = document.getElementById('titre');
	var click = true;
	var bBoutonRetour = true;

	for (var i = 0, c = tbodyListesLiens.length; i < c; i++) {
		listesLiens.push(compatibiliteIE.dernierElementEnfant(compatibiliteIE.dernierElementEnfant(compatibiliteIE.dernierElementEnfant(tbodyListesLiens[i]))));
	}

	// Formatage
	nav.style.height = "37px";
	nav.style.width = "50px";
	nav.style.minWidth = "50px";
	header.style.marginLeft = "100px";
	div.style.marginLeft = "100px";
	divListe.style.display = "none";
	boutonBase.style.display = "block";
	boutonRetour.style.display = "block";

	// On appuie sur le bouton : il s'enfonce !
	compatibiliteIE.ajouterEvenement(nav, "mousedown", function() {
		nav.style.borderStyle = "inset";
	});

	// Au click sur la barre nav -> affichage des liens
	compatibiliteIE.ajouterEvenement(nav, "click", function() {
		if (click && bBoutonRetour) {
			nav.style.height = "90%";
			nav.style.width = "15%";
			nav.style.minWidth = "200px";
			header.style.marginLeft = "18%";
			div.style.marginLeft = "18%";
			divListe.style.display = "block";
			boutonBase.style.display = "none";

			click = false;
		}
		else {
			bBoutonRetour = true;
		}
	});

	// A la sortie de la souris de la barre nav -> retour à l'affichage précédent
	compatibiliteIE.ajouterEvenement(nav, "mouseout", function(event) {
		if (!click) {
			event = event || window.event;					// |--> Compatibilité IE
			var relatedTarget = event.relatedTarget || event.toElement;	// |

			while (relatedTarget != nav && relatedTarget.nodeName != 'BODY' && relatedTarget != document) {
				relatedTarget = relatedTarget.parentNode;
			}

			if (relatedTarget != nav) {
				nav.style.height = "37px";
				nav.style.width = "50px";
				nav.style.minWidth = "50px";
				nav.style.borderStyle = "outset";
				header.style.marginLeft = "100px";
				div.style.marginLeft = "100px";
				divListe.style.display = "none";
				boutonBase.style.display = "block";
				boutonRetour.style.borderStyle = "outset";

				for (var i = 0, c = listesLiens.length; i < c; i++) {
					listesLiens[i].style.display = "none";
				}

				click = true;
				bBoutonRetour = true;
			}
		}
	});

	// Bouton de retour
	compatibiliteIE.ajouterEvenement(boutonRetour, "click", function() {
		nav.style.height = "37px";
		nav.style.width = "50px";
		nav.style.minWidth = "50px";
		nav.style.borderStyle = "outset";
		header.style.marginLeft = "100px";
		div.style.marginLeft = "100px";
		divListe.style.display = "none";
		boutonBase.style.display = "block";
		boutonRetour.style.borderStyle = "outset";

		for (var i = 0, c = listesLiens.length; i < c; i++) {
			listesLiens[i].style.display = "none";
		}

		click = true;
		bBoutonRetour = false;
	});

	// Effoncement du bouton quand on appuie dessus
	compatibiliteIE.ajouterEvenement(boutonRetour, "mousedown", function() {
		boutonRetour.style.borderStyle = "inset";
	});

	// Gérer le déroulement des liste de liens
	for (var i = 0, c = lignesTitresLiens.length; i < c; i++) {
		compatibiliteIE.dernierElementEnfant(compatibiliteIE.dernierElementEnfant(compatibiliteIE.elementSuivant(lignesTitresLiens[i]))).style.display = 'none';
	
		compatibiliteIE.ajouterEvenement(lignesTitresLiens[i], "click", function(event) {
			var cible = event.target || event.srcElement;
			var liste = compatibiliteIE.dernierElementEnfant(compatibiliteIE.dernierElementEnfant(compatibiliteIE.elementSuivant(cible.parentNode)));
			
			for (var i = 0, c = listesLiens.length; i < c; i++) {
				if (listesLiens[i] !== liste) {
					listesLiens[i].style.display = "none";
				} else {
					liste.style.display = (liste.style.display === "none" ? "block" : "none");
				}
			}
		});
	}
})();
