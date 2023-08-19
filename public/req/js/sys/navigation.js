// Toggle side menu visibility
function toggleMenu(){
  $( "div#sidemenu" ).toggleClass( "visible" );
  $( "svg.menubutton" ).toggleClass( "visible" );
}

function hideMenu(){
  $( "div#sidemenu" ).removeClass( "visible" );
  $( "svg.menubutton" ).removeClass( "visible" );
}

function unload(){
  $( "div#container" ).toggleClass( "hiding" );
  setTimeout(function(){
    $("#container").empty();
  }, 125);
}

function loadPage(page){
  setTimeout(function(){
    $("#container").load("pages/"+page);
  }, 250);
  setTimeout(function(){
    $( "div#container" ).toggleClass("hiding");
  }, 375);
  hideColorizer()
}

function goToPage(url) {
  // WEB_PORT override
  window.open(url);

  // var shell = require('electron').shell;
  // event.preventDefault();
  // shell.openExternal(url);
}

function guidePage(x){
  $("div#guide").empty();
  $("div#guide").load("guides/"+x+".html");
}

function closeGuide(){
  $( "div#guide" ).empty();
  $( "div#digiguide" ).toggleClass( "invisible" );
  $( "div#container" ).toggleClass( "blurd" );
}

function gitGuide(){
  $( "div#digiguide" ).toggleClass( "invisible" );
  $( "div#container" ).toggleClass( "blurd" );
  if($( "div#digiguide" ).hasClass( "invisible" ) == false){
    $( "#guide" ).load( "guides/" + guidepage + ".html" );
  }
}

// Toggle Colorizer Menu
function toggleColorizer(){
	$("#colorizer").toggleClass("hidden");
	$("a.colorize").toggleClass("active");
	$("#container").toggleClass("colorizer");
	$("#canover").toggleClass("colorizer");
	loadGrad();
}

function hideColorizer(){
	$("#colorizer").addClass("hidden");
	$("a.colorize").removeClass("active");
	$("#container").removeClass("colorizer");
	$("#canover").removeClass("colorizer");
}
