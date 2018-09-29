import { selectActiveListId } from './active-list';
import configureMockStore from 'redux-mock-store';
import lists from '../lists.json';

const mockStore = configureMockStore();

test('selectActiveListId creates a SELECT_ACTIVE_LIST action', () => {
  expect(selectActiveListId(1)).toEqual({
    type: 'SELECT_ACTIVE_LIST',
    activeListId: 1,
  });
});
