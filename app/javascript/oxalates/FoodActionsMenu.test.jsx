import React from 'react';
import renderer from 'react-test-renderer';

import lists from './__mocks__/lists.json';
import { FoodActionsMenu } from './FoodActionsMenu';

test('FoodActionsMenu renders food action buttons', () => {
  const component = renderer.create(
    <FoodActionsMenu activeListId={lists[0].id} startNewFood={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
