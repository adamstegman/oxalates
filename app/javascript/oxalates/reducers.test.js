import {
  fetchFoodsFailure,
  fetchFoodsRequest,
  fetchFoodsSuccess,
  selectActiveListId,
 } from './actions';
import oxalates from './reducers';
import responseFoods from '../../../__mocks__/response-foods.json';
import foods from '../../../__mocks__/foods.json';
import lists from '../../../__mocks__/lists.json';

test('initial state has no lists', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: 'all',
    },
    foodList: {
      foods: [],
      error: null,
    },
  };
  expect(oxalates(undefined, {})).toEqual(initialState);
});

test('FETCH_FOODS_REQUEST indicates a loading state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: {},
    }
  };
  const action = fetchFoodsRequest(lists[0].id);
  const emptyFoodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
    }
  };
  expect(oxalates(initialState, action)).toEqual(emptyFoodsState);
});

test('FETCH_FOODS_SUCCESS updates the foods', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
    },
  };
  const action = fetchFoodsSuccess({ foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: null,
    },
  };
  expect(oxalates(initialState, action)).toEqual(foodsState);
});

test('FETCH_FOODS_FAILURE indicates an error state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
    },
  };
  const err = new Error('some error');
  const action = fetchFoodsFailure(lists[0].id, err);
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: `Error fetching foods for list_id=${lists[0].id}: some error`,
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});

test('SELECT_ACTIVE_LIST_ID updates the active list ID', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
    },
  };
  const action = selectActiveListId(lists[0].id);
  const activeListIdState = {
    listMenu: {
      lists: [],
      activeListId: lists[0].id,
    },
    foodList: {
      foods: [],
      error: null,
    },
  };
  expect(oxalates(initialState, action)).toEqual(activeListIdState);
});
