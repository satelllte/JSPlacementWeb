var presets = require("./req/js/gen/js-classic/presets.json");

/* Check for user presets file */
if (!fs.existsSync(homepath + "/userpresets.json")){
  fs.copySync(__dirname + '/req/js/gen/js-classic/userpresets.json', homepath+'/userpresets.json');
}

var userpresets = require(homepath + "/userpresets.json");

presets = presets.concat(userpresets);

// List presets

for (var i=0;i<presets.length;i++){
  var towrite = '<a href="#" onclick="Preset('+i+')">' + presets[i].name + '</a>';
  $(towrite).appendTo( "#presetlist" );
}

var objects = [
  "iterations", "bgcol",
  "draw.Box", "draw.BoxA", "draw.Grid", "draw.BatV", "draw.BatH", "draw.Lines",
  "Box.clampmin", "Box.clampmax", "Box.scale",
  "BoxA.clampmin", "BoxA.clampmax", "BoxA.clampAmin", "BoxA.clampAmax", "BoxA.scale",
  "Grid.clampmin", "Grid.clampmax", "Grid.scale", "Grid.spacing", "Grid.amount",
  "BatV.clampmin", "BatV.clampmax", "BatV.scale", "BatV.spacing", "BatV.amount",
  "BatH.clampmin", "BatH.clampmax", "BatH.scale", "BatH.spacing", "BatH.amount",
  "Lines.clampmin", "Lines.clampmax", "Lines.thick"
];

function Preset(x){
  for (var i=0;i<objects.length;i++){
    var key = objects[i].split(".");
    var id = objects[i].replace(".","\\.");
    if(key[1] == null){
      $('#slide'+id).val(presets[x][key]);
      $('#'+id).val(presets[x][key]);
    }
    else if(key[0] == "draw"){
      $('#'+id).prop('checked',presets[x]['draw'][key[1]]);
    }
    else{
      $('#slide'+id).val(presets[x][key[0]][key[1]]);
      $('#'+id).val(presets[x][key[0]][key[1]]);
    }
  }
  refresh();
}

function ShowPresets(){
  $('#presetlist').removeClass('hidden');
  $('#ShowPresets').addClass('active');
}

function HidePresets(){
  $('#presetlist').addClass('hidden');
  $('#ShowPresets').removeClass('active');
}
