import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import lists from './__mocks__/lists.json';
import { ActionsMenu } from './ActionsMenu';

const mockStore = configureStore();
const state = {
  session: {
    authenticated: true,
    authenticating: false,
    password: 'password',
  },
  foodList: {
    query: 'test',
  },
  listMenu: {
    activeListId: lists[0].id,
  },
};

test('ActionsMenu renders the actions menu', () => {
  const store = mockStore(state);
  const component = renderer.create(
    <Provider store={store}>
      <ActionsMenu />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
