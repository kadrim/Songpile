import { app, BrowserWindow, protocol, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as fs from 'fs';

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

ipcMain.handle('window', (_event, action) => {
  if (win !== null) {
    switch (action) {
      case 'minimize':
        win.minimize();
        break;
      case 'close':
        win.close();
        break;
      default:
        return false;
    }
    return true;
  }
  return false;
});

ipcMain.handle('getPath', (_event, name) => app.getPath(name));

function createWindow(): BrowserWindow {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });
  win.removeMenu();

  protocol.registerFileProtocol('nodejs', (request, callback) => {
    const url = path.resolve('./node_modules/' + request.url.replace('nodejs://', ''));
    try {
      if (!fs.existsSync(url)) { // if file is not available, try via asar-archive
        const asarURL = app.getAppPath() + '/node_modules/' + request.url.replace('nodejs://', '');
        return callback(asarURL);
      }
      return callback(url);
    }
    catch (error) {
      return callback({ statusCode: 404 });
    }
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  const log = require('electron-log');
  log.transports.file.level = 'debug';
  autoUpdater.logger = log;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.checkForUpdatesAndNotify();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  protocol.registerSchemesAsPrivileged([
    { scheme: 'nodejs', privileges: { supportFetchAPI: true } }
  ]);

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window.
  // More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
