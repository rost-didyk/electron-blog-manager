import { handleActions } from 'redux-actions';

// store name
export const storeName = 'blog';

// action types
export const actionTypes = {
  FETCH_BLOG_ENTITY: 'blogModule/FETCH_BLOG_ENTITY',
  FETCH_BLOG_ENTITY_SUCCESS: 'blogModule/FETCH_BLOG_ENTITY_SUCCESS',

  UPSERT_BLOG_POST: 'blogModule/UPSERT_BLOG_POST',
  UPSERT_BLOG_POST_SUCCESS: 'blogModule/UPSERT_BLOG_POST_SUCCESS',

  REMOVE_BLOG_POST: 'blogModule/REMOVE_BLOG_POST',
  REMOVE_BLOG_POST_SUCCESS: 'blogModule/REMOVE_BLOG_POST_SUCCESS',

  UPSERT_BLOG_POST_COMMENT: 'blogModule/UPSERT_BLOG_POST_COMMENT',
  UPSERT_BLOG_POST_COMMENT_SUCCESS: 'blogModule/UPSERT_BLOG_POST_COMMENT_SUCCESS',

  REMOVE_BLOG_POST_COMMENT: 'blogModule/REMOVE_BLOG_POST_COMMENT',
  REMOVE_BLOG_POST_COMMENT_SUCCESS: 'blogModule/REMOVE_BLOG_POST_COMMENT_SUCCESS',

  REQUEST_ERROR: 'blogModule/REQUEST_ERROR',

  SEARCH_IN_BLOG_ENTITY: 'blogModule/SEARCH_IN_BLOG_ENTITY',
  SEARCH_IN_BLOG_ENTITY_DEBOUNCED: 'blogModule/SEARCH_IN_BLOG_ENTITY_DEBOUNCED',

  SELECT_BLOG_POST: 'blogModule/SELECT_BLOG_POST'
};

// initial state
const initialState = {
  selectedPostId: 1,
  posts: [],
  comments: [],
  isOfflineMode: false,
  searchCriteria: '',
};

// actions
export const actions = {
  fetchBlogEntity: () => ({
    type: actionTypes.FETCH_BLOG_ENTITY,
  }),
  fetchBlogEntitySuccess: payload => ({
    type: actionTypes.FETCH_BLOG_ENTITY_SUCCESS,
    payload
  }),

  requestError: payload => ({
    type: actionTypes.REQUEST_ERROR,
    payload
  }),

  selectBlogPost: postId => ({
    type: actionTypes.SELECT_BLOG_POST,
    payload: postId
  }),

  searchInBlogEntity: searchCriteria => ({
    type: actionTypes.SEARCH_IN_BLOG_ENTITY,
    payload: searchCriteria
  }),
  searchInBlogEntityDebaunced: searchCriteria => ({
    type: actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED,
    payload: searchCriteria
  })


};

// reducers
const reducers = {
  [actionTypes.FETCH_BLOG_ENTITY]: (state, action) => ({ ...state }),
  [actionTypes.FETCH_BLOG_ENTITY_SUCCESS]: (state, { payload }) => {
    const [ posts, comments ] = payload;
    const lastPost = posts[posts.length - 1];
    return { ...state, posts: posts.reverse(), comments, selectedPostId: lastPost.id }
  },
  [actionTypes.SELECT_BLOG_POST]: (state, { payload: selectedPostId }) => {
    return { ...state, selectedPostId }
  },
  [actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED]: (state, { payload: searchCriteria }) => {
    return { ...state, searchCriteria, selectedPostId: null }
  }
};

export default handleActions(reducers, initialState);

// selectors
export const selectors = {
  getPosts: state => {
    const { posts, comments, searchCriteria } = state[storeName];

    if (!searchCriteria.length) return posts;

    // search by criteria
    const findSearchPostIdInComment = comments
    .filter(comment => comment.body.includes(searchCriteria))
    .map(comment => comment.postId);

    const searchResult = posts.filter(post => (
      post.title.includes(searchCriteria) ||
      post.body.includes(searchCriteria) ||
      findSearchPostIdInComment.includes(post.id))
    );

    return searchResult;

  },
  getComments: state => state[storeName].comments,
  getSelectedPost: state => {
    const { posts, comments, selectedPostId } = state[storeName];

    if (!selectedPostId) return null;

    const currentPost = posts.find(post => post.id === selectedPostId);
    const relatedComments = comments.reduce((acc, comment) => {
      if (comment.postId === selectedPostId) acc.push(comment);
      return acc;
    }, []);

    return {
      ...currentPost,
      comments: relatedComments
    }
  }
};