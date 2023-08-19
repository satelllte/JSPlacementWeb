var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var res = 8192;
var cord = 0;

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

var boxclampmin, boxclampmax, boxscale; //BOX
var boxAclampmin, boxAclampmax, boxAclampAmin, boxAclampAmax, boxAscale; //BOX-A
var gridclampmin, gridclampmax, gridscale, gridspacing, gridamount; //GRID
var batVclampmin, batVclampmax, batVscale, batVspacing, batVamount; //BAT-V
var batHclampmin, batHclampmax, batHscale, batHspacing, batHamount; //BAT-H
var lineclampmin, lineclampmax, linethick; //BOX

var funkArray = [];
var specialArray = [];

function changeArray(){
  funkArray = [];
  specialArray = [];

  if($('#draw\\.Box:checked').val()){ funkArray.push(drawBox) }
  if($('#draw\\.BoxA:checked').val()){ funkArray.push(drawBoxA) }
  if(($('#draw\\.Grid:checked').val())||($('#draw\\.BatV:checked').val())||($('#draw\\.BatH:checked').val())||($('#draw\\.Lines:checked').val())){
    funkArray.push(drawSpecial);
  }

  if($('#draw\\.Grid:checked').val()){ specialArray.push(drawGrid) }
  if($('#draw\\.BatV:checked').val()){ specialArray.push(drawBatV) }
  if($('#draw\\.BatH:checked').val()){ specialArray.push(drawBatH) }
  if($('#draw\\.Lines:checked').val()){ specialArray.push(drawLines) }

  if(funkArray.length == 0){
    $('#draw\\.Box').prop('checked',1);
    funkArray.push(drawBox);
  }
}

function readSliders(){
  // BOX
  boxclampmin = $('#Box\\.clampmin').val();
  boxclampmax = $('#Box\\.clampmax').val();
  boxscale = $('#Box\\.scale').val();

  // BOX Alpha
  boxAclampmin = $('#BoxA\\.clampmin').val();
  boxAclampmax = $('#BoxA\\.clampmax').val();
  boxAclampAmin = $('#BoxA\\.clampAmin').val();
  boxAclampAmax = $('#BoxA\\.clampAmax').val();
  boxAscale = $('#BoxA\\.scale').val();

  // Grid
  gridclampmin = $('#Grid\\.clampmin').val();
  gridclampmax = $('#Grid\\.clampmax').val();
  gridscale = $('#Grid\\.scale').val();
  gridspacing = $('#Grid\\.spacing').val();
  gridamount = $('#Grid\\.amount').val();

  // Bat Vertical
  batVclampmin = $('#BatV\\.clampmin').val();
  batVclampmax = $('#BatV\\.clampmax').val();
  batVscale = $('#BatV\\.scale').val();
  batVspacing = $('#BatV\\.spacing').val();
  batVamount = $('#BatV\\.amount').val();

    // Bat Horizontal
  batHclampmin = $('#BatH\\.clampmin').val();
  batHclampmax = $('#BatH\\.clampmax').val();
  batHscale = $('#BatH\\.scale').val();
  batHspacing = $('#BatH\\.spacing').val();
  batHamount = $('#BatH\\.amount').val();

  // LINES
  lineclampmin = $('#Lines\\.clampmin').val();
  lineclampmax = $('#Lines\\.clampmax').val();
  linethick = $('#Lines\\.thick').val();
}

