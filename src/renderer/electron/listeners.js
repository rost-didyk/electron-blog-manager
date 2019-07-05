import { ipcRenderer } from 'electron';
import { actions } from '../redux/modules/blogModule/duck';

import { store } from '../redux/Provider';

export default function initIpcListeners() {
  ipcRenderer.on('emitInitialStorePersistData', (event, data) => {
    store.dispatch(
      actions.setInitialeStateFromElectron(data)
    );
  });
}
