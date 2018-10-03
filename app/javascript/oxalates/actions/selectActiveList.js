import { fetchFoods } from './fetchFoods';

export const SELECT_ACTIVE_LIST_ID = 'SELECT_ACTIVE_LIST_ID';
export const selectActiveListId = activeListId => {
  return {
    type: SELECT_ACTIVE_LIST_ID,
    activeListId,
  };
};
export const selectActiveList = (activeListId) => {
  return dispatch => {
    dispatch(selectActiveListId(activeListId));
    return dispatch(fetchFoods(activeListId));
  };
};
