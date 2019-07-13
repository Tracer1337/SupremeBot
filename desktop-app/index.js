const { app, BrowserWindow, ipcMain } = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) // eslint-disable-line global-require
  app.quit()

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile("./dist/index.html")

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // Mac OS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Mac OS
app.on('activate', () => !mainWindow ? createWindow() : null)
