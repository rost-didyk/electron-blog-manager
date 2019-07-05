import { ipcRenderer } from 'electron';

export function saveDataToElectronStorage(data) {
  ipcRenderer.send("saveDataToElectronStorage", data);
}