import { ipcMain } from "electron";

export default function initIpcListeners(StorageInstance) {
  ipcMain.on("saveDataToStorage", data => StorageInstance.set('data', data));
}