const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('storage', {
  save: (data) => ipcRenderer.send('save', data),
  read: () =>  ipcRenderer.invoke('read'),
  entries: (data) => ipcRenderer.on('entries', data) 
})

contextBridge.exposeInMainWorld('orderWindow', {
  open: (data) => ipcRenderer.send('openOrderWindow', data),
  
})