import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import lists from './lists.json';
import { ListMenuItem } from './list-menu-item';

Enzyme.configure({ adapter: new Adapter() });

const noOp = () => {};
const list = lists[0];

test('ListMenuItem renders an inactive list', () => {
  const component = renderer.create(
    <ListMenuItem list={list} active={false} onSelect={noOp} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItem renders an active list', () => {
  const component = renderer.create(
    <ListMenuItem list={list} active={true} onSelect={noOp} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListMenuItem calls the callback on selection', () => {
  let selected = false;
  const onSelect = () => {
    selected = true;
  };
  const component = shallow(
    <ListMenuItem list={list} active={true} onSelect={onSelect} />,
  );
  component.find('button').simulate('click');
  expect(selected).toBe(true);
});
