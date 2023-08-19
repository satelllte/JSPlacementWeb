function generateMap(){

	var bgcol = document.getElementById('bgcol').value;
	var iters = document.getElementById('iterations').value;
	var bgits = document.getElementById('bgits').value;

	seamlsmode = $('#seamlsmode:checked').val();
	var rotatemode = $('#rotatemode:checked').val();
	var mirrormode = $('#mirrormode:checked').val();
	var blendimode = $('#blendimode:checked').val();
	var alphamode = $('#alphamode:checked').val();

	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgb(" + bgcol + "," + bgcol + "," + bgcol + ")";
	ctx.fillRect(-cord, -cord, res, res);

	var minime = 125-document.getElementById('minsize').value;
	var maxime = minime*1.5;

	if(bgits != "0"){
		var bets = 1;
		for(i = 1; i <= bgits; i++){
			for(yi = -cord; yi <= cord; yi+=(res/bets)){
				for(xi = -cord; xi <= cord; xi+=(res/bets)){
					var rng = rand(0,files.length-1);
					var img = document.getElementById(files[rng]);
					ctx.drawImage(img,xi,yi,res/bets,res/bets);
				}
			}
			bets++;
		}
	}

	for(i = 0; i < iters; i++) {
		setTimeout(function() {
			if(seamlsmode == "1"){
				var scale = (res/rand(maxime,minime))*rand(10,25);
				var posx = rand(-res,res);
				var posy = rand(-res,res);
			}
			else{
				var scale = (res/rand(maxime,minime))*rand(10,25);
				var posx = rand(-cord-(cord/4),cord);
				var posy = rand(-cord-(cord/4),cord);
			}

			var rng = rand(0,files.length-1);
			var img = document.getElementById(files[rng]);

			if(rotatemode == "1"){
				var roota = rand(0,3)*90; // 0, 90, 180, 270
				if(roota != 0){ctx.rotate(roota*Math.PI/180);}
			}

			if(mirrormode == "1"){
				var flip = rand(0,1);
				if(flip == "0"){ ctx.scale(-1,1); }
			}

			var mood = rand(0,mode.length-1);

			if(blendimode == "1"){
				ctx.globalCompositeOperation = mode[mood];
			}

			ctx.drawImage(img,posx,posy,scale,scale);

			if(seamlsmode == "1"){
				if((posx+scale >= cord) && (posy+scale >= cord)){
					posx = posx-res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posy = posy-res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posx = posx+res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if((posx <= -cord) && (posy+scale >= cord)){
					posx = posx+res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posy = posy-res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posx = posx-res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if((posx+scale >= cord) && (posy <= -cord)){
					posx = posx-res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posy = posy+res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posx = posx+res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if((posx <= -cord) && (posy <= -cord)){
					posx = posx+res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posy = posy+res;
					ctx.drawImage(img,posx,posy,scale,scale);
					posx = posx-res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}


				else if(posx+scale >= cord){
					posx = posx-res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if(posx <= -cord){
					posx = posx+res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if(posy+scale >= cord){
					posy = posy-res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
				else if(posy <= -cord){
					posy = posy+res;
					ctx.drawImage(img,posx,posy,scale,scale);
				}
			}

			if(mirrormode == "1"){
				if(flip == "0"){ ctx.scale(-1,1); }
			}

			if(rotatemode == "1"){
				if(roota != 0){ctx.rotate(-roota*Math.PI/180);}
			}
		}, 20);
	}
	var sourceCanvas = document.getElementById("dis");
	ctx.drawImage(sourceCanvas, -cord, -cord);
}

$(document).ready(function() {
	$('input:radio[name=spriteset]').change(function() {
		if (this.value == 'spritea') {
			spriteSet("JS2Classic");
		}
		else if (this.value == 'spriteb') {
			spriteSet("CrapPack");
		}
		else if (this.value == 'spritec') {
			spriteSet("BigData");
		}
		else if (this.value == 'sprited') {
			spriteSet("Aggromaxx");
		}
		else if (this.value == 'spritecustom') {
			spriteSet("CustomSprites");
		}
	});
});

var mode = [
	"source-over",
	"source-over",
	"source-over",
	"darken",
	"lighten"
];

var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var pupu = document.getElementById("imgs");

var res = 8192;
var cord = res/2;

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

ctx.translate(cord,cord);

spriteSet("JS2Classic");

for (i = 0; i < files.length; i++){
	pupu.innerHTML = pupu.innerHTML + "<img src=\"" + path + "/" + files[i] + "\" id=\"" + files[i] + "\" />";
}

function spriteSet(dir){
	$("#imgs").empty();

	if(dir == "CustomSprites"){
		path = app.getPath('home') + "/JSplacement/CustomSprites";
	}
	else{
		path = __dirname + "/JS2sprites/" + dir + "";
	}

	var supported = ["svg","png"];

	files = fs.readdirSync(path);

	files = files.filter(function(file){
		for(i=0;i<supported.length;i++){
			if(file.indexOf(supported[i]) !== -1){
				return true;
			}
		}
	});

	for (i = 0; i < files.length; i++){
		pupu.innerHTML = pupu.innerHTML + "<img src=\"" + path + "/" + files[i] + "\" id=\"" + files[i] + "\" />";
	}

	koko = files.length-1;

}
