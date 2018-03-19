import 'react-native';
import React from 'react';
import { FoodListItem } from '../FoodListItem';
import renderer from 'react-test-renderer';

it('renders a food as a list item', () => {
  const tree = renderer.create(<FoodListItem food={{name: 'Test', serving: '1 cup', oxalate_mg: 30}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
