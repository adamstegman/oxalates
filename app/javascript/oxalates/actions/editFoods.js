export const SET_EDITING_FOODS = 'SET_EDITING_FOODS';
export const setEditingFoods = editingFoods => ({
  type: SET_EDITING_FOODS,
  editingFoods,
});

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
