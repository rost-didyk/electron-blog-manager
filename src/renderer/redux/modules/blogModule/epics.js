import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, catchError, map, debounceTime, flatMap  } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { forkJoin, concat, of } from 'rxjs';

import endpoints from '../../../config/endpoints';
import { actionTypes, actions } from './duck';

export default combineEpics(
  // fetch blog entity
  action$ => action$.pipe(
    ofType(actionTypes.FETCH_BLOG_ENTITY),
    mergeMap(() => {
      return forkJoin(
        ajax.getJSON(endpoints.POSTS_URI),
        ajax.getJSON(endpoints.COMMENTS_URI),
      ).pipe(
        map(response => actions.fetchBlogEntitySuccess(response)) ,
        catchError(({ status, message }) => of(actions.requestError({ status, message })))
      )
    }),
  ),
  // upsert blog post
  action$ => action$.pipe(
    ofType(actionTypes.UPSERT_BLOG_POST),
    mergeMap(({ payload }) => {
      const method = payload.id ? 'PUT': 'POST';
      const url = payload.id ?
        endpoints.POSTS_URI + '/' + payload.id :
        endpoints.POSTS_URI;

      return ajaxCall( method, url, payload, actions.upsertBlogPostSuccess, { isInsertMode: payload.id === null } );

    })
  ),
  // search DEBOUNCED
  action$ => action$.pipe(
    ofType(actionTypes.SEARCH_IN_BLOG_ENTITY),
    debounceTime(200),
    map(({ payload }) => actions.searchInBlogEntityDebaunced(payload)) ,
  )
)


// helpers
function ajaxCall( method, url, body, successAction, passDataToSuccessAction = {} ) {
  return ajax({ method, url, headers: { 'Content-Type': 'application/json' }, body})
    .pipe(
      flatMap(({ response }) => {
        return concat(
          of(successAction({ data: response, ...passDataToSuccessAction })),
          of(actions.closeBlogEntityUpsertForm())
        );
      }),
      catchError(({ status, message }) => {
        return concat(
          of(actions.requestError({ status, message })),
          of(actions.closeBlogEntityUpsertForm())
        )
      })
    )
}