import {
  selectActiveListId,
} from '../actions';
import { listMenu } from './listMenu';
import lists from '../__mocks__/lists.json';

describe('listMenu state', () => {
  it('is correct initially', () => {
    const initialState = {
      lists: [],
      activeListId: 'all',
    };
    expect(listMenu(undefined, {})).toEqual(initialState);
  });

  describe('SELECT_ACTIVE_LIST_ID', () => {
    it('updates the active list ID', () => {
      const initialListMenu = {
        lists: [],
        activeListId: null,
      };
      const action = selectActiveListId(lists[0].id);
      const activeListIdState = {
        lists: [],
        activeListId: lists[0].id,
      };
      expect(listMenu(initialListMenu, action)).toEqual(activeListIdState);
    });
  });
});
