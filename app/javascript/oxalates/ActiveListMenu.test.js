import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import lists from './__mocks__/lists.json';
import { ActiveListMenu } from './ActiveListMenu';
import { ListMenu } from './ListMenu';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const state = {
  listMenu: {
    lists,
    activeListId: lists[0].id,
  },
};

describe('ActiveListMenu', () => {
  beforeEach(() => {
    fetchMock.mock('*', { body: { foods: [] } });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders the list menu with all lists and active list', () => {
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

  it('updates the active list on selection', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveListMenu />
      </Provider>,
    );
    const renderedListMenu = wrapper.find(ListMenu);
    expect(renderedListMenu.prop('onListSelect')).toBeDefined();

    const expectedActions = [
      { type: 'SET_EDITING_FOODS', editingFoods: false },
      { type: 'SELECT_ACTIVE_LIST_ID', activeListId: lists[1].id },
      { type: 'FETCH_FOODS_REQUEST', listId: lists[1].id },
      { type: 'FETCH_FOODS_SUCCESS', listId: lists[1].id, foods: [] },
    ];
    return renderedListMenu.prop('onListSelect')(lists[1]).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
