import { fetchFoods } from '../actions';

export const SET_NEW_FOOD = 'SET_NEW_FOOD';
export const setNewFood = (listId, food = {}) => {
  return {
    type: SET_NEW_FOOD,
    listId,
    food,
  };
};

export const CANCEL_NEW_FOOD = 'CANCEL_NEW_FOOD';
export const cancelNewFood = () => ({
  type: CANCEL_NEW_FOOD,
});

export const CREATE_FOOD_REQUEST = 'CREATE_FOOD_REQUEST';
export const createFoodRequest = (food, listId) => {
  return {
    type: CREATE_FOOD_REQUEST,
    listId,
    food,
  };
};

export const CREATE_FOOD_SUCCESS = 'CREATE_FOOD_SUCCESS';
export const createFoodSuccess = (food, listId) => {
  return {
    type: CREATE_FOOD_SUCCESS,
    listId,
    food,
  };
};

export const CREATE_FOOD_FAILURE = 'CREATE_FOOD_FAILURE';
export const createFoodFailure = (food, err) => {
  return {
    type: CREATE_FOOD_FAILURE,
    food,
    err,
  };
};

const FOODS_URL = '/foods';
export const createFood = (password, food, listId) => {
  return dispatch => {
    dispatch(createFoodRequest(food, listId));
    let newFood = Object.assign({}, food);
    newFood.oxalate_mg = food.oxalateMg;
    delete newFood.oxalateMg;
    const request = { food: newFood, password };
    return fetch(FOODS_URL, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        dispatch(createFoodSuccess(food, listId));
        dispatch(fetchFoods(listId));
        return;
      }

      if (response.status === 422) {
        return response.json().then(errorResponse => {
          throw errorResponse.errors;
        });
      }

      throw new Error(`Expected OK response, got code=${response.status}`);
    }).catch(err => {
      dispatch(createFoodFailure(food, err));
    });
  };
};
