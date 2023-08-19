var canvas = document.getElementById("dis");
var ctx = canvas.getContext("2d");
var pupu = document.getElementById("imgs");

var parts = [
  [
    "000",
    "001",
    "002"
  ],
  [
    "A-000",
    "B-000",
    "C-000",
    "D-000",
    "E-000",
    "F-000"
  ]
];


var res = 8192;
var cord = 0;
var gridsize = document.getElementById('gridsize').value;

ultraSet();

var undoCanvas = document.createElement('canvas');
undoCanvas.width = res;
undoCanvas.height = res;
var undoctx = undoCanvas.getContext('2d');

var dcan = document.createElement('canvas');
dcan.width = res/gridsize; dcan.height = res/gridsize;
var dtx = dcan.getContext('2d');
dtx.translate(dcan.width/2,dcan.height/2)

function generateMap(){
  gridsize = document.getElementById('gridsize').value;
  ctx.globalCompositeOperation = "normal";
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, res, res);
  base = 0;

  for(yi=0;yi<gridsize;yi++){
    for(xi=0;xi<gridsize;xi++){
      var img = document.getElementById("base-"+parts[0][rand(0,parts[0].length-1)]);
      dtx.fillRect(dcan.width/-2, dcan.height/-2, dcan.width, dcan.height);
      dtx.drawImage(img,dcan.width/-2,dcan.height/-2,dcan.width,dcan.height);

      if(rand(1,1000) >= 150){
        var img = document.getElementById("addon-"+parts[1][rand(0,parts[1].length-1)]);
        dtx.drawImage(img,dcan.width/-2,dcan.height/-2,dcan.width,dcan.height);
      }

      var roota = rand(0,3)*90; // 0, 90, 180, 270
			if(roota != 0){dtx.rotate(roota*Math.PI/180);}

      ctx.drawImage(dcan,xi*(res/gridsize),yi*(res/gridsize),res/gridsize,res/gridsize);
    }
  }

  ctx.globalCompositeOperation = "normal";
	var sourceCanvas = document.getElementById("dis");
	ctx.drawImage(sourceCanvas, 0, 0);
}

function ultraSet(){
	$("#imgs").empty();

	path = __dirname + "/JSUdata/bases/";
	for (i = 0; i < parts[0].length; i++){
		pupu.innerHTML = pupu.innerHTML + "<img src=\"" + path + parts[0][i] + ".png\" id=\"base-" + parts[0][i] + "\" />";
	}
	path = __dirname + "/JSUdata/addons/";
	for (i = 0; i < parts[1].length; i++){
		pupu.innerHTML = pupu.innerHTML + "<img src=\"" + path + parts[1][i] + ".png\" id=\"addon-" + parts[1][i] + "\" />";
	}

}
