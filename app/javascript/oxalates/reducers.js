import { combineReducers } from 'redux'

import {
  FETCH_FOODS_FAILURE,
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  SELECT_ACTIVE_LIST_ID,
} from './actions';

const activeListId = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_ACTIVE_LIST_ID:
      return action.activeListId;
    default:
      return state;
  }
};

const foods = (state = [], action) => {
  switch (action.type) {
    case FETCH_FOODS_REQUEST:
      return [];
    case FETCH_FOODS_SUCCESS:
      return action.foods;
    default:
      return state;
  }
};

const fetchFoodsError = (state = null, action) => {
  switch (action.type) {
    case FETCH_FOODS_REQUEST:
      return null;
    case FETCH_FOODS_FAILURE:
      return `Error fetching foods for list_id=${action.listId}: ${action.err.message}`;
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

const listMenu = combineReducers({
  lists,
  activeListId,
});

const foodList = combineReducers({
  foods,
  error: fetchFoodsError,
})

const oxalates = combineReducers({
  listMenu,
  foodList,
});

export default oxalates;
