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

  SELECT_BLOG_POST: 'blogModule/SELECT_BLOG_POST',
  OPEN_BLOG_ENTITY_UPSERT_FORM: 'blogModule/OPEN_BLOG_ENTITY_UPSERT_FORM',
  CLOSE_BLOG_ENTITY_UPSERT_FORM: 'blogModule/CLOSE_BLOG_ENTITY_UPSERT_FORM',
};

// initial state
const initialState = {
  selectedPostId: 1,
  posts: [],
  comments: [],
  isOfflineMode: false,
  searchCriteria: '',
  upsertEntityFormMetadata: {
    type: null, // oneOf([posts, comments]),
    mode: null // oneOf([create, insert])
  }
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

  requestError: payload => ({ type: actionTypes.REQUEST_ERROR, payload }),

  // operations
  selectBlogPost: postId => ({ type: actionTypes.SELECT_BLOG_POST, payload: postId }),

  searchInBlogEntity: searchCriteria => ({ type: actionTypes.SEARCH_IN_BLOG_ENTITY, payload: searchCriteria }),
  searchInBlogEntityDebaunced: searchCriteria => ({ type: actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED, payload: searchCriteria }),

  openBlogEntityUpsertForm: (type, mode) => ({ type: actionTypes.OPEN_BLOG_ENTITY_UPSERT_FORM, payload: { type, mode } }),
  closeBlogEntityUpsertForm: () => ({ type: actionTypes.CLOSE_BLOG_ENTITY_UPSERT_FORM })
};

// reducers
const reducers = {
  [actionTypes.FETCH_BLOG_ENTITY]: state => ({ ...state }),
  [actionTypes.FETCH_BLOG_ENTITY_SUCCESS]: (state, { payload }) => {
    const [ posts, comments ] = payload;
    const lastPost = posts[posts.length - 1];
    return { ...state, posts: posts.reverse(), comments, selectedPostId: lastPost.id }
  },

  [actionTypes.UPSERT_BLOG_POST_SUCCESS]: (state, { payload: { data, isInsertMode } }) => {

    // insert
    if (isInsertMode) {
      // Api when POST always return same id (101)
      const newPostId = (state.posts.length + 1);
      const updatedData = { ...data, id: newPostId  };

      return ({ ...state, posts: [].concat(updatedData, state.posts) });
    }

    // update
    const updatedPosts = state.posts.map(post => {
      return (post.id === data.id) ? data : post;
    });

    return ({ ...state, posts: updatedPosts });

  },

  [actionTypes.REMOVE_BLOG_POST_SUCCESS]: (state, { payload: { postId } }) => {
    return {
      ...state,
      posts: state.posts.filter(post => post.id !== postId),
      selectedPostId: null
    }
  },

  [actionTypes.SELECT_BLOG_POST]: (state, { payload: selectedPostId }) => ({ ...state, selectedPostId }),

  [actionTypes.SEARCH_IN_BLOG_ENTITY_DEBOUNCED]: (state, { payload: searchCriteria }) => ({
    ...state, searchCriteria, selectedPostId: null
  }),

  [actionTypes.OPEN_BLOG_ENTITY_UPSERT_FORM]: (state, { payload: { type, mode } }) => ({
    ...state, upsertEntityFormMetadata: { type, mode }
  }),
  [actionTypes.CLOSE_BLOG_ENTITY_UPSERT_FORM]: (state) => ({
    ...state, upsertEntityFormMetadata: initialState.upsertEntityFormMetadata
  })
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
  },

  getUpsertEntityFormMetadata: state => state[storeName].upsertEntityFormMetadata
};