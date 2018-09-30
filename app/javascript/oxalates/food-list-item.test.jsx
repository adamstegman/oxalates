import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import foods from '../../../__mocks__/foods.json';
import { FoodListItem } from './food-list-item';
import lists from '../../../__mocks__/lists.json';

Enzyme.configure({ adapter: new Adapter() });

const food = foods[0];
const list = lists[0];

test('FoodListItem renders a food', () => {
  const component = renderer.create(
    <FoodListItem food={food} list={list} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
