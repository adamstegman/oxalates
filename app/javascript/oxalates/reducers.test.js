import { selectActiveListId } from './actions';
import oxalates from './reducers';
import lists from './lists.json';

test('initial state has no lists', () => {
  const initialState = {
    lists: [],
    activeListId: null,
  };
  expect(oxalates(undefined, {})).toEqual(initialState);
});

test('SELECT_ACTIVE_LIST updates the active list ID', () => {
  const initialState = {
    lists: [],
    activeListId: null,
  };
  const action = selectActiveListId(lists[0].id);
  const activeListIdState = {
    lists: [],
    activeListId: lists[0].id,
  };
  expect(oxalates(initialState, action)).toEqual(activeListIdState);
});
