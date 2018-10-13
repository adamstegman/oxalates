import {
  authenticateFailure,
  authenticateSuccess,
  createFoodFailure,
  createFoodRequest,
  createFoodSuccess,
  fetchFoodSearchResultsFailure,
  fetchFoodSearchResultsRequest,
  fetchFoodSearchResultsSuccess,
  fetchFoodsFailure,
  fetchFoodsRequest,
  fetchFoodsSuccess,
  selectActiveListId,
  setAuthenticating,
  setNewFood,
  setPassword,
  setSearchQuery,
 } from './actions';
import oxalates from './reducers';
import responseFoods from './__mocks__/response-foods.json';
import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';

describe('oxalates state', () => {
  it('is correct initially', () => {
    const initialState = {
      listMenu: {
        lists: [],
        activeListId: 'all',
      },
      foodList: {
        foods: [],
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
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

  describe('listMenu', () => {
    describe('SELECT_ACTIVE_LIST_ID', () => {
      it('updates the active list ID', () => {
        const listMenu = {
          lists: [],
          activeListId: null,
        };
        const action = selectActiveListId(lists[0].id);
        const activeListIdState = {
          lists: [],
          activeListId: lists[0].id,
        };
        expect(oxalates({ listMenu }, action).listMenu).toEqual(activeListIdState);
      });
    });
  });

  describe('foodList', () => {
    describe('CREATE_FOOD_REQUEST', () => {
      it('indicates a loading state', () => {
        const newFood = { name: 'food' };
        const foodList = {
          foods: [],
          newFood,
          newFoodListId: null,
          requestedNewFood: null,
          error: {},
          requestedListId: null,
          query: '',
        };
        const action = createFoodRequest(newFood, lists[0].id);
        const createFoodState = {
          foods: [],
          newFood,
          newFoodListId: null,
          requestedNewFood: newFood,
          error: null,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(createFoodState);
      });
    });

    describe('CREATE_FOOD_SUCCESS', () => {
      it('updates the new food', () => {
        const newFood = { name: 'food' };
        const foodList = {
          foods: [],
          newFood,
          newFoodListId: lists[0].id,
          requestedNewFood: newFood,
          error: null,
          requestedListId: null,
          query: '',
        };
        const action = createFoodSuccess(newFood, 1);
        const foodsState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(foodsState);
      });

      it('does not update the foods if the requestedNewFood has changed', () => {
        const newFood = { name: 'food' };
        const newFood2 = { name: 'food2' };
        const foodList = {
          foods: [],
          newFood: newFood2,
          newFoodListId: lists[0].id,
          requestedNewFood: newFood2,
          error: null,
          requestedListId: null,
          query: '',
        };
        const action = createFoodSuccess(newFood, 2);
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('CREATE_FOOD_FAILURE', () => {
      it('indicates an error state', () => {
        const newFood = { name: 'food' };
        const foodList = {
          foods: [],
          newFood,
          newFoodListId: null,
          requestedNewFood: newFood,
          error: null,
          requestedListId: null,
          query: '',
        };
        const err = new Error('some error');
        const action = createFoodFailure(newFood, err);
        const failureState = {
          foods: [],
          newFood,
          newFoodListId: null,
          requestedNewFood: newFood,
          error: `Error creating food: some error`,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(failureState);
      });

      it('is ignored if a new food was submitted', () => {
        const newFood = { name: 'food' };
        const newFood2 = { name: 'food2' };
        const foodList = {
          foods: [],
          newFood: newFood2,
          newFoodListId: null,
          requestedNewFood: newFood2,
          error: null,
          requestedListId: null,
          query: '',
        };
        const err = new Error('some error');
        const action = createFoodFailure(newFood, err);
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('FETCH_FOODS_REQUEST', () => {
      it('indicates a loading state', () => {
        const foodList = {
          foods,
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: {},
          requestedListId: null,
          query: '',
        };
        const action = fetchFoodsRequest(lists[0].id);
        const emptyFoodsState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: lists[0].id,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(emptyFoodsState);
      });
    });

    describe('FETCH_FOODS_SUCCESS', () => {
      it('updates the foods', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: 1,
          query: '',
        };
        const action = fetchFoodsSuccess(1, { foods: responseFoods });
        const foodsState = {
          foods,
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(foodsState);
      });

      it('does not update the foods if the requestedListId has changed', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: 1,
          query: '',
        };
        const action = fetchFoodsSuccess(2, { foods: responseFoods });
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('FETCH_FOODS_FAILURE', () => {
      it('indicates an error state', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: lists[0].id,
          query: '',
        };
        const err = new Error('some error');
        const action = fetchFoodsFailure(lists[0].id, err);
        const failureState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: `Error fetching foods for list_id=${lists[0].id}: some error`,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(failureState);
      });

      it('is ignored if a new list was requested', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: lists[0].id,
          query: '',
        };
        const err = new Error('some error');
        const action = fetchFoodsFailure(lists[1].id, err);
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('FETCH_FOOD_SEARCH_RESULTS_REQUEST', () => {
      it('indicates a loading state', () => {
        const foodList = {
          foods,
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: {},
          requestedListId: null,
          query: 'test',
        };
        const action = fetchFoodSearchResultsRequest('test');
        const emptyFoodsState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(emptyFoodsState);
      });
    });

    describe('FETCH_FOOD_SEARCH_RESULTS_SUCCESS', () => {
      it('updates the foods', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test',
        };
        const action = fetchFoodSearchResultsSuccess('test', { foods: responseFoods });
        const foodsState = {
          foods,
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(foodsState);
      });

      it('does not update the foods if the search query has changed', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test2',
        };
        const action = fetchFoodSearchResultsSuccess('test', { foods: responseFoods });
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('FETCH_FOOD_SEARCH_RESULTS_FAILURE', () => {
      it('indicates an error state', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test',
        };
        const err = new Error('some error');
        const action = fetchFoodSearchResultsFailure('test', err);
        const failureState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: `Error fetching foods for query="test": some error`,
          requestedListId: null,
          query: 'test',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(failureState);
      });

      it('is ignored if the query was changed', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test2',
        };
        const err = new Error('some error');
        const action = fetchFoodSearchResultsFailure('test', err);
        expect(oxalates({ foodList }, action).foodList).toEqual(foodList);
      });
    });

    describe('SET_SEARCH_QUERY', () => {
      it('updates the food search query', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        const action = setSearchQuery('test');
        const queryState = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: 'test',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(queryState);
      });
    });

    describe('SET_NEW_FOOD', () => {
      it('starts a new food', () => {
        const foodList = {
          foods: [],
          newFood: null,
          newFoodListId: null,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        const action = setNewFood(lists[0].id);
        const queryState = {
          foods: [],
          newFood: {},
          newFoodListId: lists[0].id,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(queryState);
      });

      it('updates the new food', () => {
        const foodList = {
          foods: [],
          newFood: {},
          newFoodListId: lists[0].id,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        const action = setNewFood(lists[0].id, { name: 'test' });
        const queryState = {
          foods: [],
          newFood: { name: 'test' },
          newFoodListId: lists[0].id,
          requestedNewFood: null,
          error: null,
          requestedListId: null,
          query: '',
        };
        expect(oxalates({ foodList }, action).foodList).toEqual(queryState);
      });
    });
  });

  describe('session', () => {
    describe('SET_AUTHENTICATING', () => {
      it('updates authenticating status', () => {
        const session = {
          authenticated: false,
          authenticating: false,
          error: null,
          password: '',
        };
        const action = setAuthenticating(true);
        const authenticatingState = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: '',
        };
        expect(oxalates({ session }, action).session).toEqual(authenticatingState);
      });
    });

    describe('SET_PASSWORD', () => {
      it('updates password', () => {
        const session = {
          authenticated: false,
          authenticating: false,
          error: 'some error',
          password: '',
        };
        const action = setPassword('password');
        const passwordState = {
          authenticated: false,
          authenticating: false,
          error: null,
          password: 'password',
        };
        expect(oxalates({ session }, action).session).toEqual(passwordState);
      });
    });

    describe('AUTHENTICATE_SUCCESS', () => {
      it('updates authenticating status', () => {
        const session = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password',
        };
        const action = authenticateSuccess('password');
        const authenticatedState = {
          authenticated: true,
          authenticating: false,
          error: null,
          password: 'password',
        };
        expect(oxalates({ session }, action).session).toEqual(authenticatedState);
      });

      it('is ignored if the password has changed', () => {
        const session = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password2',
        };
        const action = authenticateSuccess('password');
        const authenticatedState = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password2',
        };
        expect(oxalates({ session }, action).session).toEqual(authenticatedState);
      });
    });

    describe('AUTHENTICATE_FAILURE', () => {
      it('indicates an error state', () => {
        const session = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password',
        };
        const action = authenticateFailure('password', 'some error');
        const failureState = {
          authenticated: false,
          authenticating: true,
          error: 'some error',
          password: 'password',
        };
        expect(oxalates({ session }, action).session).toEqual(failureState);
      });

      it('AUTHENTICATE_FAILURE is ignored if the password has changed', () => {
        const session = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password2',
        };
        const action = authenticateFailure('password', 'some error');
        const failureState = {
          authenticated: false,
          authenticating: true,
          error: null,
          password: 'password2',
        };
        expect(oxalates({ session }, action).session).toEqual(failureState);
      });
    });
  });
});
