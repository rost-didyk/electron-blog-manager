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
        catchError(({ status, message }) => {
          alert(`Network error: ${status} - ${message}`);
          return of(actions.requestError({ status, message }));
        })
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
  // delete blog post
  action$ => action$.pipe(
    ofType(actionTypes.REMOVE_BLOG_POST),
    mergeMap(({ payload: postId }) => {
      const method = 'DELETE';
      const url = endpoints.POSTS_URI + '/' + postId;

      return ajaxCall( method, url, null, actions.removeBlogPostSuccess, { postId } );

    })
  ),
  // upsert blog comment
  action$ => action$.pipe(
    ofType(actionTypes.UPSERT_BLOG_POST_COMMENT),
    mergeMap(({ payload }) => {
      const method = payload.id ? 'PUT': 'POST';
      const url = payload.id ?
        endpoints.COMMENTS_URI + '/' + payload.id :
        endpoints.COMMENTS_URI;

      return ajaxCall( method, url, payload, actions.upsertBlogCommentSuccess, { isInsertMode: payload.id === null } );

    })
  ),
  // delete blog comments
  action$ => action$.pipe(
    ofType(actionTypes.REMOVE_BLOG_POST_COMMENT),
    mergeMap(({ payload: commentId }) => {
      const method = 'DELETE';
      const url = endpoints.POSTS_URI + '/' + commentId;

      return ajaxCall( method, url, null, actions.removeBlogCommentSuccess, { commentId } );

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
        alert(`Network error: ${status} - ${message}. This occurred because http://jsonplaceholder.typicode.com not support Update or Delete for created entity.`);
        return concat(
          of(actions.requestError({ status, message })),
          of(actions.closeBlogEntityUpsertForm())
        )
      })
    )
}