import React from 'react';
import renderer from 'react-test-renderer';

import lists from './lists.json';
import { ListMenuItem } from './list-menu-item';

const list = lists[0];

test('ListMenuItem renders an inactive list', () => {
  const component = renderer.create(
    <ListMenuItem list={list} active={false} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItem renders an active list', () => {
  const component = renderer.create(
    <ListMenuItem list={list} active={true} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
