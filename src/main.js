const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
import Storage from './app/storage';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


let storage = new Storage;


const createWindow = () => {
    // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on ('save', (e, data) => {
    storage.save('data.txt', data)
  });

  mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('entries', storage.read("data.txt"));
      // ipcMain.handleOnce ('read', async () => {
      //   let result = await storage.read("data.txt");
      //   console.log(result)
      //   return result;
      // }); 
  });
  
  ipcMain.handle ('read', async () => {
    let result = await storage.read("data.txt");
    console.log(result)
    return result;
  }); 

  // ipcMain.on ('openOrderWindow', () => {
  //   createOrderWindow()
  // });
};



// const createOrderWindow = () => {
//   // Create the browser window.
//   const orderWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: ORDER_WINDOW_PRELOAD_WEBPACK_ENTRY,
//     }
//   });

//   // and load the index.html of the app.
//   orderWindow.loadURL(ORDER_WINDOW_WEBPACK_ENTRY);

//   // Open the DevTools.
//   orderWindow.webContents.openDevTools();


// };
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
 app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
