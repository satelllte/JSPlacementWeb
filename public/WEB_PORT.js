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
  'JS2sprites/BigData/001.svg',
  'JS2sprites/BigData/002.svg',
  'JS2sprites/BigData/003a.svg',
  'JS2sprites/BigData/003b.svg',
  'JS2sprites/BigData/005.svg',
  'JS2sprites/CrapPack/altcrap-001.svg',
  'JS2sprites/CrapPack/altcrap-001b.svg',
  'JS2sprites/CrapPack/altcrap-002.svg',
  'JS2sprites/CrapPack/altcrap-003.svg',
  'JS2sprites/CrapPack/altcrap-004.svg',
  'JS2sprites/CrapPack/altcrap-005.svg',
  'JS2sprites/CrapPack/altcrap-006.svg',
  'JS2sprites/CrapPack/altcrap-007.svg',
  'JS2sprites/CrapPack/altcrap-008.svg',
  'JS2sprites/CrapPack/altcrap-009.svg',
  'JS2sprites/CrapPack/altcrap-010.svg',
  'JS2sprites/CrapPack/altcrap-011.svg',
  'JS2sprites/CrapPack/altcrap-012.svg',
  'JS2sprites/CrapPack/altcrap-013.svg',
  'JS2sprites/CrapPack/altcrap-014.svg',
  'JS2sprites/CrapPack/altcrap-015.svg',
  'JS2sprites/CrapPack/altcrap-016.svg',
  'JS2sprites/CrapPack/altcrap-016b.svg',
  'JS2sprites/CrapPack/crap-001.svg',
  'JS2sprites/CrapPack/crap-002.svg',
  'JS2sprites/CrapPack/crap-003.svg',
  'JS2sprites/CrapPack/crap-004.svg',
  'JS2sprites/CrapPack/crap-005.svg',
  'JS2sprites/CrapPack/crap-006.svg',
  'JS2sprites/CrapPack/crap-007.svg',
  'JS2sprites/CrapPack/crap-007b.svg',
  'JS2sprites/CrapPack/newcrap-001.svg',
  'JS2sprites/JS2Classic/001.svg',
  'JS2sprites/JS2Classic/004.svg',
  'JS2sprites/JS2Classic/005.svg',
  'JS2sprites/JS2Classic/006.svg',
  'JS2sprites/JS2Classic/007.svg',
  'JS2sprites/JS2Classic/008.svg',
  'JS2sprites/JS2Classic/009.svg',
  'JS2sprites/JS2Classic/010.svg',
  'JS2sprites/JS2Classic/011.svg',
  'JS2sprites/JS2Classic/012.svg',
  'JS2sprites/JS2Classic/013.svg',
  'JS2sprites/JS2Classic/014.svg',
  'JS2sprites/JS2Classic/015.svg',
  'JS2sprites/JS2Classic/016.svg',
  'JS2sprites/JS2Classic/017.svg',
  'JS2sprites/JS2Classic/018.svg',
  'JS2sprites/JS2Classic/019.svg',
  'JSUdata/bases/000',
  'JSUdata/bases/001',
  'JSUdata/bases/002',
  'JSUdata/addons/A-000',
  'JSUdata/addons/B-000',
  'JSUdata/addons/C-000',
  'JSUdata/addons/D-000',
  'JSUdata/addons/E-000',
  'JSUdata/addons/F-000',
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