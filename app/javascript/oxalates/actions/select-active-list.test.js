import { selectActiveList } from './select-active-list';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('selectActiveList', () => {
  beforeEach(() => {
    fetchMock.mock('*', { body: { foods: [] } });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches SELECT_ACTIVE_LIST_ID and fetchFoods actions', () => {
    const expectedActions = [
      { type: 'SELECT_ACTIVE_LIST_ID', activeListId: 1 },
      { type: 'FETCH_FOODS_REQUEST', listId: 1 },
      { type: 'FETCH_FOODS_SUCCESS', foods: [] },
    ];
    const store = mockStore({ listMenu: { activeListId: 'all' } });
    return store.dispatch(selectActiveList(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
