import React from 'react';
import renderer from 'react-test-renderer';

import { FoodListUpdateItem } from './FoodListUpdateItem';

const editingFood = {
  id: 1,
  name: 'some food',
  serving: 'some serving',
  oxalateMg: 3.14,
};

test('FoodListUpdateItem renders a pre-filled form', () => {
  const component = renderer.create(
    <FoodListUpdateItem editingFood={editingFood} editingFoodListId={1} updateFood={() => {}} setEditingFood={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodListUpdateItem renders a failed form', () => {
  const component = renderer.create(
    <FoodListUpdateItem editingFood={editingFood} editingFoodListId={1} updateFood={() => {}} setEditingFood={() => {}} error={['error 1']} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodListUpdateItem renders a server error', () => {
  const component = renderer.create(
    <FoodListUpdateItem editingFood={editingFood} editingFoodListId={1} updateFood={() => {}} setEditingFood={() => {}} error={'error message'} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
