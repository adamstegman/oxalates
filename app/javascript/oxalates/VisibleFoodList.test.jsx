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
const requestedListId = lists[0].id;
const newFood = foods[0];
const newFoodListId = lists[1].id;
const error = new Error('some error');
const password = 'password';
const state = {
  listMenu: {
    lists,
  },
  foodList: {
    requestedListId,
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
});
