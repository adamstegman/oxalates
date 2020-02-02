import { fetchFoods } from '../actions';

export const SET_EDITING_FOOD = 'SET_EDITING_FOOD';
export const setEditingFood = (food, listId) => ({
  type: SET_EDITING_FOOD,
  food,
  listId,
});

export const SET_EDITING_FOODS = 'SET_EDITING_FOODS';
export const setEditingFoods = editingFoods => ({
  type: SET_EDITING_FOODS,
  editingFoods,
});

export const doneEditingFoods = () => {
  return dispatch => {
    dispatch(setEditingFoods(false));
    dispatch(setEditingFood(null, null));
  };
};

export const DELETE_FOOD_REQUEST = 'DELETE_FOOD_REQUEST';
export const deleteFoodRequest = food => ({
  type: DELETE_FOOD_REQUEST,
  food,
});

export const DELETE_FOOD_SUCCESS = 'DELETE_FOOD_SUCCESS';
export const deleteFoodSuccess = food => ({
  type: DELETE_FOOD_SUCCESS,
  food,
});

export const DELETE_FOOD_FAILURE = 'DELETE_FOOD_FAILURE';
export const deleteFoodFailure = (food, err) => ({
  type: DELETE_FOOD_FAILURE,
  food,
  err,
});

const FOODS_URL = '/foods';
export const deleteFood = (password, food) => {
  return dispatch => {
    dispatch(deleteFoodRequest(food));
    const request = { password };
    return fetch(`${FOODS_URL}/${food.id}`, {
      method: 'DELETE',
      body: JSON.stringify(request),
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        dispatch(deleteFoodSuccess(food));
        return;
      }
      throw new Error(`Expected OK response, got code=${response.status}`);
    }).catch(err => {
      dispatch(deleteFoodFailure(food, err));
    });
  };
};

export const UPDATE_FOOD_REQUEST = 'UPDATE_FOOD_REQUEST';
export const updateFoodRequest = (food, listId) => {
  return {
    type: UPDATE_FOOD_REQUEST,
    listId,
    food,
  };
};

export const UPDATE_FOOD_SUCCESS = 'UPDATE_FOOD_SUCCESS';
export const updateFoodSuccess = (food, listId) => {
  return {
    type: UPDATE_FOOD_SUCCESS,
    listId,
    food,
  };
};

export const UPDATE_FOOD_FAILURE = 'UPDATE_FOOD_FAILURE';
export const updateFoodFailure = (food, err) => {
  return {
    type: UPDATE_FOOD_FAILURE,
    food,
    err,
  };
};

export const updateFood = (password, food, listId) => {
  return dispatch => {
    dispatch(updateFoodRequest(food, listId));
    let updatedFood = Object.assign({}, food);
    updatedFood.oxalate_mg = food.oxalateMg;
    delete updatedFood.oxalateMg;
    const request = { food: updatedFood, password };
    return fetch(`${FOODS_URL}/${food.id}`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        dispatch(updateFoodSuccess(food, listId));
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
      dispatch(updateFoodFailure(food, err));
    });
  };
};
