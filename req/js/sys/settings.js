$(function() {
  $('input[name="timestampFormat"][value="'+cfg.General.timestampFormat+'"]').prop('checked',true);
  $('input[name="skin"][value="'+cfg.General.skin+'"]').prop('checked',true);
  $('#skipSplashScreen').prop('checked',cfg.General.skipSplashScreen);
  $('#disableUpdateCheck').prop('checked',cfg.General.disableUpdateCheck);
  $('#disableAnimations').prop('checked',cfg.General.disableAnimations);
  timeMode();
});

function saveNewSetting(id){
  switch (id){
    case "timestampFormat": cfg.General.timestampFormat = $('input[name="'+id+'"]:checked').val(); break;
    case "skipSplashScreen": cfg.General.skipSplashScreen = $('#'+id).prop('checked'); break;
    case "disableUpdateCheck": cfg.General.disableUpdateCheck = $('#'+id).prop('checked'); break;
    case "disableAnimations": cfg.General.disableAnimations = $('#'+id).prop('checked'); break;
    case "skin": cfg.General.skin = $('input[name="'+id+'"]:checked').val(); break;
  }

  fs.writeFileSync(homepath + "/jsplacement.conf", ini.stringify(cfg));
  cfg = ini.parse(fs.readFileSync(homepath + "/jsplacement.conf", 'utf-8'));
}

$('input[name="timestampFormat"]').change(function(){
  timeMode();
});

$('input[name="skin"]').change(function(){
  if(cfg.General.skin == 0){
    $('link[rel="stylesheet"]').attr('href','req/style.css');
  }
  if(cfg.General.skin == 1){
		$('link[rel="stylesheet"]').attr('href','req/style-pro.css');
  }
});

$('#disableUpdateCheck').change(function(){
  if(cfg.General.disableUpdateCheck == true){
    $('#vercheck').css('display','none');
  }
  else{
    verCheck();
  }
});

$('#disableAnimations').change(function(){
  if(cfg.General.disableAnimations == true){
    $('#disableanimation').html('<style>*{transition: all 0ms linear !important;}</style>');
  }
  else{
    $('#disableanimation').html('');
  }
})


function timeMode(){
  switch (cfg.General.timestampFormat) {
    case "0":
      var str = Math.floor(Date.now() / 1000);
      $('#showtime').html("Files will be saved as: <b>JS-Something-" + str + ".png</b>");
    break;

    case "1":
      var date = new Date();
      var str = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + ('0' + date.getHours()).slice(-2) + '-' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2);
      $('#showtime').html("Files will be saved as: <b>JS-Something-" + str + ".png</b>");
    break;

    case "2":
      var date = new Date();
      var str = date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
      $('#showtime').html("Files will be saved as: <b>JS-Something-" + str + ".png</b>");
    break;
  }
}
