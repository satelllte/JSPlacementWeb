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