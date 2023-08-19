/* Config read */

var ini = require('ini');
var cfg = ini.parse(fs.readFileSync(homepath + "/jsplacement.conf", 'utf-8'));

if(((typeof cfg.General) == "undefined") || ((typeof cfg.General.timestampFormat) == "undefined")){
  cfg.timestampFormat = 1;
  fs.writeFileSync(homepath + "/jsplacement.conf", ini.stringify(cfg,{ section: 'General' }));
  cfg = ini.parse(fs.readFileSync(homepath + "/jsplacement.conf", 'utf-8'));
}

if((typeof cfg.General.skipSplashScreen) == "undefined"){
  cfg.General.skipSplashScreen = false;
}

if((typeof cfg.General.disableUpdateCheck) == "undefined"){
  cfg.General.disableUpdateCheck = false;
}

if((typeof cfg.General.disableAnimations) == "undefined"){
  cfg.General.disableAnimations = false;
}

if((typeof cfg.General.skin) == "undefined"){
  cfg.General.skin = 0;
}

if((typeof cfg.General.iddqd) == "undefined"){
  cfg.General.iddqd = false;
}

fs.writeFileSync(homepath + "/jsplacement.conf", ini.stringify(cfg));
cfg = ini.parse(fs.readFileSync(homepath + "/jsplacement.conf", 'utf-8'));

if(cfg.General.skin == 1){
  $('link[rel="stylesheet"]').attr('href','req/style-pro.css');
}
