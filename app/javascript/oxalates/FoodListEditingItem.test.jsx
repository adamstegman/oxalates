import React from 'react';
import renderer from 'react-test-renderer';

import foods from './__mocks__/foods.json';
import { FoodListEditingItem } from './FoodListEditingItem';
import lists from './__mocks__/lists.json';

const food = foods[0];
const list = lists[0];

test('FoodListEditingItem renders a food in a list being edited', () => {
  const component = renderer.create(
    <FoodListEditingItem food={food} list={list} password={'password'} deleteFood={() => {}} setEditingFood={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
