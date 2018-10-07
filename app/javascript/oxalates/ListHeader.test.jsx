import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import lists from './__mocks__/lists.json';
import { ListHeader } from './ListHeader';

const mockStore = configureStore();
const state = {
  foodList: {
    query: 'test',
  },
  session: {
    authenticating: false,
    password: '',
  },
};

test('ListHeader renders the All list title', () => {
  const store = mockStore(state);
  const component = renderer.create(
    <Provider store={store}>
      <ListHeader list={lists[0]} />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListHeader renders the Very High list title', () => {
  const store = mockStore(state);
  const component = renderer.create(
    <Provider store={store}>
      <ListHeader list={lists[1]} />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
