import {
  createFoodFailure,
  createFoodRequest,
  createFoodSuccess,
  deleteFoodFailure,
  deleteFoodRequest,
  deleteFoodSuccess,
  fetchFoodSearchResultsFailure,
  fetchFoodSearchResultsRequest,
  fetchFoodSearchResultsSuccess,
  fetchFoodsFailure,
  fetchFoodsRequest,
  fetchFoodsSuccess,
  setEditingFoods,
  setNewFood,
  setSearchQuery,
} from '../actions';
import { foodList } from './foodList';
import responseFoods from '../__mocks__/response-foods.json';
import foods from '../__mocks__/foods.json';
import lists from '../__mocks__/lists.json';

describe('foodList state', () => {
  it('is correct initially', () => {
    const initialState = {
      foods: [],
      editingFoods: false,
      newFood: null,
      newFoodListId: null,
      requestedNewFood: null,
      error: null,
      requestedListId: null,
      query: '',
    };
    expect(foodList(undefined, {})).toEqual(initialState);
  });

  describe('CREATE_FOOD_REQUEST', () => {
    it('indicates a loading state', () => {
      const newFood = { name: 'food' };
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood,
        newFoodListId: null,
        requestedNewFood: newFood,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(createFoodState);
    });
  });

  describe('CREATE_FOOD_SUCCESS', () => {
    it('updates the new food', () => {
      const newFood = { name: 'food' };
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(foodsState);
    });

    it('does not update the foods if the requestedNewFood has changed', () => {
      const newFood = { name: 'food' };
      const newFood2 = { name: 'food2' };
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: newFood2,
        newFoodListId: lists[0].id,
        requestedNewFood: newFood2,
        error: null,
        requestedListId: null,
        query: '',
      };
      const action = createFoodSuccess(newFood, 2);
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('CREATE_FOOD_FAILURE', () => {
    it('indicates an error state', () => {
      const newFood = { name: 'food' };
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood,
        newFoodListId: null,
        requestedNewFood: newFood,
        error: `Error creating food: some error`,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(failureState);
    });

    it('is ignored if a new food was submitted', () => {
      const newFood = { name: 'food' };
      const newFood2 = { name: 'food2' };
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: newFood2,
        newFoodListId: null,
        requestedNewFood: newFood2,
        error: null,
        requestedListId: null,
        query: '',
      };
      const err = new Error('some error');
      const action = createFoodFailure(newFood, err);
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('DELETE_FOOD_REQUEST', () => {
    it('indicates a loading state', () => {
      const food = foods[0];
      const initialFoodList = {
        foods,
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: {},
        requestedListId: null,
        query: '',
      };
      const action = deleteFoodRequest(food);
      const deletedFoods = foods.slice(1);
      const deletedFoodState = {
        foods: deletedFoods,
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(deletedFoodState);
    });
  });

  describe('DELETE_FOOD_SUCCESS', () => {
    it('ensures the food is deleted', () => {
      const food = foods[0];
      const deletedFoods = foods.slice(1);
      const initialFoodList = {
        foods: deletedFoods,
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      const action = deleteFoodSuccess(food);
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('DELETE_FOOD_FAILURE', () => {
    it('indicates an error state', () => {
      const food = foods[0];
      const deletedFoods = foods.slice(1);
      const initialFoodList = {
        foods: deletedFoods,
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      const err = new Error('some error');
      const action = deleteFoodFailure(food, err);
      const failureState = {
        foods: deletedFoods,
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: `Error deleting food: some error`,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(failureState);
    });
  });

  describe('FETCH_FOODS_REQUEST', () => {
    it('indicates a loading state', () => {
      const initialFoodList = {
        foods,
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: lists[0].id,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(emptyFoodsState);
    });
  });

  describe('FETCH_FOODS_SUCCESS', () => {
    it('updates the foods', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(foodsState);
    });

    it('does not update the foods if the requestedListId has changed', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: 1,
        query: '',
      };
      const action = fetchFoodsSuccess(2, { foods: responseFoods });
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('FETCH_FOODS_FAILURE', () => {
    it('indicates an error state', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: `Error fetching foods for list_id=${lists[0].id}: some error`,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(failureState);
    });

    it('is ignored if a new list was requested', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: lists[0].id,
        query: '',
      };
      const err = new Error('some error');
      const action = fetchFoodsFailure(lists[1].id, err);
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('FETCH_FOOD_SEARCH_RESULTS_REQUEST', () => {
    it('indicates a loading state', () => {
      const initialFoodList = {
        foods,
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: 'test',
      };
      expect(foodList(initialFoodList, action)).toEqual(emptyFoodsState);
    });
  });

  describe('FETCH_FOOD_SEARCH_RESULTS_SUCCESS', () => {
    it('updates the foods', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: 'test',
      };
      expect(foodList(initialFoodList, action)).toEqual(foodsState);
    });

    it('does not update the foods if the search query has changed', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: 'test2',
      };
      const action = fetchFoodSearchResultsSuccess('test', { foods: responseFoods });
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('FETCH_FOOD_SEARCH_RESULTS_FAILURE', () => {
    it('indicates an error state', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: `Error fetching foods for query="test": some error`,
        requestedListId: null,
        query: 'test',
      };
      expect(foodList(initialFoodList, action)).toEqual(failureState);
    });

    it('is ignored if the query was changed', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: 'test2',
      };
      const err = new Error('some error');
      const action = fetchFoodSearchResultsFailure('test', err);
      expect(foodList(initialFoodList, action)).toEqual(initialFoodList);
    });
  });

  describe('SET_SEARCH_QUERY', () => {
    it('updates the food search query', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
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
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: 'test',
      };
      expect(foodList(initialFoodList, action)).toEqual(queryState);
    });
  });

  describe('SET_NEW_FOOD', () => {
    it('starts a new food', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      const action = setNewFood(lists[0].id);
      const newFoodState = {
        foods: [],
        editingFoods: false,
        newFood: {},
        newFoodListId: lists[0].id,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(newFoodState);
    });

    it('updates the new food', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: {},
        newFoodListId: lists[0].id,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      const action = setNewFood(lists[0].id, { name: 'test' });
      const newFoodState = {
        foods: [],
        editingFoods: false,
        newFood: { name: 'test' },
        newFoodListId: lists[0].id,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(newFoodState);
    });
  });

  describe('SET_EDITING_FOODS', () => {
    it('updates the editing state', () => {
      const initialFoodList = {
        foods: [],
        editingFoods: false,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      const action = setEditingFoods(true);
      const editingState = {
        foods: [],
        editingFoods: true,
        newFood: null,
        newFoodListId: null,
        requestedNewFood: null,
        error: null,
        requestedListId: null,
        query: '',
      };
      expect(foodList(initialFoodList, action)).toEqual(editingState);
    });
  });
});
