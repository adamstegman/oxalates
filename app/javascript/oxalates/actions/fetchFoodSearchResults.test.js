import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import responseFoods from '../__mocks__/response-foods.json';
import foods from '../__mocks__/foods.json';
import { fetchFoodSearchResults } from './fetchFoodSearchResults';

const mockStore = configureMockStore([thunk]);

describe('fetchFoodSearchResults', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches search results for the given query and dispatches a success event with the response', () => {
    fetchMock.getOnce({
      matcher: '/search?search=test',
      headers: { 'accept': 'application/json' },
      response: {
        body: { foods: responseFoods },
        headers: { 'content-type': 'application/json' },
      },
    });

    const expectedActions = [
      { type: 'FETCH_FOOD_SEARCH_RESULTS_REQUEST', query: 'test' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_SUCCESS', foods },
    ];
    const store = mockStore({ foodList: { foods: [], query: 'test' } });
    return store.dispatch(fetchFoodSearchResults('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on unsuccessful response', () => {
    fetchMock.getOnce({
      matcher: '/search?search=test2',
      headers: { 'accept': 'application/json' },
      response: {
        status: 500,
        body: 'Some server error',
      },
    });

    const err = new Error('Expected OK response, got code=500');
    const expectedActions = [
      { type: 'FETCH_FOOD_SEARCH_RESULTS_REQUEST', query: 'test2' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_FAILURE', query: 'test2', err },
    ];
    const store = mockStore({ foodList: { foods: [], query: 'test' } });
    return store.dispatch(fetchFoodSearchResults('test2')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.getOnce({
      matcher: '/search?search=test3',
      headers: { 'accept': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'FETCH_FOOD_SEARCH_RESULTS_REQUEST', query: 'test3' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_FAILURE', query: 'test3', err },
    ];
    const store = mockStore({ foodList: { foods: [], query: 'test3' } });
    return store.dispatch(fetchFoodSearchResults('test3')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
