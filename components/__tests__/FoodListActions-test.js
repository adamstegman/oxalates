import 'react-native';
import React from 'react';
import { FoodListActions } from '../FoodListActions';
import renderer from 'react-test-renderer';

it('renders the food list actions', () => {
  const tree = renderer.create(<FoodListActions />).toJSON();

  expect(tree).toMatchSnapshot();
});
