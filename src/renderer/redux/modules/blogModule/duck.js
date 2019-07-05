import { handleActions } from 'redux-actions';
import orderBy from 'lodash/orderBy';

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

  SELECT_BLOG_POST: 'blogModule/SELECT_BLOG_POST',
  OPEN_BLOG_ENTITY_UPSERT_FORM: 'blogModule/OPEN_BLOG_ENTITY_UPSERT_FORM',
  CLOSE_BLOG_ENTITY_UPSERT_FORM: 'blogModule/CLOSE_BLOG_ENTITY_UPSERT_FORM',

  SET_INITIAL_STATE_FROM_ELECTRON_STORE: 'blogModule/SET_INITIAL_STATE_FROM_ELECTRON_STORE',
};

// initial state
const initialState = {
  selectedPostId: 1,
  posts: [],
  comments: [],
  isOfflineMode: false,
  searchCriteria: '',
  upsertEntityFormMetadata: {
    type: null, // oneOf([post, comment]),
    mode: null, // oneOf([create, edit]),
    entity: null // entity for edit
  },
  isLoading: false,
};

// actions
export const actions = {
  // requests
  fetchBlogEntity: () => ({ type: actionTypes.FETCH_BLOG_ENTITY }),
  fetchBlogEntitySuccess: payload => ({ type: actionTypes.FETCH_BLOG_ENTITY_SUCCESS, payload }),

  upsertBlogPost: payload => ({ type: actionTypes.UPSERT_BLOG_POST, payload }),
  upsertBlogPostSuccess: ({ data, isInsertMode }) => ({ type: actionTypes.UPSERT_BLOG_POST_SUCCESS, payload: { data, isInsertMode } }),

  removeBlogPost: postId => ({ type: actionTypes.REMOVE_BLOG_POST, payload: postId }),
  removeBlogPostSuccess: postId => ({ type: actionTypes.REMOVE_BLOG_POST_SUCCESS, payload: postId }),

  upsertBlogComment: payload => ({ type: actionTypes.UPSERT_BLOG_POST_COMMENT, payload }),
  upsertBlogCommentSuccess: ({ data, isInsertMode }) => ({ type: actionTypes.UPSERT_BLOG_POST_COMMENT_SUCCESS, payload: { data, isInsertMode } }),

  removeBlogComment: commentId => ({ type: actionTypes.REMOVE_BLOG_POST_COMMENT, payload: commentId }),
  removeBlogCommentSuccess: commentId => ({ type: actionTypes.REMOVE_BLOG_POST_COMMENT_SUCCESS, payload: commentId }),

  requestError: payload => ({ type: actionTypes.REQUEST_ERROR, payload }),

  // operations
  selectBlogPost: postId => ({ type: actionTypes.SELECT_BLOG_POST, payload: postId }),

  searchInBlogEntity: searchCriteria => ({ type: actionTypes.SEARCH_IN_BLOG_ENTITY, payload: searchCriteria }),
  searchInBlogEntityDebaunced: searchCriteria => ({ type: actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED, payload: searchCriteria }),

  openBlogEntityUpsertForm: (type, mode, entity = null) => ({ type: actionTypes.OPEN_BLOG_ENTITY_UPSERT_FORM, payload: { type, mode, entity } }),
  closeBlogEntityUpsertForm: () => ({ type: actionTypes.CLOSE_BLOG_ENTITY_UPSERT_FORM }),

  setInitialeStateFromElectron: state => ({ type: actionTypes.SET_INITIAL_STATE_FROM_ELECTRON_STORE, payload: state })
};

// reducers
const reducers = {
  [actionTypes.FETCH_BLOG_ENTITY]: state => ({ ...state, isLoading: true }),
  [actionTypes.FETCH_BLOG_ENTITY_SUCCESS]: (state, { payload }) => {
    const [ posts, comments ] = payload;
    const lastPost = posts[posts.length - 1];
    return { ...state, posts: posts.reverse(), comments, selectedPostId: lastPost.id, isLoading: false }
  },

  [actionTypes.UPSERT_BLOG_POST]: state => ({ ...state, isLoading: true }),
  [actionTypes.UPSERT_BLOG_POST_SUCCESS]: (state, { payload: { data, isInsertMode } }) => {

    // insert
    if (isInsertMode) {
      // Api when POST always return same id (101)
      const newPostId = (state.posts.length + 1);
      const updatedData = { ...data, id: newPostId  };

      return ({ ...state, posts: [].concat(updatedData, state.posts), isLoading: false });
    }

    // update
    const updatedPosts = state.posts.map(post => {
      return (post.id === data.id) ? data : post;
    });

    return ({ ...state, posts: updatedPosts, isLoading: false });

  },

  [actionTypes.REMOVE_BLOG_POST]: state => ({ ...state, isLoading: true }),
  [actionTypes.REMOVE_BLOG_POST_SUCCESS]: (state, { payload: { postId } }) => {
    const filteredComments = state.comments.filter(comment => comment.postId !== postId);

    return {
      ...state,
      posts: state.posts.filter(post => post.id !== postId),
      comments: filteredComments,
      selectedPostId: null,
      isLoading: false
    }
  },

  [actionTypes.UPSERT_BLOG_POST_COMMENT]: state => ({ ...state, isLoading: true }),
  [actionTypes.UPSERT_BLOG_POST_COMMENT_SUCCESS]: (state, { payload: { data, isInsertMode } }) => {
    // insert
    if (isInsertMode) {
      // Api when POST always return same id (501)
      const newId = (state.comments.length + 1);
      const updatedData = { ...data, id: newId  };
      return ({ ...state, comments: [].concat(state.comments, updatedData), isLoading: false });
    }

    // update
    const updatedComments = state.comments.map(comment => {
      return (comment.id === data.id) ? data : comment;
    });

    return ({ ...state, comments: updatedComments, isLoading: false });

  },

  [actionTypes.REMOVE_BLOG_POST_COMMENT]: state => ({ ...state, isLoading: true }),
  [actionTypes.REMOVE_BLOG_POST_COMMENT_SUCCESS]: (state, { payload: { commentId } }) => {
    return {
      ...state,
      comments: state.comments.filter(comment => comment.id !== commentId),
      isLoading: false
    }
  },

  [actionTypes.SELECT_BLOG_POST]: (state, { payload: selectedPostId }) => ({ ...state, selectedPostId }),

  [actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED]: (state, { payload: searchCriteria }) => ({
    ...state, searchCriteria, selectedPostId: null
  }),

  [actionTypes.OPEN_BLOG_ENTITY_UPSERT_FORM]: (state, { payload: { type, mode, entity } }) => ({
    ...state, upsertEntityFormMetadata: { type, mode, entity }
  }),
  [actionTypes.CLOSE_BLOG_ENTITY_UPSERT_FORM]: (state) => ({
    ...state, upsertEntityFormMetadata: initialState.upsertEntityFormMetadata
  }),

  [actionTypes.SET_INITIAL_STATE_FROM_ELECTRON_STORE]: (state, { payload: initialStateFromStore }) => ({
    ...state,
    ...initialStateFromStore
  }),

  [actionTypes.REQUEST_ERROR]: state => ({ ...state,  isLoading: false })
};

export default handleActions(reducers, initialState);

// selectors
export const selectors = {
  getIsLoadingStatus: state => state[storeName].isLoading,
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
    const orderedRelatedComments = orderBy(relatedComments, ['id'], ['desc']);

    return {
      ...currentPost,
      comments: orderedRelatedComments
    }
  },

  getUpsertEntityFormMetadata: state => state[storeName].upsertEntityFormMetadata
};