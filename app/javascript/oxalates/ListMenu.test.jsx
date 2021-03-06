import React from 'react';
import renderer from 'react-test-renderer';

import lists from './__mocks__/lists.json';
import { ListMenu } from './ListMenu';

test('ListMenu renders all lists', () => {
  const component = renderer.create(
    <ListMenu lists={lists} activeListId={null} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenu indicates an active list', () => {
  const component = renderer.create(
    <ListMenu lists={lists} activeListId={lists[0].id} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
