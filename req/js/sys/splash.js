var splashfiles = [
  // ["01",'Philip L&uuml;ck'],
  // ['02','Damon Milstead'],
  // ['03','Mario Tran Phuc'],
  // ['04','Stu Ballinger'],
  // ['05','Dortus aka MM'],
  // ['06','Grigori Shevtsov'],
  // ['07','Grigori Shevtsov'],
  // ['08','Stu Ballinger'],
  // ['09','Alex Ness'],
  ['10','Grigori Shevtsov'],
  ['11','Matnes_Design'],
  ['12','Grigori Shevtsov'],
  ['13','Ross A. Morris']
];

var rng = rand(0,splashfiles.length-1);

$( document ).ready(function() {
  if(cfg.General.skipSplashScreen == true){
  }
  else{
    $( "div#splash" ).removeClass( "skip" );
    setTimeout(function(){
      $( "div#splash" ).removeClass( "visible" );
    }, 1500);
  }
  $("#splashartist").append(splashfiles[rng][1]);
  $("div#splash").css("background-image","url('req/img/splash/" + splashfiles[rng][0] + ".jpg')");

});
