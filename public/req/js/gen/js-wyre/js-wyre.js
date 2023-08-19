var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var res = 8192;

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

var cord = 0;
var curx, cury, nxtx, nxty, step, co, lw;

function generateMap(){
	var layers = document.getElementById('layers').value;
	var wpl = document.getElementById('wpl').value;
	var linewidth = document.getElementById('linewidth').value;
	var spread = document.getElementById('spread').value;

	var colormode = Number($("input[name=colormode]:checked").val());
	var scalemode = Number($("input[name=scalemode]:checked").val());
	var diremode = Number($("input[name=diremode]:checked").val());

	var minstep = document.getElementById('minstep').value;
	var maxstep = document.getElementById('maxstep').value;

	var bgcol = 0;
	var nxtdir = rand(0,7);

	ctx.fillStyle = "rgb(" + bgcol + "," + bgcol + "," + bgcol + ")";
	ctx.fillRect(0, 0, res, res);

	for(l=0;l<layers;l++){
		for(i=0;i<wpl;i++){
			curx = res/2+rand(-spread,spread);
			cury = res/2+rand(-spread,spread);

			ctx.beginPath();
			ctx.lineJoin="round";
			ctx.lineCap="round";
			ctx.moveTo(curx,cury);

			while(((curx>=0)&&(curx<=res)) && ((cury>=0)&&(cury<=res))){
				step = rand(minstep,maxstep);

				switch (diremode) {
					case 0: direction(rand(0,7),step); break;
					case 1: direction(rand(0,3),step); break;
					case 2: direction(rand(4,7),step); break;
					case 3: conical(nxtdir,step); break;
				}

				if(diremode == 3){
					nxtdir = nxtdir + rand(-1,1);
					if(nxtdir < 0){
						nxtdir = 7;
					}
					else if(nxtdir > 7){
						nxtdir = 0;
					}
				}

				ctx.lineTo(nxtx,nxty);
				curx = nxtx; cury = nxty;
			}

			switch (colormode) {
				case 0: co = Math.ceil(((254/layers)*l)+1); break;
				case 1: co = 255-Math.floor(((255/layers)*l)); break;
				case 2: co = Math.ceil((254/Math.sqrt(layers))*Math.sqrt(l))+1; break;
				case 3: co = 255-(Math.ceil((254/Math.sqrt(layers))*Math.sqrt(l))); break;
				case 4: co = rand(1,255); break;
			}

			switch (scalemode) {
				case 0: lw = linewidth-Math.floor(((linewidth/layers)*l)); break;
				case 1: lw = Math.ceil(((linewidth/layers)*l)+1); break;
				case 2: lw = linewidth-(Math.ceil(((linewidth-1)/Math.sqrt(layers))*Math.sqrt(l))); break;
				case 3: lw = Math.ceil(((linewidth-1)/Math.sqrt(layers))*Math.sqrt(l))+1; break;
				case 4: lw = rand(1,linewidth); break;
			}

			ctx.strokeStyle='rgb('+co+','+co+','+co+')';
			ctx.lineWidth=lw;
			ctx.stroke();
			ctx.closePath();
		}
	}

  ctx.globalCompositeOperation = "normal";
  var sourceCanvas = document.getElementById("dis");
  ctx.drawImage(sourceCanvas, 0, 0);
}

function direction(i,step){
	switch (i) {
		case 0: nxtx = curx; nxty = cury+step; break; //Up
		case 1: nxtx = curx+step; nxty = cury; break; //Right
		case 2: nxtx = curx; nxty = cury-step; break; //Down
		case 3: nxtx = curx-step; nxty = cury; break; //Left
		case 4: nxtx = curx+(step*0.715); nxty = cury+(step*0.715); break; //Up Right
		case 5: nxtx = curx+(step*0.715); nxty = cury-(step*0.715); break; //Right Down
		case 6: nxtx = curx-(step*0.715); nxty = cury-(step*0.715); break; //Left Down
		case 7:	nxtx = curx-(step*0.715); nxty = cury+(step*0.715); break; //Left Up
	}
}

function conical(i,step){
	switch (i) {
		case 0: nxtx = curx; nxty = cury+step; break; //Up
		case 1: nxtx = curx+(step*0.715); nxty = cury+(step*0.715); break; //Up Right
		case 2: nxtx = curx+step; nxty = cury; break; //Right
		case 3: nxtx = curx+(step*0.715); nxty = cury-(step*0.715); break; //Right Down
		case 4: nxtx = curx; nxty = cury-step; break; //Down
		case 5: nxtx = curx-(step*0.715); nxty = cury-(step*0.715); break; //Left Down
		case 6: nxtx = curx-step; nxty = cury; break; //Left
		case 7:	nxtx = curx-(step*0.715); nxty = cury+(step*0.715); break; //Left Up
	}
}
