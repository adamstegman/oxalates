import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { ActionsMenu } from './ActionsMenu';

const mockStore = configureStore();
const state = {
  foodList: {
    query: 'test',
  },
};

test('ActionsMenu renders the unauthenticated actions menu', () => {
  const store = mockStore(state);
  const component = renderer.create(
    <Provider store={store}>
      <ActionsMenu />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
