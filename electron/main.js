const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    // icon: `file://${__dirname}/dist/assets/logo.png`
  })
  win.loadURL(`file://${__dirname}/../dist/index.html`)
  // win.webContents.openDevTools()
  win.on('closed', function () {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('todos', function (event, arg) {
  fs.writeFileSync('todos.json', JSON.stringify(arg));
});

ipcMain.on('load-todos', function (event, arg) {
  let todos = "[]";
  if (fs.existsSync('todos.json')) {
    todos = fs.readFileSync('todos.json').toString();
  }
  event.sender.send('todos', todos);
});
