import { ipcMain } from "electron";

export default function initIpcListeners(StorageInstance) {
  ipcMain.on("saveDataToElectronStorage", (event, data) => {
    StorageInstance.set('data', data);
  });
}