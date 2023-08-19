const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {shell} = require('electron')

let win

function createWindow () {
  win = new BrowserWindow({title: 'JSplacement', icon: __dirname + '/req/img/jsico.png', width: 1280, height: 800, show: false, frame: false, resizable: false, fullscreenable: false, backgroundColor: '#181818'})

  win.webContents.on('new-window', function(event, urlToOpen) {
  event.defaultPrevented = true;
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.once('ready-to-show', () => {
    win.show()
  })

// win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('force-color-profile', 'srgb');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
