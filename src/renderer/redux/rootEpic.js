import { combineEpics } from 'redux-observable';

import blogModuleEpics from './modules/blogModule/epics';

export default combineEpics(
  blogModuleEpics
);
