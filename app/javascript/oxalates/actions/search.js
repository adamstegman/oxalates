import { fetchFoodSearchResults } from './fetchFoodSearchResults';

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const setSearchQuery = query => {
  return {
    type: SET_SEARCH_QUERY,
    query,
  };
};
export const search = query => {
  return dispatch => {
    dispatch(setSearchQuery(query));
    return dispatch(fetchFoodSearchResults(query));
  };
};
