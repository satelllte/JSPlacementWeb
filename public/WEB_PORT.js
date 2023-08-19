// define `__dirname` global variable which is used in the original source code
__dirname = "";

// define `rand` function
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// define `files` global variable which is used in the original source code
files = [
  'JS2sprites/Aggromaxx/001.svg',
  'JS2sprites/Aggromaxx/002.svg',
  'JS2sprites/Aggromaxx/003.svg',
  'JS2sprites/Aggromaxx/003-alt.svg',
  'JS2sprites/Aggromaxx/004.svg',
  'JS2sprites/Aggromaxx/Addon.svg',
  'JS2sprites/Aggromaxx/Addon2.svg',
  'JS2sprites/Aggromaxx/Addon3.svg',
  'JS2sprites/Aggromaxx/Vent.svg',
  'JS2sprites/Aggromaxx/Vent2.svg',
  'JS2sprites/Aggromaxx/Wires.svg',
  'JS2sprites/Aggromaxx/Wires2.svg',
];

// define `gfiles` global variable which contains paths to gradients
gfiles = [
  'Gradients/gradi001.png',
  'Gradients/gradi002.png',
  'Gradients/gradi003.png',
  'Gradients/gradi004.png',
  'Gradients/gradi005.png',
  'Gradients/gradi006.png',
  'Gradients/gradi007.png',
  'Gradients/gradi008.png',
  'Gradients/gradi009.png',
  'Gradients/gradi010.png',
  'Gradients/gradi011.png',
  'Gradients/gradi012.png',
  'Gradients/gradi013.png',
  'Gradients/gradi014.png',
  'Gradients/gradi015.png',
  'Gradients/gradi016.png',
  'Gradients/gradi017.png',
  'Gradients/gradi018.png',
  'Gradients/gradi019.png',
  'Gradients/gradi020.png',
];

// define global configuration object
cfg = {
  General: {
    skipSplashScreen: true,
    disableAnimations: false,
    disableUpdateCheck: true,
    timestampFormat: 0,
    skin: 0,
    iddqd: false,
  }
}