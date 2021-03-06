import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Oxalates } from './index';
import foods from './__mocks__/foods.json';
import lists from './__mocks__/lists.json';

const mockStore = configureStore();
const state = {
  listMenu: {
    lists,
    activeListId: lists[0].id,
  },
  foodList: {
    foods,
    error: null,
    query: '',
  },
  session: {
    authenticating: false,
    password: '',
  },
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
