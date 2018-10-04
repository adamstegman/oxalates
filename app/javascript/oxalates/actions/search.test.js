import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { search } from './search';

const mockStore = configureMockStore([thunk]);

describe('search', () => {
  beforeEach(() => {
    fetchMock.mock('*', { body: { foods: [] } });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches SET_SEARCH_QUERY and fetchFoodSearchResults actions', () => {
    const expectedActions = [
      { type: 'SET_SEARCH_QUERY', query: 'test' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_REQUEST', query: 'test' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_SUCCESS', foods: [] },
    ];
    const store = mockStore({ foodList: { query: '' } });
    return store.dispatch(search('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
