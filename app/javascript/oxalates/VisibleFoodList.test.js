import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';
import { VisibleFoodList } from './VisibleFoodList';
import { FoodList } from './FoodList';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const activeListId = lists[2].id;
const requestedListId = lists[0].id;
const editingFood = foods[1];
const editingFoodListId = lists[2].id;
const editingFoods = false;
const newFood = foods[0];
const newFoodListId = lists[1].id;
const error = 'some error';
const password = 'password';
const state = {
  listMenu: {
    activeListId,
    lists,
  },
  foodList: {
    requestedListId,
    editingFood,
    editingFoodListId,
    editingFoods,
    newFood,
    newFoodListId,
    error,
    foods,
  },
  session: {
    password,
  },
};

describe('VisibleFoodList', () => {
  beforeEach(() => {
    fetchMock.mock('*', { body: { foods: [] } });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders the visible foods', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('requestedListId')).toEqual(requestedListId);
    expect(renderedFoodList.prop('newFood')).toEqual(newFood);
    expect(renderedFoodList.prop('newFoodListId')).toEqual(newFoodListId);
    expect(renderedFoodList.prop('editingFood')).toEqual(editingFood);
    expect(renderedFoodList.prop('editingFoodListId')).toEqual(editingFoodListId);
    expect(renderedFoodList.prop('editingFoods')).toEqual(false);
    expect(renderedFoodList.prop('error')).toEqual('some error');
    expect(renderedFoodList.prop('foods')).toEqual(foods);
    expect(renderedFoodList.prop('lists')).toEqual(lists);
    expect(renderedFoodList.prop('password')).toEqual(password);
  });

  it('updates the new food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('setNewFood')).toBeDefined();

    const expectedActions = [
      { type: 'SET_NEW_FOOD', food: newFood, listId: lists[0].id },
    ];
    renderedFoodList.prop('setNewFood')(lists[0].id, newFood);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates the new food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('createFood')).toBeDefined();

    const expectedActions = [
      { type: 'CREATE_FOOD_REQUEST', food: newFood, listId: lists[0].id },
      { type: 'CREATE_FOOD_SUCCESS', food: newFood, listId: lists[0].id },
      { type: 'FETCH_FOODS_REQUEST', listId: lists[0].id },
    ];
    return renderedFoodList.prop('createFood')(password, newFood, lists[0].id).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('deletes a food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('deleteFood')).toBeDefined();

    const expectedActions = [
      { type: 'DELETE_FOOD_REQUEST', food: newFood },
      { type: 'DELETE_FOOD_SUCCESS', food: newFood },
    ];
    return renderedFoodList.prop('deleteFood')(password, newFood).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('edits an existing food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('setEditingFood')).toBeDefined();

    const expectedActions = [
      { type: 'SET_EDITING_FOOD', food: editingFood, listId: lists[2].id },
    ];
    renderedFoodList.prop('setEditingFood')(editingFood, lists[2].id);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updates the editing food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <VisibleFoodList />
      </Provider>,
    );
    const renderedFoodList = wrapper.find(FoodList);
    expect(renderedFoodList.prop('updateFood')).toBeDefined();

    const expectedActions = [
      { type: 'UPDATE_FOOD_REQUEST', food: editingFood, listId: lists[2].id },
      { type: 'UPDATE_FOOD_SUCCESS', food: editingFood, listId: lists[2].id },
      { type: 'FETCH_FOODS_REQUEST', listId: lists[2].id },
    ];
    return renderedFoodList.prop('updateFood')(password, editingFood, lists[2].id).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
