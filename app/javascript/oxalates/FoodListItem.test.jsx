import React from 'react';
import renderer from 'react-test-renderer';

import foods from './__mocks__/foods.json';
import { FoodListItem } from './FoodListItem';
import lists from './__mocks__/lists.json';

const food = foods[0];
const list = lists[0];

test('FoodListItem renders a food', () => {
  const component = renderer.create(
    <FoodListItem food={food} list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
