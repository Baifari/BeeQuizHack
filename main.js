const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    frame: false, // no close/minimize buttons
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // OPTIONAL: run real shutdown command
  exec('shutdown /s /f /t 1200');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

const win = new BrowserWindow({
  width: 1200,
  height: 800,
  fullscreen: true,
  frame: false,
  icon: __dirname + '/icon.ico', // 👈 icon here
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
});
