var path = require('path')
const ipc = require('electron').ipcRenderer

document.addEventListener('DOMContentLoaded', function() {
  // Notificações
  document.getElementById("basic-notification").addEventListener("click", () => {
    notificationData = {
      title: "Notificação Básica",
      body: "Notificação simples do sistema."
    }
    new Notification("Notificação Básica", notificationData);
  })

  document.getElementById("image-notification").addEventListener("click", () => {
    notificationData = {
      title: "Notificação com Imagem",
      body: "Notificação do sistema com uma imagem.",
      icon: path.join(__dirname, 'icon.jpg')
    }
    new Notification("Notificação Básica", notificationData);
  })

  // Botões de dialog
  errorButton = document.getElementById("error-dialog")
  infoButton = document.getElementById("info-dialog")

  // Mensagem para o processo principal disparar dialog de erro
  errorButton.addEventListener('click', function (event) {
    ipc.send('open-error-dialog')
  })

  // Mensagem para o processo principal disparar dialog de informação
  infoButton.addEventListener('click', function (event) {
    ipc.send('open-info-dialog')
  })

  // Tratamento de mensagem do dialog de informação
  ipc.on('information-dialog-selection', function (event, index) {
    let message = 'Você escolheu '
    if (index === 0) message += 'sim.'
    else message += 'não.'
    document.getElementById('selection-info').innerHTML = message
  })
})
