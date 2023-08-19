var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var res = 8192;
var cord = 0;
var co;
var heck;
var funkArray = [];
var pattArray = [];

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

function changeArray(){
  if(heck == 1){
    document.getElementById('drawBox').checked = true;
    document.getElementById('drawSquare').checked = true;
    document.getElementById('drawCircle').checked = true;
    document.getElementById('drawRing').checked = true;
    document.getElementById('drawDiamond').checked = true;
    document.getElementById('drawDiamondOut').checked = true;
    funkArray = [
      drawBox,
      drawSquare,
      drawCircle,
      drawRing,
      drawDiamond,
      drawDiamondOut
    ];
  }

  else{
    funkArray = [];

    if(document.getElementById('drawBox').checked){ funkArray.push(drawBox) }
    if(document.getElementById('drawSquare').checked){ funkArray.push(drawSquare) }
    if(document.getElementById('drawCircle').checked){ funkArray.push(drawCircle) }
    if(document.getElementById('drawRing').checked){ funkArray.push(drawRing) }
    if(document.getElementById('drawDiamond').checked){ funkArray.push(drawDiamond) }
    if(document.getElementById('drawDiamondOut').checked){ funkArray.push(drawDiamondOut) }

    if(funkArray.length == 0){
      document.getElementById('drawBox').checked = true;
      funkArray.push(drawBox);
    }
  }
}

function changePattArray(){
	if(heck == 1){
		document.getElementById('xLine').checked = true;
		document.getElementById('yLine').checked = true;
		document.getElementById('xyAdd').checked = true;
		document.getElementById('yxAdd').checked = true;
		document.getElementById('xySub').checked = true;
		document.getElementById('yxSub').checked = true;
		document.getElementById('xyGrid').checked = true;

		pattArray = [
				xLine,
				yLine,
				xyAdd,
				yxAdd,
				xySub,
				yxSub,
				xyGrid
		];
	}
	else{
		pattArray = [];
	  if(document.getElementById('xLine').checked){ pattArray.push(xLine) }
	  if(document.getElementById('yLine').checked){ pattArray.push(yLine) }
	  if(document.getElementById('xyAdd').checked){ pattArray.push(xyAdd) }
	  if(document.getElementById('yxAdd').checked){ pattArray.push(yxAdd) }
	  if(document.getElementById('xySub').checked){ pattArray.push(xySub) }
	  if(document.getElementById('yxSub').checked){ pattArray.push(yxSub) }
	  if(document.getElementById('xyGrid').checked){ pattArray.push(xyGrid) }
	}
}

function generateMap(){
  heck = $('.heck:checked').val();

  var scale = (32*(document.getElementById('scale').value))/10;
	var minlight = (document.getElementById('minlight').value);
	var ratio = (document.getElementById('ratio').value)*10;
  var patmax = (document.getElementById('patmax').value);

  changeArray();
	changePattArray();

	ctx.globalCompositeOperation = "normal";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, res, res);
	ctx.globalCompositeOperation = "lighten";

	for(y = 0-scale; y < res; y+=scale){
		for(x = 0-scale; x < res; x+=scale){
			if(ratio >= rand(1,1000)){
				var co = rand(minlight,255);
				var temp = rand(0,funkArray.length-1);

				if(pattArray != 0){
					var patterning = rand(1,5);
				}
				else{
					var patterning = 10;
				}

				if(patterning == 1){
					var xbak = x;
					var ybak = y;
					var patu = rand(0,pattArray.length-1);

					pattArray[patu](co,x,y,scale,temp,xbak,ybak,patmax);

					x = xbak;
					y = ybak;
				}
				else{
					funkArray[temp](co,x,y,scale,heck);
				}
			}
		}
	}
  ctx.globalCompositeOperation = "normal";
  var sourceCanvas = document.getElementById("dis");
  ctx.drawImage(sourceCanvas, 0, 0);
}

/* Drawable objects */

function drawCircle(co,x,y,scale,heck){
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
  if(heck != 1){ ctx.beginPath(); }
	ctx.arc(x+scale/2,y+scale/2,scale/4,0,2*Math.PI);
	if(heck != 1){ ctx.closePath(); }
	ctx.fill();
}

