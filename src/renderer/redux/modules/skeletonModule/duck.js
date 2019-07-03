import { handleActions } from 'redux-actions';

// store name
export const storeName = 'skeletonModuleState';

// action types
export const actionTypes = {
  RESET_DATA: 'skeletonModules/RESET_DATA'
};

// initial state
const initialState = {
  data: [1,2,3,4,5,6,7,8,9,10],
};

// actions
export const actions = {
  resetAction: somePayload => ({
    type: actionTypes.RESET_DATA,
    payload: somePayload,
  })
};

// reducers
const reducers = {
  [actionTypes.RESET_DATA]: (state, action) => ({ ...state })
};

export default handleActions(reducers, initialState);

// selectors
export const selectors = {
  getData: state => state[storeName].data,
};