import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  deleteFood,
  setEditingFoods,
} from './editFoods';

const mockStore = configureMockStore([thunk]);
const food = { id: 1 };

test('setEditingFoods dispatches SET_EDITING_FOODS action', () => {
  expect(setEditingFoods(true)).toEqual({
    type: 'SET_EDITING_FOODS',
    editingFoods: true,
  });
});

describe('deleteFood', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('deletes the food', () => {
    fetchMock.deleteOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 204,
      },
    });

    const expectedActions = [
      { type: 'DELETE_FOOD_REQUEST', food },
      { type: 'DELETE_FOOD_SUCCESS', food },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(deleteFood('password', food)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on server failure', () => {
    fetchMock.deleteOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 500,
        body: 'some server error',
      },
    });

    const err = new Error('Expected OK response, got code=500');
    const expectedActions = [
      { type: 'DELETE_FOOD_REQUEST', food },
      { type: 'DELETE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(deleteFood('password', food)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.deleteOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'DELETE_FOOD_REQUEST', food },
      { type: 'DELETE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [] } });
    return store.dispatch(deleteFood('password', food)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
