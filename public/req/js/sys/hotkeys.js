var MousePosX = 250;
var MousePosY = 250;

$(document).keyup(function(e) {
	if($( "div#firstrun" ).hasClass( "visible" )){}
	else if($( "div#digiguide" ).hasClass( "invisible" ) == false){
		if (e.which == 71){
			$( "div#digiguide" ).toggleClass( "invisible" );
			$( "div#container" ).toggleClass( "blurd" );
		}
		else if (e.which == 67) {
			var shell = require('electron').shell;
			var cusstom = app.getPath('home') + "/JSplacement/CustomSprites/";
			shell.showItemInFolder(cusstom);
		}
	}
	else{

		// Generators
		if ((e.which == 49)||(e.which == 97)) { hideMenu();unload();loadPage('gen/jsplacement.html'); }
		else if ((e.which == 50)||(e.which == 98)) { hideMenu();unload();loadPage('gen/jsplacement2.html'); }
		// else if ((e.which == 51)||(e.which == 99)) { hideMenu();unload();loadPage('gen/ultra.html'); }
		else if ((e.which == 51)||(e.which == 99)) { hideMenu();unload();loadPage('gen/velvet.html'); }
		// else if (e.which == 52) { hideMenu();unload();loadPage('gen/metropolis.html'); }
		else if ((e.which == 52)||(e.which == 100)) { hideMenu();unload();loadPage('gen/wyre.html'); }
		else if ((e.which == 53)||(e.which == 101)) { hideMenu();unload();loadPage('gen/dotgrid.html'); }

		// Home & About
		else if ((e.which == 72)||(e.which == 48)||(e.which == 96)) { hideMenu();unload();loadPage('home.html'); }
		else if (e.which == 65) { hideMenu();unload();loadPage('about.html'); }

		// Generator
		else if (e.which == 82) { refresh(); }
		else if (e.which == 83) { saveHeight(savename); }
		else if (e.which == 73) { invertMap(savename); }

		// Menu
		else if (e.which == 77) { toggleMenu(); }

		// User directory
		else if (e.which == 67) {
			var shell = require('electron').shell;
			var cusstom = app.getPath('home') + "/JSplacement/";
			shell.openItem(cusstom);
		}

		// In-app Guide
		else if (e.which == 71){
			$( "#digiguide" ).toggleClass( "invisible" );
			$( "div#container" ).toggleClass( "blurd" );
			$( "#guide" ).empty();

			if($( "div#digiguide" ).hasClass( "invisible" ) == false){
				$( "#guide" ).load( "guides/" + guidepage + ".html" );
			}
		}

		// Hotkey view undo
		else if (e.which == 88) {
			$( "div#hotkeys" ).addClass( "invisible" );
			$( "div#container" ).removeClass( "blurd" );
		}
		// Zoom undo
		else if (e.which == 90) {
			$( "canvas#dis" ).removeClass( "zoomed" );
			$( "canvas#dat" ).removeClass( "zoomed" );
			$( ".viewcontrols" ).removeClass( "hidden" );
			$( "div.canvasboxinner" ).unbind();
			$("canvas#dis").css("transform", "translateX(0px) translateY(0px)");
			$("canvas#dat").css("transform", "translateX(0px) translateY(0px)");
		}
	}

});

$(document).keydown(function(f){
	if($( "div#firstrun" ).hasClass( "visible" )){
	}
	else if($( "div#digiguide" ).hasClass( "invisible" ) == false){
	}
	else{
		// Hotkeys
		if (f.which == 88){
			$( "div#hotkeys" ).removeClass( "invisible" );
			$( "div#container" ).addClass( "blurd" );
		}
		else if(f.which == 9){
			f.preventDefault();
		}
		// Zoom
		else if (f.which == 90){
			$( "canvas#dis" ).addClass( "zoomed" );
			$( "canvas#dat" ).addClass( "zoomed" );
			$( ".viewcontrols" ).addClass( "hidden" );
			transX = (1+MousePosX)*-5; transY = (1+MousePosY)*-5;
			$("canvas#dis").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
			$("canvas#dat").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
			$( "div.canvasboxinner" ).mouseover(function(event){
				MousePosY = event.offsetY;
				MousePosX = event.offsetX;
				transX = (1+MousePosX)*-5;
				transY = (1+MousePosY)*-5;
				$("canvas#dis").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
				$("canvas#dat").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
			});
			$( "div.canvasboxinner" ).mousemove(function(event){
				MousePosY = event.offsetY;
				MousePosX = event.offsetX;
				transX = (1+MousePosX)*-5;
				transY = (1+MousePosY)*-5;
				$("canvas#dis").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
				$("canvas#dat").css("transform", "translateX("+transX+"px) translateY("+transY+"px)");
			});
		}
	}

});