function randomizeAll(){
  // Main
  var setme = rand(10,2000); $('#slideiterations').val(setme); $('#iterations').val(setme);
  var setme = rand(0,255); $('#slidebgcol').val(setme); $('#bgcol').val(setme);

  var setme = rand(0,4); if(setme == 0){ $('#draw\\.Box').prop('checked',false) }else{ $('#draw\\.Box').prop('checked',true) }
  var setme = rand(0,4); if(setme == 0){ $('#draw\\.BoxA').prop('checked',false) }else{ $('#draw\\.BoxA').prop('checked',true) }
  var setme = rand(0,4); if(setme == 0){ $('#draw\\.Grid').prop('checked',false) }else{ $('#draw\\.Grid').prop('checked',true) }
  var setme = rand(0,4); if(setme == 0){ $('#draw\\.BatV').prop('checked',false) }else{ $('#draw\\.BatV').prop('checked',true) }
  var setme = rand(0,4); if(setme == 0){ $('#draw\\.BatH').prop('checked',false) }else{ $('#draw\\.BatH').prop('checked',true) }
  var setme = rand(0,4); if(setme == 0){ $('#draw\\.Lines').prop('checked',false) }else{ $('#draw\\.Lines').prop('checked',true) }


  //DrawBox
  var setme = rand(0,255); $('#slideBox\\.clampmin').val(setme); $('#Box\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideBox\\.clampmax').val(setme); $('#Box\\.clampmax').val(setme);
  var setme = rand(50,255); $('#slideBox\\.scale').val(setme); $('#Box\\.scale').val(setme);

  //DrawBoxA
  var setme = rand(0,255); $('#slideBoxA\\.clampmin').val(setme); $('#BoxA\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideBoxA\\.clampmax').val(setme); $('#BoxA\\.clampmax').val(setme);
  var setme = rand(0,100); $('#slideBoxA\\.clampAmin').val(setme); $('#BoxA\\.clampAmin').val(setme);
  var setme = rand(0,100); $('#slideBoxA\\.clampAmax').val(setme); $('#BoxA\\.clampAmax').val(setme);
  var setme = rand(50,200); $('#slideBoxA\\.scale').val(setme); $('#BoxA\\.scale').val(setme);

  //DrawGrid
  var setme = rand(0,255); $('#slideGrid\\.clampmin').val(setme); $('#Grid\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideGrid\\.clampmax').val(setme); $('#Grid\\.clampmax').val(setme);
  var setme = rand(50,200); $('#slideGrid\\.scale').val(setme); $('#Grid\\.scale').val(setme);
  var setme = rand(10,990); $('#slideGrid\\.spacing').val(setme);$('#Grid\\.spacing').val(setme);
  var setme = rand(2,10); $('#slideGrid\\.amount').val(setme); $('#Grid\\.amount').val(setme);

  //DrawbatV
  var setme = rand(0,255); $('#slideBatV\\.clampmin').val(setme); $('#BatV\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideBatV\\.clampmax').val(setme); $('#BatV\\.clampmax').val(setme);
  var setme = rand(50,200); $('#slideBatV\\.scale').val(setme); $('#BatV\\.scale').val(setme);
  var setme = rand(10,990); $('#slideBatV\\.spacing').val(setme);$('#BatV\\.spacing').val(setme);
  var setme = rand(2,10); $('#slideBatV\\.amount').val(setme); $('#BatV\\.amount').val(setme);

  //DrawbatH
  var setme = rand(0,255); $('#slideBatH\\.clampmin').val(setme); $('#BatH\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideBatH\\.clampmax').val(setme); $('#BatH\\.clampmax').val(setme);
  var setme = rand(50,200); $('#slideBatH\\.scale').val(setme); $('#BatH\\.scale').val(setme);
  var setme = rand(10,990); $('#slideBatH\\.spacing').val(setme);$('#BatH\\.spacing').val(setme);
  var setme = rand(2,10); $('#slideBatH\\.amount').val(setme); $('#BatH\\.amount').val(setme);

  //drawLines
  var setme = rand(0,255); $('#slideLines\\.clampmin').val(setme); $('#Lines\\.clampmin').val(setme);
  var setme = rand(0,255); $('#slideLines\\.clampmax').val(setme); $('#Lines\\.clampmax').val(setme);
  var setme = rand(1,50); $('#slideLines\\.thick').val(setme); $('#Lines\\.thick').val(setme);

  refresh();
}

function generateMap(){
  readSliders();
	changeArray();

  var iters = $('#iterations').val();
  var bgcol = $('#bgcol').val();

	ctx.fillStyle = "rgb(" + bgcol + "," + bgcol + "," + bgcol + ")";
	ctx.fillRect(0, 0, res, res);

	for(i = 0; i < iters; i++){
		temp = rand(0,funkArray.length-1);
		funkArray[temp](res);
	}

	var sourceCanvas = document.getElementById("dis");
	ctx.drawImage(sourceCanvas, 0, 0);

}

