import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, catchError, map, debounceTime} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';

import enpoints from '../../../config/endpoints';
import { actionTypes, actions } from './duck';

export default combineEpics(
  // fetch blog entity
  action$ => action$.pipe(
    ofType(actionTypes.FETCH_BLOG_ENTITY),
    mergeMap(() => {
      return forkJoin(
        ajax.getJSON(enpoints.POSTS_URI),
        ajax.getJSON(enpoints.COMMENTS_URI),
      ).pipe(
        map(response => actions.fetchBlogEntitySuccess(response)) ,
        catchError(({ status, message }) => of(actions.requestError({ status, message })))
      )
    }),
  ),
  // search DEBOUNCED
  action$ => action$.pipe(
    ofType(actionTypes.SEARCH_IN_BLOG_ENTITY),
    debounceTime(200),
    map(action => actions.searchInBlogEntityDebaunced(action.payload)) ,
  )
)