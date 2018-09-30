import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import lists from './lists.json';
import { selectActiveListId } from './actions';
import { ActiveListMenu } from './active-list-menu';
import { ListMenu } from './list-menu';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const state = {
  lists,
  activeListId: lists[0].id,
};

test('ActiveListMenu renders the list menu with all lists and active list', () => {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <ActiveListMenu />
    </Provider>,
  );
  const renderedListMenu = wrapper.find(ListMenu);
  expect(renderedListMenu.prop('lists')).toEqual(lists);
  expect(renderedListMenu.prop('activeListId')).toEqual(lists[0].id);
});

test('ActiveListMenu updates the active list on selection', () => {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <ActiveListMenu />
    </Provider>,
  );
  const renderedListMenu = wrapper.find(ListMenu);
  expect(renderedListMenu.prop('onListSelect')).toBeDefined();
  expect(renderedListMenu.prop('onListSelect')(lists[1])).toEqual(selectActiveListId(lists[1].id));
});
