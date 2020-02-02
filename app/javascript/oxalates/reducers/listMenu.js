import { combineReducers } from 'redux'
import {
  SELECT_ACTIVE_LIST_ID,
} from '../actions';

const activeListId = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_ACTIVE_LIST_ID:
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

export const listMenu = combineReducers({
  lists,
  activeListId,
});