function drawBox(res){
	var co = rand(boxclampmin,boxclampmax);
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
	ctx.fillRect(rand((0-(res/16)),res), rand((0-(res/16)),res), rand((res/16),(res/8))*(boxscale/100), rand((res/16),(res/8)))*(boxscale/100);
}

function drawBoxA(res){
	var co = rand(boxAclampmin,boxAclampmax);
	ctx.fillStyle = "rgba(" + co + "," + co + "," + co + "," + (rand(boxAclampAmin,boxAclampAmax)/100) + ")";
	ctx.fillRect(rand((0-(res/16)),res), rand((0-(res/16)),res), rand((res/24),(res/8))*(boxAscale/100), rand((res/24),(res/8)))*(boxAscale/100);
}

function drawSpecial(res){
	temp = rand(0,specialArray.length-1);
	specialArray[temp](res);
}

function drawGrid(res){
	var co = rand(gridclampmin,gridclampmax);
	var gridx = rand(2,gridamount);
	var gridy = rand(2,gridamount);
	var gap = (rand((res/256),(res/96))*(rand(30,100)/100))*(gridscale/100);
	var posx = rand((0-(res/16)),res);
	var posxbak = posx;
	var posy = rand((0-(res/16)),res);
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
	for(y = 0; y < gridy; y++){
		for(x = 0; x < gridx; x++){
			ctx.fillRect(posx, posy, gap, gap);
			var posx = posx + (gap*(gridspacing/100)) + gap;
		}
		var posy = posy + (gap*(gridspacing/100)) + gap;
		var posx = posxbak;
	}
}

function drawBatV(res){
  var co = rand(batVclampmin,batVclampmax);
  var posx = rand((0-(res/16)),res);
  var posy = rand((0-(res/16)),res);
  var gap = (rand((res/256),(res/96))*(rand(30,100)/100))*(batVscale/100);
  var exp = rand(5,20);
  var gridx = rand(2,batVamount);
  ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
  for(x = 0; x < gridx; x++){
    ctx.fillRect(posx, posy, gap, (gap*exp));
    var posx = posx + (gap*(batVspacing/100)) + gap;
  }
}

function drawBatH(res){
	var co = rand(batHclampmin,batHclampmax);
	var posx = rand((0-(res/16)),res);
	var posy = rand((0-(res/16)),res);
	var gap = (rand((res/256),(res/96))*(rand(30,100)/100))*(batHscale/100);
	var exp = rand(5,20);
	var gridy = rand(2,batHamount);
	ctx.fillStyle = "rgb(" + co + "," + co + "," + co + ")";
	for(y = 0; y < gridy; y++){
		ctx.fillRect(posx, posy, (gap*exp), gap);
		var posy = posy + (gap*(batHspacing/100)) + gap;
	}
}

function drawLines(res){
	var co = rand(lineclampmin,lineclampmax);
	var posx = rand((0-(res/16)),res);
	var posy = rand((0-(res/16)),res);
	var gap = (rand((res/256),(res/96))*(rand(30,100)/100));
	var exp = rand(5,20);
	var gridx = rand(2,5);
	var lines = rand(1,15);

	if(posx >= posy){
		ctx.beginPath();
		ctx.moveTo(posx,posy);
		ctx.lineTo(res,posy);

		for(x = 0; x < gridx; x++){
			ctx.moveTo(posx,posy);
			var coin = rand(1,2);
			if(coin == "1"){
				ctx.lineTo(posx,0);
			}
			else{
				ctx.lineTo(posx,res);
			}

			posx += 50*lines;

		}

		ctx.lineWidth=linethick;
		ctx.strokeStyle="rgb(" + co + "," + co + "," + co + ")";
		ctx.stroke();
	}

	else{
		ctx.beginPath();
		ctx.moveTo(posx,posy);
		ctx.lineTo(0, posy);
		for(x = 0; x < gridx; x++){
			ctx.moveTo(posx,posy);
			var coin = rand(1,2);
			if(coin == "1"){
				ctx.lineTo(0,posy);
			}
			else{
				ctx.lineTo(res,posy);
			}

			posy += 50*lines;
		}
		ctx.lineWidth=linethick;
		ctx.strokeStyle="rgb(" + co + "," + co + "," + co + ")";
		ctx.stroke();
	}
}
