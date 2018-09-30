export const FETCH_FOODS_REQUEST = 'FETCH_FOODS_REQUEST';
export const fetchFoodsRequest = listId => {
  return {
    type: FETCH_FOODS_REQUEST,
    listId,
  };
};

export const FETCH_FOODS_SUCCESS = 'FETCH_FOODS_SUCCESS';
export const fetchFoodsSuccess = response => {
  const foods = response.foods.map(food => {
    const newFood = Object.assign({}, food);
    newFood.oxalateMg = food.oxalate_mg;
    delete newFood.oxalate_mg;
    return newFood;
  });
  return {
    type: FETCH_FOODS_SUCCESS,
    foods,
  };
};

export const FETCH_FOODS_FAILURE = 'FETCH_FOODS_FAILURE';
export const fetchFoodsFailure = (listId, err) => {
  return {
    type: FETCH_FOODS_FAILURE,
    listId,
    err,
  };
};

const FOODS_URL = '/foods';
const LIST_ID_PARAM = 'list_id';
export const fetchFoods = (listId) => {
  return dispatch => {
    dispatch(fetchFoodsRequest(listId));
    return fetch(`${FOODS_URL}?${LIST_ID_PARAM}=${listId}`, {
      headers: { 'accept': 'application/json' },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Expected OK response, got code=${response.status}`);
    }).then(response => {
      dispatch(fetchFoodsSuccess(response));
    }).catch(err => {
      dispatch(fetchFoodsFailure(listId, err));
    });
  };
};
