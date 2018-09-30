import React from 'react';
import renderer from 'react-test-renderer';

import lists from '../../../__mocks__/lists.json';
import { ListMenuItemIcon } from './list-menu-item-icon';

test('ListMenuItemIcon renders the "All" list', () => {
  const list = lists[0];
  const component = renderer.create(
    <ListMenuItemIcon list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItemIcon renders the "Very High" list', () => {
  const list = lists[1];
  const component = renderer.create(
    <ListMenuItemIcon list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItemIcon renders the "High" list', () => {
  const list = lists[2];
  const component = renderer.create(
    <ListMenuItemIcon list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItemIcon renders the "Moderate" list', () => {
  const list = lists[3];
  const component = renderer.create(
    <ListMenuItemIcon list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItemIcon renders the "Low" list', () => {
  const list = lists[4];
  const component = renderer.create(
    <ListMenuItemIcon list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
