import React from 'react';
import renderer from 'react-test-renderer';

import { FoodActionDone } from './FoodActionDone';

test('FoodActionDone renders the done editing foods button', () => {
  const component = renderer.create(
    <FoodActionDone onDoneEditingFoods={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
