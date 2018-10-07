import {
  authenticateFailure,
  authenticateSuccess,
  fetchFoodSearchResultsFailure,
  fetchFoodSearchResultsRequest,
  fetchFoodSearchResultsSuccess,
  fetchFoodsFailure,
  fetchFoodsRequest,
  fetchFoodsSuccess,
  selectActiveListId,
  setAuthenticating,
  setPassword,
  setSearchQuery,
 } from './actions';
import oxalates from './reducers';
import responseFoods from './__mocks__/response-foods.json';
import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';

test('initial state is correct', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: 'all',
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
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
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
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
      requestedListId: lists[0].id,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
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
      requestedListId: 1,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = fetchFoodsSuccess(1, { foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(foodsState);
});

test('FETCH_FOODS_SUCCESS does not update the foods if the activeListId has changed', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: 1,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = fetchFoodsSuccess(2, { foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: 1,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
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
      requestedListId: lists[0].id,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
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
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});

test('FETCH_FOODS_FAILURE is ignored if a new list was requested', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: lists[0].id,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const err = new Error('some error');
  const action = fetchFoodsFailure(lists[1].id, err);
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: lists[0].id,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
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
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
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
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(activeListIdState);
});

test('FETCH_FOOD_SEARCH_RESULTS_REQUEST indicates a loading state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: {},
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = fetchFoodSearchResultsRequest('test');
  const emptyFoodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(emptyFoodsState);
});

test('FETCH_FOOD_SEARCH_RESULTS_SUCCESS updates the foods', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = fetchFoodSearchResultsSuccess('test', { foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: null,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(foodsState);
});

test('FETCH_FOOD_SEARCH_RESULTS_SUCCESS does not update the foods if the search query has changed', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test2',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = fetchFoodSearchResultsSuccess('test', { foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test2',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(foodsState);
});

test('FETCH_FOOD_SEARCH_RESULTS_FAILURE indicates an error state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const err = new Error('some error');
  const action = fetchFoodSearchResultsFailure('test', err);
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: `Error fetching foods for query="test": some error`,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});

test('FETCH_FOOD_SEARCH_RESULTS_FAILURE is ignored if the query was changed', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test2',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const err = new Error('some error');
  const action = fetchFoodSearchResultsFailure('test', err);
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test2',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});

test('SET_SEARCH_QUERY updates the food search query', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = setSearchQuery('test');
  const queryState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: 'test',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(queryState);
});

test('SET_AUTHENTICATING updates authenticating status', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  const action = setAuthenticating(true);
  const authenticatingState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: '',
    },
  };
  expect(oxalates(initialState, action)).toEqual(authenticatingState);
});

test('SET_PASSWORD updates password', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: 'some error',
      password: '',
    },
  };
  const action = setPassword('password');
  const passwordState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: 'password',
    },
  };
  expect(oxalates(initialState, action)).toEqual(passwordState);
});

test('AUTHENTICATE_SUCCESS updates authenticating status', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password',
    },
  };
  const action = authenticateSuccess('password');
  const authenticatedState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: true,
      authenticating: false,
      error: null,
      password: 'password',
    },
  };
  expect(oxalates(initialState, action)).toEqual(authenticatedState);
});

test('AUTHENTICATE_SUCCESS is ignored if the password has changed', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password2',
    },
  };
  const action = authenticateSuccess('password');
  const authenticatedState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password2',
    },
  };
  expect(oxalates(initialState, action)).toEqual(authenticatedState);
});

test('AUTHENTICATE_FAILURE indicates an error state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password',
    },
  };
  const action = authenticateFailure('password', 'some error');
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: 'some error',
      password: 'password',
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});

test('AUTHENTICATE_FAILURE is ignored if the password has changed', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password2',
    },
  };
  const action = authenticateFailure('password', 'some error');
  const failureState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods: [],
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: true,
      error: null,
      password: 'password2',
    },
  };
  expect(oxalates(initialState, action)).toEqual(failureState);
});
