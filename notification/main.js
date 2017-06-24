const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  ipc.on('open-error-dialog', function (event) {
    dialog.showErrorBox('Deu ruim', 'Mensagem de erro do sistema :(')
  })

  ipc.on('open-info-dialog', function (event) {
    const options = {
      type: 'info',
      title: 'Informação',
      message: "Diálogo mostrando informação do sistema. Curtiu?",
      buttons: ['Sim', 'Não']
    }
    dialog.showMessageBox(options, function (index) {
      event.sender.send('information-dialog-selection', index)
    })
  })
})
