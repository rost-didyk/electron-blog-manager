import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';

import { actionTypes } from './duck';

export default combineEpics(
  (action$) => action$.pipe(
    filter(action => action.type === actionTypes.RESET_DATA),
    map(action => {
      return { type: 'INCREMENT', amount: 1 };
    })
  ),
);