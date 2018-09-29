import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Oxalates } from './index';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const lists = require('./lists.json');
const state = {
  lists,
  activeList: lists[0],
};

test('Index renders the home screen', () => {
  const store = mockStore(state);
  const component = renderer.create(
    <Provider store={store}>
      <Oxalates />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
