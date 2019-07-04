import { combineReducers } from 'redux';

import blogModule, { storeName as blogModuleStoreName } from './modules/blogModule/duck';

export default () => combineReducers({
  [blogModuleStoreName]: blogModule,
});