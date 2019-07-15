import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  deleteFood,
  doneEditingFoods,
  setEditingFood,
  setEditingFoods,
  updateFood,
} from './editFoods';
import responseFoods from '../__mocks__/response-foods.json';

const mockStore = configureMockStore([thunk]);
const food = { id: 1, name: 'new food', oxalateMg: 10.0, serving: 'serving' };

test('setEditingFood dispatches SET_EDITING_FOOD action', () => {
  expect(setEditingFood({ id: 1 }, 1)).toEqual({
    type: 'SET_EDITING_FOOD',
    food: { id: 1 },
    listId: 1,
  });
});

test('setEditingFoods dispatches SET_EDITING_FOODS action', () => {
  expect(setEditingFoods(true)).toEqual({
    type: 'SET_EDITING_FOODS',
    editingFoods: true,
  });
});

test('doneEditingFoods dispatches setEditingFoods, setEditingFood actions', () => {
  const expectedActions = [
    { type: 'SET_EDITING_FOODS', editingFoods: false },
    { type: 'SET_EDITING_FOOD', food: null, listId: null },
  ];
  const store = mockStore({ foodList: { foods: [] } });
  store.dispatch(doneEditingFoods());
  expect(store.getActions()).toEqual(expectedActions);
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

describe('updateFood', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('updates the food', () => {
    fetchMock.patchOnce({
      matcher: (url, opts) => {
        const request = JSON.parse(opts.body);
        const updatedFood = request.food;
        return (
          url === '/foods/1' &&
          request.password === 'password' &&
          updatedFood.name === food.name &&
          updatedFood.oxalate_mg === food.oxalateMg &&
          updatedFood.serving === food.serving
        )
      },
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 204,
      },
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
      { type: 'UPDATE_FOOD_REQUEST', listId: 1, food },
      { type: 'UPDATE_FOOD_SUCCESS', listId: 1, food },
      { type: 'FETCH_FOODS_REQUEST', listId: 1 },
    ];
    const store = mockStore({ foodList: { foods: [], editingFood: food } });
    return store.dispatch(updateFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on unsuccessful response', () => {
    fetchMock.patchOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 422,
        body: JSON.stringify({ errors: ['error 1', 'error 2'] }),
      },
    });

    const err = ['error 1', 'error 2'];
    const expectedActions = [
      { type: 'UPDATE_FOOD_REQUEST', listId: 1, food },
      { type: 'UPDATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], editingFood: food } });
    return store.dispatch(updateFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on server failure', () => {
    fetchMock.patchOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {
        status: 500,
        body: 'some server error',
      },
    });

    const err = new Error('Expected OK response, got code=500');
    const expectedActions = [
      { type: 'UPDATE_FOOD_REQUEST', listId: 1, food },
      { type: 'UPDATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], editingFood: food } });
    return store.dispatch(updateFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.patchOnce({
      matcher: '/foods/1',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'UPDATE_FOOD_REQUEST', listId: 1, food },
      { type: 'UPDATE_FOOD_FAILURE', food, err },
    ];
    const store = mockStore({ foodList: { foods: [], editingFood: food } });
    return store.dispatch(updateFood('password', food, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
