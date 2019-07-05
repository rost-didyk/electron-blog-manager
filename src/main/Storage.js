import Store from 'electron-store';

const StoreInst = new Store({
  defaults: { data: {} }
});

export default StoreInst;
