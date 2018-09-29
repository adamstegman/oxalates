import { combineReducers } from 'redux'

import {
  SELECT_ACTIVE_LIST
} from './actions';

const activeListId = (state = null, action) => {
  switch (action.type) {
    case SELECT_ACTIVE_LIST:
      return action.activeListId;
    default:
      return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const oxalates = combineReducers({
  lists,
  activeListId,
});

export default oxalates;
