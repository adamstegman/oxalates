import React from 'react';
import renderer from 'react-test-renderer';

import { FoodListNewItem } from './FoodListNewItem';

test('FoodListNewItem renders an empty form', () => {
  const component = renderer.create(
    <FoodListNewItem newFood={{}} newFoodListId={1} createFood={() => {}} setNewFood={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodListNewItem renders a pre-filled form', () => {
  const newFood = {
    name: 'some food',
    serving: 'some serving',
    oxalateMg: 3.14,
  }
  const component = renderer.create(
    <FoodListNewItem newFood={newFood} newFoodListId={1} createFood={() => {}} setNewFood={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodListNewItem renders a failed form', () => {
  const newFood = {
    name: 'some food',
    serving: 'some serving',
    oxalateMg: 3.14,
  }
  const component = renderer.create(
    <FoodListNewItem newFood={newFood} newFoodListId={1} createFood={() => {}} setNewFood={() => {}} error={['error 1']} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
