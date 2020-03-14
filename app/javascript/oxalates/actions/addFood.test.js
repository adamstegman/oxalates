import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  setNewFood,
  cancelNewFood,
  createFood,
} from './addFood';
import responseFoods from '../__mocks__/response-foods.json';

const mockStore = configureMockStore([thunk]);

test('setNewFood starts a new food', () => {
  expect(setNewFood(1)).toEqual({
    type: 'SET_NEW_FOOD',
    listId: 1,
    food: {},
  });
});

test('setNewFood sets the in-progress new food', () => {
  expect(setNewFood(1, { name: 'test' })).toEqual({
    type: 'SET_NEW_FOOD',
    listId: 1,
    food: { name: 'test' },
  });
});

test('cancelNewFood cancels the new food', () => {
  expect(cancelNewFood()).toEqual({
    type: 'CANCEL_NEW_FOOD',
  });
});

describe('createFood', () => {
  const food = { name: 'new food', oxalateMg: 10.0, serving: 'serving' };
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates the new food and fetches foods for the active list', () => {
    fetchMock.postOnce({
      matcher: (url, opts) => {
        const request = JSON.parse(opts.body);
        const newFood = request.food;
        return (
          url === '/foods' &&
          request.password === 'password' &&
          newFood.name === food.name &&
          newFood.oxalate_mg === food.oxalateMg &&
          newFood.serving === food.serving
        )
      },
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {},
    });
    fetchMock.getOnce({
      matcher: '/foods?list_id=1',
      headers: { 'accept': 'application/json' },
      response: {
        body: { foods: responseFoods },
        headers: { 'content-type': 'application/json' },
      },
    });

    const expectedActions = [
      { type: 'CREATE_FOOD_REQUEST', listId: 1, food },
      { type: 'CREATE_FOOD_SUCCESS', listId: 1, food },
      { type: 'FETCH_FOODS_REQUEST', listId: 1 },
    ];
    const store = mockStore({ foodList: { foods: [], newFood: food } });
    return store.dispatch(createFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on unsuccessful response', () => {
    fetchMock.postOnce({
      matcher: '/foods',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 422,
        body: JSON.stringify({ errors: ['error 1', 'error 2'] }),
      },
    });

    const err = ['error 1', 'error 2'];
    const expectedActions = [
      { type: 'CREATE_FOOD_REQUEST', listId: 1, food },
      { type: 'CREATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], newFood: food } });
    return store.dispatch(createFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on server failure', () => {
    fetchMock.postOnce({
      matcher: '/foods',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 500,
        body: 'some server error',
      },
    });

    const err = new Error('Expected OK response, got code=500');
    const expectedActions = [
      { type: 'CREATE_FOOD_REQUEST', listId: 1, food },
      { type: 'CREATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], newFood: food } });
    return store.dispatch(createFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.postOnce({
      matcher: '/foods',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'CREATE_FOOD_REQUEST', listId: 1, food },
      { type: 'CREATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], newFood: food } });
    return store.dispatch(createFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
