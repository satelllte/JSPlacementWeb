// Save color
function saveColor(savename){
	savename += timestamp;
	if(seamlsmode == "1"){
		savename += "-Seamless";
	}
	savename += "-Color";
	savename += ".png";

	colorCanvas.toBlob(function(blob) {
		saveAs(blob, savename);
	});
}

// Load custom gradients

var custoloaded;

function loadGrad(){
	if(custoloaded){
		return;
	}

	var gradlist = document.getElementById("gradients");
	var gpath = app.getPath('home') + "/JSplacement/CustomGradients";
	var supported = ["jpg","jpeg","png","gif","bmp"];

	gfiles = fs.readdirSync(gpath);

	gfiles = gfiles.filter(function(file){
		for(i=0;i<supported.length;i++){
			if(file.indexOf(supported[i]) !== -1){
				return true;
			}
		}
	});

	for (i = 0; i < gfiles.length; i++){
		gradlist.innerHTML = gradlist.innerHTML + "<img src=\"" + gpath + "/" + gfiles[i] + "\" id=\"" + gfiles[i] + "\" onclick=\"theColorizer($(this).attr('id'))\" />";
	}

	custoloaded = true;
}

// Colorizer
var colorCanvas = document.getElementById("dat");
var colorctx = colorCanvas.getContext("2d");

function theColorizer(gradifile){
	$("#canover").addClass("visible");
	setTimeout(function(){
		var paletteCanvas = document.createElement('canvas');
		paletteCanvas.width = 256; paletteCanvas.height = 1;
		var palettectx = paletteCanvas.getContext('2d');

		var paletteimg = document.getElementById(gradifile);
		palettectx.drawImage(paletteimg,0,0,256,1);

		var heightsource = ctx.getImageData(0,0,res,res);
		var palettesource = palettectx.getImageData(0,0,256,1);

		var destination = ctx.createImageData(res,res);

		var paletter = [], paletteg=[], paletteb=[];

		for(var i=0; i<=1023; i+=4){
			paletter.push(palettesource.data[i]);
			paletteg.push(palettesource.data[i+1]);
			paletteb.push(palettesource.data[i+2]);
		}

		for(var i=0, l=res*res*4; i<l; i+=4){
			destination.data[i] = paletter[heightsource.data[i]];
			destination.data[i+1] = paletteg[heightsource.data[i]];
			destination.data[i+2] = paletteb[heightsource.data[i]];
			destination.data[i+3] = 255;
		}

		colorctx.clearRect(-res*2, -res*2, res*4, res*4);
		colorctx.globalCompositeOperation="source-over";
		colorctx.putImageData(destination,0,0);

		// Overlay
		// var olay = document.getElementById("overlay001");
	  //
		// colorctx.globalCompositeOperation="overlay";
	  //
		// var olayx = 0; var olayy = 0;
		// for(var i=0; i<8; i++){
		// 	olayx = 0;
		// 	for(var j=0; j<8; j++){
		// 		colorctx.drawImage(olay,olayx,olayy,1024,1024);
		// 		olayx += 1024;
		// 	}
		// 	olayy += 1024;
		// }
		// colorctx.globalCompositeOperation="source-over";

		$("#dis").addClass("hidden");
		$(".viewcontrols").removeClass("disabled");
	},20);
	setTimeout(function(){
		$("#canover").removeClass("visible");
	},200);
}

// Uncolor

function uncolor(){
	$(".viewcontrols").addClass("disabled");
	$("#dis").removeClass("hidden");
	// $("#colorizer").addClass("hidden");
	// $("a.colorize").removeClass("active");
	// $("#container").removeClass("colorizer");
	// $("#canover").removeClass("colorizer");
	colorctx.clearRect(-res*2, -res*2, res*4, res*4);
}
