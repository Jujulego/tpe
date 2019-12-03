(function() {
	var domaine = document.domain
	var url_static = "http://" + domaine + "/static/le_voyage_dans_l_espace/";
	
	var resolution = window.screen.width;
	if (resolution <= 1024) {
		resolution = "1024";
		
	} else if (resolution <= 1960) {
		resolution = "1960";
		
	} else {
		resolution = "autre";
	}
	
	var images = ["fond1_" + resolution + ".jpeg", "fond2_" + resolution + ".jpeg"];
	var body = document.getElementsByTagName('body')[0];
	
	/^url\(\".{0,5}:\/\/.+\/(.+\..+)\"\)$/.test(compatibiliteIE.style(body).backgroundImage);
	var image = RegExp.$1;
	
	setInterval(function() {
		if (image == images[images.length-1]) {
			image = images[0];
		} else {
			image = images[images.indexOf(image) + 1];
		}
		
		body.style.backgroundImage = 'url("' + url_static + image + '")';
	}, 120000);
})();
