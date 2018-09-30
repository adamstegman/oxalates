import { fetchFoods } from './fetch-foods';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import responseFoods from '../../../../__mocks__/response-foods.json';
import foods from '../../../../__mocks__/foods.json';

const mockStore = configureMockStore([thunk]);

describe('fetchFoods', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches foods for the given list and dispatches a success event with the response', () => {
    fetchMock.getOnce({
      matcher: '/foods?list_id=1',
      headers: { 'accept': 'application/json' },
      response: {
        body: { foods: responseFoods },
        headers: { 'content-type': 'application/json' },
      },
    });

    const expectedActions = [
      { type: 'FETCH_FOODS_REQUEST', listId: 1 },
      { type: 'FETCH_FOODS_SUCCESS', foods },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(fetchFoods(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on unsuccessful response', () => {
    fetchMock.getOnce({
      matcher: '/foods?list_id=2',
      headers: { 'accept': 'application/json' },
      response: {
        status: 500,
        body: 'Some server error',
      },
    });

    const err = new Error('Expected OK response, got code=500');
    const expectedActions = [
      { type: 'FETCH_FOODS_REQUEST', listId: 2 },
      { type: 'FETCH_FOODS_FAILURE', listId: 2, err },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(fetchFoods(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.getOnce({
      matcher: '/foods?list_id=3',
      headers: { 'accept': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'FETCH_FOODS_REQUEST', listId: 3 },
      { type: 'FETCH_FOODS_FAILURE', listId: 3, err },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(fetchFoods(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
