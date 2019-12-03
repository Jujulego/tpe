(function() {
	function afficheImage(img) {
		var image = new Image();
		var overlay = document.getElementById('overlay_images');
		
		image.onload = function() {
			overlay.innerHTML = '';
			
			var hauteur_fenetre = window.innerHeight || document.body.offsetHeight;
			
			if (this.height > hauteur_fenetre-150) {
				this.height = hauteur_fenetre-150;
			}
			
			overlay.appendChild(image);
			
			var titre = document.createElement('figcaption');
			titre.innerHTML = img.title;
			
			overlay.appendChild(titre);
		};
		
		image.src = img.src;
		overlay.style.display = 'block';
	}

	var images = document.getElementsByTagName('img')
	
	if (images.length > 0) {
		for (var i = 0, c = images.length; i < c; i++) {
			images[i].onclick = function() {
				afficheImage(this);
			};
		}
	}
	
	document.getElementById('overlay_images').onclick = function() {
		this.style.display = 'none';
	};
})();
