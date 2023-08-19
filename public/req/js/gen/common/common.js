// Refresh map
function refresh(){
	undoctx.drawImage(canvas,0,0);
	$("#canover").addClass("visible");
	setTimestamp();
	setTimeout(function(){
		ctx.clearRect(-res*2, -res*2, res*4, res*4);
		$.when(uncolor()).then(generateMap()).then(function(){
	    $("#canover").removeClass("visible");
			$(".actionbox a").removeClass("disabled");

			if($("canvas#dis").attr("generated") == "nope"){
				$("canvas#dis").attr("generated","yup");
				$(".actionbox a.undo").addClass("disabled");
			}
	  });
	}, 20);
}

// Undo
function undoMap(){
	setTimestamp();
	uncolor();
	ctx.clearRect(-res*2, -res*2, res*4, res*4);
	ctx.drawImage(undoCanvas, -cord, -cord);
}

// Invert map
function invertMap(){
	setTimestamp();
	uncolor();
	ctx.globalCompositeOperation="difference";

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(-cord, -cord, res, res);

	ctx.globalCompositeOperation="source-over";
}

// View controls

function showHeight(y){
	switch (y) {
		case 0: $("#dis").addClass("hidden");break;
		case 1: $("#dis").removeClass("hidden");break;
	}
}


// Save height
function saveHeight(savename){
	savename += timestamp;
	if(seamlsmode == "1"){
		savename += "-Seamless";
	}
	savename += ".png";

	canvas.toBlob(function(blob) {
		saveAs(blob, savename);
	});
}

// Save Normal
function saveNormal(savename,depth){

	var normalCanvas = document.createElement('canvas');
	normalCanvas.width = res;
	normalCanvas.height = res;
	var ctxnorm = normalCanvas.getContext('2d');

	var source = ctx.getImageData( 0, 0, res, res );
	var destination = ctx.createImageData( res, res );

	for(var i=0, l=res*res*4; i<l; i+=4){

		var x1, x2, y1, y2;

		if(i%(res*4) == 0){
			x1 = source.data[i];
			x2 = source.data[i+4];
		}

		else if(i%(res*4) == (res-1)*4){
			x1 = source.data[i-4];
			x2 = source.data[i];
		}

		else{
			x1 = source.data[i-4];
			x2 = source.data[i+4];
		}



		if(i<res*4){
			y1 = source.data[i];
			y2 = source.data[i+res*4];
		}

		else if(i>res*(res-1)*4){
			y1 = source.data[i-res*4];
			y2 = source.data[i];
		}

		else{
			y1 = source.data[i-res*4];
			y2 = source.data[i+res*4];
		}

		destination.data[i] = (x1-x2)+127;
		destination.data[i+1] = (y1-y2)+127;
		destination.data[i+2] = 255;
		destination.data[i+3] = 255;

	}

	ctxnorm.putImageData( destination, 0, 0 );

	savename += timestamp;
	if(seamlsmode == "1"){
		savename += "-Seamless";
	}
	savename += "-Normal";
	savename += ".png";

	normalCanvas.toBlob(function(blob) {
		saveAs(blob, savename);
	});
}

// Calculate date

function setTimestamp(){
	if(cfg.General.timestampFormat == 0){
		timestamp = Math.floor(Date.now() / 1000);
	}
	if(cfg.General.timestampFormat == 1){
		timestamp = realDate();
	}
	else{
		timestamp = compactDate();
	}
}

function realDate(){
  var date = new Date();
  var str = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + ('0' + date.getHours()).slice(-2)+ '-' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2);
  return str;
}

function compactDate(){
  var date = new Date();
  var str = date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
  return str;
}
