const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('storage', {
  save: (data) => ipcRenderer.send('save', data),
  read: () =>  ipcRenderer.invoke('read') 
})