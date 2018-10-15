import React from 'react';
import renderer from 'react-test-renderer';

import lists from './__mocks__/lists.json';
import { AdminActionsMenu } from './AdminActionsMenu';

test('AdminActionsMenu renders admin action buttons', () => {
  const component = renderer.create(
    <AdminActionsMenu authenticated={true}
                      activeListId={lists[0].id}
                      editingFoods={false}
                      setEditingFoods={() => {}}
                      startNewFood={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('AdminActionsMenu renders nothing', () => {
  const component = renderer.create(
    <AdminActionsMenu authenticated={false}
                      activeListId={lists[0].id}
                      editingFoods={false}
                      setEditingFoods={() => {}}
                      startNewFood={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
