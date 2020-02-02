import React from 'react';
import renderer from 'react-test-renderer';

import { FoodActionEdit } from './FoodActionEdit';

test('FoodActionEdit renders the edit foods button', () => {
  const component = renderer.create(
    <FoodActionEdit onEditFoods={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
