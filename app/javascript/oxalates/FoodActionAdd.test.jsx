import React from 'react';
import renderer from 'react-test-renderer';

import { FoodActionAdd } from './FoodActionAdd';

test('FoodActionAdd renders the add food button', () => {
  const component = renderer.create(
    <FoodActionAdd onStartAddingFood={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
