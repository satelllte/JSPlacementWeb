var canvas = document.getElementById("dis");
var pupu = document.getElementById("imgs");
var ctx = canvas.getContext("2d");

var res = 8192;

ctx.translate(res/2, res/2);

for (i = 0; i < sprite.length; i++){
	pupu.innerHTML = pupu.innerHTML + "<img src=\"req/Metropoli/" + sprite[i] + ".svg\" id=\"" + sprite[i] + "\" />";
}

function generateMap(){

	ctx.globalCompositeOperation = "normal";

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(-res, -res, res*2, res*2);


	var r = rand(0,5000);
	for(i = 0; i < r; i++){
		drawBuildings(96,64,1,0,32);
	}

	var r = rand(0,1250);
	for(i = 0; i < r; i++){
		drawBuildings(75,54,1.15,0,64);
	}

	var r = rand(0,1250);
	for(i = 0; i < r; i++){
		drawBuildings(64,32,1.5,0,96);
	}

	ctx.globalCompositeOperation = "difference";

	var r = rand(0,250);
	for(i = 0; i < r; i++){
		drawBuildings(64,32,3,0,128);
	}

	var r = rand(0,750);
	for(i = 0; i < r; i++){
		drawBuildings(256,96,1,64,100);
	}

	ctx.globalCompositeOperation = "normal";
	var r = rand(0,350);
	for(i = 0; i < r; i++){
		drawBuildings(96,32,4,128,169);
	}

	var r = rand(0,150);
	for(i = 0; i < r; i++){
		drawBuildings(64,28,6,0,255);
	}

	ctx.globalCompositeOperation = "normal";

	ctx.rotate(rand(0,360)*Math.PI/180);

	var keke = rand(0,sprite.length-1);
	var img = document.getElementById(sprite[keke]);

	ctx.drawImage(img,(-res*1.5)/2,(-res*1.5)/2,res*1.5,res*1.5);



	var sourceCanvas = document.getElementById("dis");
	ctx.drawImage(sourceCanvas, res/-2, res/-2);
}

function drawBuildings(min,max,range,colow,cohi){
	var co = rand(colow,cohi);

	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";

	var x = rand(-res/2,res/2)/range;
	var y = rand(-res/2,res/2)/range;
	var sx = rand(res/min,res/max);
	var sy = rand(res/min,res/max);

	ctx.fillRect(x,y,sx,sy);
	ctx.rotate(rand(0,360)*Math.PI/180);
}
