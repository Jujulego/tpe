(function() {
	function horloge(context, x, y) {
		// Dessiner une horloge:
		x = 50;
		y = 35;
	
		// le cadran :
		context.beginPath();
		context.arc(x, y, 25, 0, 2*Math.PI);
		context.stroke();
	
		// les graduations :
		context.beginPath();
		// 1
		context.moveTo(x + 8, y - 15);
		context.lineTo(x + 9.7, y - 18.6);
	
		// 2
		context.moveTo(x + 15, y - 7);
		context.lineTo(x + 18.7, y - 8.7);
	
		// 3
		context.moveTo(x + 17, y);
		context.lineTo(x + 21, y);
	
		// 4
		context.moveTo(x + 15, y + 7);
		context.lineTo(x + 18.7, y + 8.7);
	
		// 5
		context.moveTo(x + 8, y + 15);
		context.lineTo(x + 9.7, y + 18.6);
	
		// 6
		context.moveTo(x, y + 17);
		context.lineTo(x, y + 21);
	
		// 7
		context.moveTo(x - 8, y + 15);
		context.lineTo(x - 9.7, y + 18.6);
	
		// 8
		context.moveTo(x - 15, y + 7);
		context.lineTo(x - 18.7, y + 8.7);
	
		// 9
		context.moveTo(x - 17, y);
		context.lineTo(x - 21, y);
	
		// 10
		context.moveTo(x - 15, y - 7);
		context.lineTo(x - 18.7, y - 8.7);
	
		// 11
		context.moveTo(x - 8, y - 15);
		context.lineTo(x - 9.7, y - 18.6);
	
		// 12
		context.moveTo(x, y - 17);
		context.lineTo(x, y - 21);
		context.stroke();
		
		// Aiguilles
		context.beginPath();
		// heures
		context.moveTo(x, y);
		context.lineTo(x + 4.5, y - 9.1);
		
		// minutes
		context.moveTo(x, y);
		context.lineTo(x + 15, y);
		context.stroke()
	}
	
	function fleche(context) {
		// Dessiner une flêche:
		context.beginPath();
		context.moveTo(10, 90);
		context.lineTo(70, 90);
		context.lineTo(70, 70);
		context.lineTo(100, 100);
		context.lineTo(70, 130);
		context.lineTo(70, 110);
		context.lineTo(10, 110);
		context.closePath();
		context.stroke();
	}
	
	var canvas1 = document.getElementById('chronologie_combi_canvas_1');
	var context = canvas1.getContext('2d');
	
	context.strokeStyle = "rgb(200, 200, 200)";
	
	fleche(context);
	horloge(context, 50, 35);
	
	var canvas = document.getElementById('chronologie_combi_canvas_2');
	var context = canvas.getContext('2d');
	
	context.strokeStyle = "rgb(200, 200, 200)";
	
	fleche(context);
	horloge(context, 50, 35);
})();
