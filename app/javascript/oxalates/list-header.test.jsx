import React from 'react';
import renderer from 'react-test-renderer';

import lists from '../../../__mocks__/lists.json';
import { ListHeader } from './list-header';

test('ListHeader renders the All list title', () => {
  const component = renderer.create(
    <ListHeader list={lists[0]} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListHeader renders the Very High list title', () => {
  const component = renderer.create(
    <ListHeader list={lists[1]} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
