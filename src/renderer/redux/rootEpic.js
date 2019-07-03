import { combineEpics } from 'redux-observable';

import skeletonModuleEpics from './modules/skeletonModule/epics';

export default combineEpics(
  skeletonModuleEpics
);
