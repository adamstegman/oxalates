export const FETCH_FOOD_SEARCH_RESULTS_REQUEST = 'FETCH_FOOD_SEARCH_RESULTS_REQUEST';
export const fetchFoodSearchResultsRequest = query => {
  return {
    type: FETCH_FOOD_SEARCH_RESULTS_REQUEST,
    query,
  };
};

export const FETCH_FOOD_SEARCH_RESULTS_SUCCESS = 'FETCH_FOOD_SEARCH_RESULTS_SUCCESS';
export const fetchFoodSearchResultsSuccess = (query, response) => {
  const foods = response.foods.map(food => {
    const newFood = Object.assign({}, food);
    newFood.oxalateMg = food.oxalate_mg;
    delete newFood.oxalate_mg;
    return newFood;
  });
  return {
    type: FETCH_FOOD_SEARCH_RESULTS_SUCCESS,
    query,
    foods,
  };
};

export const FETCH_FOOD_SEARCH_RESULTS_FAILURE = 'FETCH_FOOD_SEARCH_RESULTS_FAILURE';
export const fetchFoodSearchResultsFailure = (query, err) => {
  return {
    type: FETCH_FOOD_SEARCH_RESULTS_FAILURE,
    query,
    err,
  };
};

const SEARCH_URL = '/search';
const QUERY_PARAM = 'search';
export const fetchFoodSearchResults = query => {
  return dispatch => {
    dispatch(fetchFoodSearchResultsRequest(query));
    return fetch(`${SEARCH_URL}?${QUERY_PARAM}=${query}`, {
      headers: { 'accept': 'application/json' },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Expected OK response, got code=${response.status}`);
    }).then(response => {
      dispatch(fetchFoodSearchResultsSuccess(query, response));
    }).catch(err => {
      dispatch(fetchFoodSearchResultsFailure(query, err));
    });
  };
};
