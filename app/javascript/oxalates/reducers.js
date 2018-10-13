import isEqual from 'lodash/isEqual';
import { combineReducers } from 'redux'

import {
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  CREATE_FOOD_FAILURE,
  CREATE_FOOD_REQUEST,
  CREATE_FOOD_SUCCESS,
  FETCH_FOOD_SEARCH_RESULTS_FAILURE,
  FETCH_FOOD_SEARCH_RESULTS_REQUEST,
  FETCH_FOOD_SEARCH_RESULTS_SUCCESS,
  FETCH_FOODS_FAILURE,
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  SELECT_ACTIVE_LIST_ID,
  SET_AUTHENTICATING,
  SET_PASSWORD,
  SET_SEARCH_QUERY,
  SET_NEW_FOOD,
} from './actions';

const authenticated = (state = false, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_SUCCESS:
      if (action.password === password) {
        return true;
      }
      return state;
    default:
      return state;
  }
};

const authenticating = (state = false, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_SUCCESS:
      if (action.password === password) {
        return false;
      }
      return state;
    case SET_AUTHENTICATING:
      return action.authenticating;
    default:
      return state;
  }
};

const sessionError = (state = null, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_FAILURE:
      if (action.password === password) {
        return action.err;
      }
      return state;
    case SET_PASSWORD:
      return null;
    default:
      return state;
  }
};

const password = (state = '', action) => {
  switch(action.type) {
    case SET_PASSWORD:
      return action.password;
    default:
      return state;
  }
};

const activeListId = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_ACTIVE_LIST_ID:
      return action.activeListId;
    default:
      return state;
  }
};

const foods = (state = [], action, { requestedListId, query }) => {
  switch (action.type) {
    case FETCH_FOOD_SEARCH_RESULTS_REQUEST:
    case FETCH_FOODS_REQUEST:
      return [];
    case FETCH_FOOD_SEARCH_RESULTS_SUCCESS:
      if (action.query === query) {
        return action.foods;
      }
      return state;
    case FETCH_FOODS_SUCCESS:
      if (action.listId === requestedListId) {
        return action.foods;
      }
      return state;
    default:
      return state;
  }
};

const newFood = (state = null, action, { requestedNewFood }) => {
  switch (action.type) {
    case CREATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedNewFood)) {
        return null;
      }
      return state;
    case SET_NEW_FOOD:
      return action.food;
    default:
      return state;
  }
};

const newFoodListId = (state = null, action, { requestedNewFood }) => {
  switch (action.type) {
    case CREATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedNewFood)) {
        return null;
      }
      return state;
    case SET_NEW_FOOD:
      return action.listId;
    default:
      return state;
  }
};

const requestedNewFood = (state = null, action, { requestedNewFood }) => {
  switch (action.type) {
    case CREATE_FOOD_REQUEST:
      return action.food;
    case CREATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedNewFood)) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const requestedListId = (state = null, action) => {
  switch (action.type) {
    case FETCH_FOODS_REQUEST:
      return action.listId;
    case FETCH_FOODS_SUCCESS:
    case FETCH_FOODS_FAILURE:
      if (action.listId === state) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const foodListError = (state = null, action, { requestedListId, requestedNewFood, query }) => {
  switch (action.type) {
    case CREATE_FOOD_REQUEST:
    case FETCH_FOOD_SEARCH_RESULTS_REQUEST:
    case FETCH_FOODS_REQUEST:
      return null;
    case CREATE_FOOD_FAILURE:
      if (isEqual(action.food, requestedNewFood)) {
        return `Error creating food: ${action.err.message}`;
      }
      return state;
    case FETCH_FOOD_SEARCH_RESULTS_FAILURE:
      if (action.query === query) {
        return `Error fetching foods for query="${action.query}": ${action.err.message}`;
      }
      return state;
    case FETCH_FOODS_FAILURE:
      if (action.listId === requestedListId) {
        return `Error fetching foods for list_id=${action.listId}: ${action.err.message}`;
      }
      return state;
    default:
      return state;
  }
};

const query = (state = '', action) => {
  switch(action.type) {
    case SET_SEARCH_QUERY:
      return action.query;
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

const session = (state = {}, action) => {
  return {
    authenticated: authenticated(state.authenticated, action, { password: state.password }),
    authenticating: authenticating(state.authenticating, action, { password: state.password }),
    error: sessionError(state.error, action, { password: state.password }),
    password: password(state.password, action),
  };
};

const listMenu = combineReducers({
  lists,
  activeListId,
});

const foodList = (state = {}, action) => {
  return {
    foods: foods(state.foods, action, { requestedListId: state.requestedListId, query: state.query  }),
    newFood: newFood(state.newFood, action, { requestedNewFood: state.requestedNewFood }),
    newFoodListId: newFoodListId(state.newFoodListId, action, { requestedNewFood: state.requestedNewFood }),
    requestedNewFood: requestedNewFood(state.requestedNewFood, action, { requestedNewFood: state.requestedNewFood }),
    error: foodListError(state.error, action, { requestedListId: state.requestedListId, requestedNewFood: state.requestedNewFood, query: state.query }),
    requestedListId: requestedListId(state.requestedListId, action),
    query: query(state.query, action),
  };
};

const oxalates = combineReducers({
  session,
  listMenu,
  foodList,
});

export default oxalates;