function drawRing(co,x,y,scale,heck){
	ctx.strokeStyle = "rgb(" + co + "," + co + "," + co + ")";
	if(heck != 1){ ctx.beginPath(); }
	ctx.arc(x+scale/2,y+scale/2,scale/4,0,2*Math.PI);
	ctx.lineWidth=scale/rand(16,32);
	if(heck != 1){ ctx.closePath(); }
	ctx.stroke();
}

function drawBox(co,x,y,scale){
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
	ctx.fillRect(x+scale/4,y+scale/4,scale/2,scale/2);
}

function drawSquare(co,x,y,scale){
	ctx.strokeStyle = "rgb(" + co + "," + co + "," + co + ")";
	ctx.lineWidth=scale/rand(16,32);
	ctx.strokeRect(x+scale/4,y+scale/4,scale/2,scale/2);
}

function drawDiamond(co,x,y,scale,heck){
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
	if(heck != 1){ ctx.beginPath(); }
	ctx.moveTo(x+scale/2,y+scale/8);
	ctx.lineTo(x+scale/8,y+scale/2);
	ctx.lineTo(x+scale/2,y+scale-scale/8);
	ctx.lineTo(x+scale-scale/8,y+scale/2);
	if(heck != 1){ ctx.closePath(); }
	ctx.fill();
}

function drawDiamondOut(co,x,y,scale,heck){
	ctx.strokeStyle = "rgb(" + co + "," + co + "," + co + ")";
	ctx.lineWidth=scale/rand(16,32);
	if(heck != 1){ ctx.beginPath(); }
	ctx.moveTo(x+scale/2,y+scale/8);
	ctx.lineTo(x+scale/8,y+scale/2);
	ctx.lineTo(x+scale/2,y+scale-scale/8);
	ctx.lineTo(x+scale-scale/8,y+scale/2);
	if(heck != 1){ ctx.closePath(); }
	ctx.stroke();
}

/* Patten styles */

function xLine(co,x,y,scale,temp,xbak,ybak,patmax){
	for(i=0;i < rand(1,patmax);i++){
		funkArray[temp](co,x,y,scale);
		x = x+scale*2;
	}
}

function yLine(co,x,y,scale,temp,xbak,ybak,patmax){
	for(i=0;i < rand(1,patmax);i++){
		funkArray[temp](co,x,y,scale);
		y = y+scale*2;
	}
}

function xyAdd(co,x,y,scale,temp,xbak,ybak,patmax){
	for(xi=0;xi < rand(1,patmax);xi++){
		for(yi=0;yi < rand(1,patmax);yi++){
			funkArray[temp](co,x,y,scale);
			y = y+scale*2;
		}
		y = ybak;
		x = x+scale*2;
	}
	x = xbak;
}

function yxAdd(co,x,y,scale,temp,xbak,ybak,patmax){
	for(yi=0;yi < rand(1,patmax);yi++){
		for(xi=0;xi < rand(1,patmax);xi++){
			funkArray[temp](co,x,y,scale);
			x = x+scale*2;
		}
		x = xbak;
		y = y+scale*2;
	}
	y = ybak;
}

function xySub(co,x,y,scale,temp,xbak,ybak,patmax){
	for(xi=0;xi < rand(1,patmax);xi++){
		for(yi=0;yi < rand(1,patmax);yi++){
			funkArray[temp](co,x,y,scale);
			y = y-scale*2;
		}
		y = ybak;
		x = x-scale*2;
	}
	x = xbak;
}

function yxSub(co,x,y,scale,temp,xbak,ybak,patmax){
	for(yi=0;yi < rand(1,patmax);yi++){
		for(xi=0;xi < rand(1,patmax);xi++){
			funkArray[temp](co,x,y,scale);
			x = x-scale*2;
		}
		x = xbak;
		y = y-scale*2;
	}
	y = ybak;
}

function xyGrid(co,x,y,scale,temp,xbak,ybak,patmax){
	var tasa = rand(1,patmax);
	for(yi=0;yi < tasa;yi++){
		for(xi=0;xi < tasa;xi++){
			funkArray[temp](co,x,y,scale);
			x = x+scale*2;
		}
		x = xbak;
		y = y+scale*2;
	}
	y = ybak;
}
