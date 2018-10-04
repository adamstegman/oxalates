import {
  fetchFoodSearchResultsFailure,
  fetchFoodSearchResultsRequest,
  fetchFoodSearchResultsSuccess,
  fetchFoodsFailure,
  fetchFoodsRequest,
  fetchFoodsSuccess,
  selectActiveListId,
  setSearchQuery,
 } from './actions';
import oxalates from './reducers';
import responseFoods from './__mocks__/response-foods.json';
import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';

test('initial state has no lists', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: 'all',
    },
    foodList: {
      foods: [],
      error: null,
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: '',
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
      query: 'test',
    }
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
      query: 'test',
    }
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
      query: 'test',
    },
  };
  const action = fetchFoodSearchResultsSuccess({ foods: responseFoods });
  const foodsState = {
    listMenu: {
      lists: [],
      activeListId: null,
    },
    foodList: {
      foods,
      error: null,
      query: 'test',
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
      query: 'test',
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
      query: 'test',
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
      query: '',
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
      query: 'test',
    },
  };
  expect(oxalates(initialState, action)).toEqual(queryState);
});
