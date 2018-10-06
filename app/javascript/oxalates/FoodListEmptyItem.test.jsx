import React from 'react';
import renderer from 'react-test-renderer';

import { FoodListEmptyItem } from './FoodListEmptyItem';

test('FoodListEmptyItem renders an empty list item', () => {
  const component = renderer.create(
    <FoodListEmptyItem />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
