import isEqual from 'lodash/isEqual';
import {
  CANCEL_EDITING_FOOD,
  CANCEL_NEW_FOOD,
  CREATE_FOOD_FAILURE,
  CREATE_FOOD_REQUEST,
  CREATE_FOOD_SUCCESS,
  DELETE_FOOD_FAILURE,
  DELETE_FOOD_REQUEST,
  FETCH_FOOD_SEARCH_RESULTS_FAILURE,
  FETCH_FOOD_SEARCH_RESULTS_REQUEST,
  FETCH_FOOD_SEARCH_RESULTS_SUCCESS,
  FETCH_FOODS_FAILURE,
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  SET_EDITING_FOOD,
  SET_EDITING_FOODS,
  SET_SEARCH_QUERY,
  SET_NEW_FOOD,
  UPDATE_FOOD_FAILURE,
  UPDATE_FOOD_REQUEST,
  UPDATE_FOOD_SUCCESS,
} from '../actions';

const foods = (state = [], action, { requestedListId, query }) => {
  switch (action.type) {
    case DELETE_FOOD_REQUEST:
      return state.filter(food => food.id !== action.food.id);
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

const editingFoods = (state = false, action) => {
  switch (action.type) {
    case SET_EDITING_FOODS:
      return action.editingFoods;
    default:
      return state;
  }
};

const editingFood = (state = null, action, { requestedEditingFood }) => {
  switch (action.type) {
    case CANCEL_EDITING_FOOD:
      return null;
    case UPDATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedEditingFood)) {
        return null;
      }
      return state;
    case SET_EDITING_FOOD:
      return action.food;
    default:
      return state;
  }
};

const editingFoodListId = (state = null, action, { requestedEditingFood }) => {
  switch (action.type) {
    case CANCEL_EDITING_FOOD:
      return null;
    case UPDATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedEditingFood)) {
        return null;
      }
      return state;
    case SET_EDITING_FOOD:
      return action.listId;
    default:
      return state;
  }
};

const requestedEditingFood = (state = null, action, { requestedEditingFood }) => {
  switch (action.type) {
    case UPDATE_FOOD_REQUEST:
      return action.food;
    case UPDATE_FOOD_SUCCESS:
      if (isEqual(action.food, requestedEditingFood)) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const newFood = (state = null, action, { requestedNewFood }) => {
  switch (action.type) {
    case CANCEL_NEW_FOOD:
      return null;
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
    case CANCEL_NEW_FOOD:
      return null;
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

const foodListError = (state = null, action, { requestedListId, requestedEditingFood, requestedNewFood, query }) => {
  switch (action.type) {
    case CREATE_FOOD_REQUEST:
    case DELETE_FOOD_REQUEST:
    case FETCH_FOOD_SEARCH_RESULTS_REQUEST:
    case FETCH_FOODS_REQUEST:
    case UPDATE_FOOD_REQUEST:
      return null;
    case CREATE_FOOD_FAILURE:
      if (isEqual(action.food, requestedNewFood)) {
        if (action.err.message) {
          return [`Error creating food: ${action.err.message}`];
        }
        return action.err;
      }
      return state;
    case DELETE_FOOD_FAILURE:
      return [`Error deleting food: ${action.err.message}`];
    case FETCH_FOOD_SEARCH_RESULTS_FAILURE:
      if (action.query === query) {
        return [`Error fetching foods for query="${action.query}": ${action.err.message}`];
      }
      return state;
    case FETCH_FOODS_FAILURE:
      if (action.listId === requestedListId) {
        return [`Error fetching foods for list_id=${action.listId}: ${action.err.message}`];
      }
      return state;
    case UPDATE_FOOD_FAILURE:
      if (isEqual(action.food, requestedEditingFood)) {
        if (action.err.message) {
          return [`Error updating food: ${action.err.message}`];
        }
        return action.err;
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

export const foodList = (state = {}, action) => {
  return {
    foods: foods(state.foods, action, { requestedListId: state.requestedListId, query: state.query }),
    editingFood: editingFood(state.editingFood, action, { requestedEditingFood: state.requestedEditingFood }),
    editingFoodListId: editingFoodListId(state.editingFoodListId, action, { requestedEditingFood: state.requestedEditingFood }),
    editingFoods: editingFoods(state.editingFoods, action),
    newFood: newFood(state.newFood, action, { requestedNewFood: state.requestedNewFood }),
    newFoodListId: newFoodListId(state.newFoodListId, action, { requestedNewFood: state.requestedNewFood }),
    requestedEditingFood: requestedEditingFood(state.requestedEditingFood, action, { requestedEditingFood: state.requestedEditingFood }),
    requestedNewFood: requestedNewFood(state.requestedNewFood, action, { requestedNewFood: state.requestedNewFood }),
    error: foodListError(state.error, action, { requestedListId: state.requestedListId, requestedEditingFood: state.requestedEditingFood, requestedNewFood: state.requestedNewFood, query: state.query }),
    requestedListId: requestedListId(state.requestedListId, action),
    query: query(state.query, action),
  };
};
