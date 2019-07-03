import { combineReducers } from 'redux'

import skeletonModuleState, { storeName } from './modules/skeletonModule/duck';

export default () => combineReducers({
  [storeName]: skeletonModuleState,
});
