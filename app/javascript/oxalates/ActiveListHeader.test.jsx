import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import lists from './__mocks__/lists.json';
import { ActiveListHeader } from './ActiveListHeader';
import { ListHeader } from './ListHeader';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const state = {
  listMenu: {
    lists,
    activeListId: lists[0].id,
  },
};

test('ActiveListHeader renders the header with the active list name', () => {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <ActiveListHeader />
    </Provider>,
  );
  const renderedListHeader = wrapper.find(ListHeader);
  expect(renderedListHeader.prop('list')).toEqual(lists[0]);
});
