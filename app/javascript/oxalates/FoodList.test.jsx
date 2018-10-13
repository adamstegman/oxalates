import React from 'react';
import renderer from 'react-test-renderer';

import foods from './__mocks__/foods.json';
import { FoodList } from './FoodList';
import lists from './__mocks__/lists.json';

test('FoodList renders foods', () => {
  const component = renderer.create(
    <FoodList foods={foods} lists={lists} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodList renders empty food list', () => {
  const component = renderer.create(
    <FoodList foods={[]} lists={lists} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodList renders loading indicator', () => {
  const component = renderer.create(
    <FoodList foods={[]} lists={lists} requestedListId={lists[0].id} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodList renders new food form', () => {
  const component = renderer.create(
    <FoodList foods={foods}
              lists={lists}
              newFood={{}}
              newFoodListId={lists[0].id}
              password={'password'}
              createFood={() => {}}
              setNewFood={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FoodList renders error indicator', () => {
  const err = 'some error';
  const component = renderer.create(
    <FoodList foods={[]} lists={lists} error={err} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
