import 'react-native';
import React from 'react';
import { FoodList } from '../FoodList';
import renderer from 'react-test-renderer';

it('renders a list of foods', () => {
  const tree = renderer.create(<FoodList list={{name: 'High', bottomThreshold: 15, topThreshold: 50, color: '#e00'}} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a list of all foods', () => {
  const tree = renderer.create(<FoodList />).toJSON();

  expect(tree).toMatchSnapshot();
});
