var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var res = 8192;
var cord = res/2;

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

ctx.translate(res/2, res/2);

function generateMap(){

	ctx.globalCompositeOperation = "normal";

	var iters = document.getElementById('iterations').value;
	var itersalt = document.getElementById('subiterations').value;
	var itersb = document.getElementById('iterationsb').value;
	var bgcol = document.getElementById('bgcol').value;

	ctx.fillStyle = "rgb(" + bgcol + "," + bgcol + "," + bgcol + ")";
	ctx.fillRect(res/-2, res/-2, res, res);

	ctx.globalCompositeOperation = "difference";

	for(i = 0; i < iters; i++){
		drawBox(res/2,3);
	}
	for(i = 0; i < itersalt; i++){
		drawBox(res/2,3,true);
	}

	ctx.globalCompositeOperation = "normal";

	for(i = 0; i < itersalt; i++){
		drawBox(res/2,6);
	}
	for(i = 0; i < iters; i++){
		drawBox(res/2,12);
	}

	if (document.getElementById('difference-option').checked) {
		ctx.globalCompositeOperation = "difference";
	}

	if (document.getElementById('yes-option').checked) {
		for(i = 0; i < itersb; i++){
			splitter(res,8,false);
		}
		for(i = 0; i < itersb; i++){
			splitter(res,8,true);
		}
	}

	ctx.globalCompositeOperation = "normal";

	var sourceCanvas = document.getElementById("dis");
	ctx.drawImage(sourceCanvas, res/-2, res/-2);
}

function drawBox(max,limit,yn){
	var x = rand(-max,max);
		if(yn == true){
			var y = x;
		}
		else{
			var y = rand(-max,max);
		}
	var sx = rand(1,max/limit);
	var sy = rand(1,max/limit);

	var co = rand(0,255);

	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";

	if (document.getElementById('symmetry1').checked) {
		ctx.fillRect(x,y,sx,sy);
		ctx.fillRect(x,-y,sx,-sy);
	}
	else if (document.getElementById('symmetry2').checked) {
		ctx.fillRect(x,y,sx,sy);
		ctx.fillRect(-x,y,-sx,sy);
	}
	else if (document.getElementById('symmetry0').checked) {
		ctx.fillRect(x,y,sx,sy);
		ctx.fillRect(-x,y,-sx,sy);
		ctx.fillRect(x,-y,sx,-sy);
		ctx.fillRect(-x,-y,-sx,-sy);
	}

}

function splitter(max,limit,vert){
	var x = rand(-max,max);
	var y = rand(-max,max);
	var sx = rand(max/32,max/limit);
	var sy = rand(max/32,max/limit);

	if (document.getElementById('difference-option').checked) {
		var co = 128;
	}
	else{
		var co = rand(0,255);
	}

	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";

	if(vert == false){
		ctx.fillRect(0,y,sx,sy);
		ctx.fillRect(0,y,-sx,sy);
		ctx.fillRect(0,-y,sx,-sy);
		ctx.fillRect(0,-y,-sx,-sy);
	}
	else{
		ctx.fillRect(x,0,sx,sy);
		ctx.fillRect(-x,0,-sx,sy);
		ctx.fillRect(x,0,sx,-sy);
		ctx.fillRect(-x,0,-sx,-sy);
	}
}
