export const SELECT_ACTIVE_LIST = 'SELECT_ACTIVE_LIST';
export const selectActiveListId = activeListId => {
  return {
    type: SELECT_ACTIVE_LIST,
    activeListId,
  };
};
