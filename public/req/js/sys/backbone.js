/* Electron Setup */

const remote = require('electron').remote;
const app = remote.app;
const process = remote.process;

window.$ = window.jQuery = require('jquery');
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
options.async = true;
});

var win = remote.getCurrentWindow();
win.webContents.session.clearCache(function(){
});

/* fs module + paths */

const fs = require('fs-extra');

var homepath = app.getPath('home') + "/JSplacement";
var customs = app.getPath('home') + "/JSplacement/CustomSprites";

/* Check for config file */

if (!fs.existsSync(homepath + "/jsplacement.conf")){
  // $( "div#firstrun" ).addClass( "visible" );
  // $( "div#wrapper" ).addClass( "blurd" );
  fs.copySync(__dirname + '/req/jsplacement.conf', homepath+'/jsplacement.conf');
}

if(!fs.existsSync(homepath + "/CustomSprites")){
  fs.mkdirSync(homepath + '/CustomSprites');
}

if(!fs.existsSync(homepath + "/CustomGradients")){
  fs.mkdirSync(homepath + '/CustomGradients');
}

/* Startup */

$(function() {
  $("#container").load("pages/home.html");
});

// RNG
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
