import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';
import { VisibleFoodList } from './VisibleFoodList';
import { FoodList } from './FoodList';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const error = 'some error';
const state = {
  listMenu: {
    lists,
  },
  foodList: {
    error,
    foods,
  },
};

test('VisibleFoodList renders the visible foods', () => {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <VisibleFoodList />
    </Provider>,
  );
  const renderedFoodList = wrapper.find(FoodList);
  expect(renderedFoodList.prop('error')).toEqual(error);
  expect(renderedFoodList.prop('foods')).toEqual(foods);
  expect(renderedFoodList.prop('lists')).toEqual(lists);
});
