import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import lists from './__mocks__/lists.json';
import { AuthenticatedAdminActionsMenu } from './AuthenticatedAdminActionsMenu';
import { AdminActionsMenu } from './AdminActionsMenu';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const state = {
  session: {
    authenticated: true,
  },
  listMenu: {
    activeListId: lists[0].id,
  },
  foodList: {
    editingFoods: false,
  },
};

describe('AuthenticatedAdminActionsMenu', () => {
  beforeEach(() => {
    fetchMock.mock('*', 200);
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders the admin actions menu', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <AuthenticatedAdminActionsMenu />
      </Provider>,
    );
    const renderedAdminActionsMenu = wrapper.find(AdminActionsMenu);
    expect(renderedAdminActionsMenu.prop('authenticated')).toEqual(true);
    expect(renderedAdminActionsMenu.prop('activeListId')).toEqual(lists[0].id);
    expect(renderedAdminActionsMenu.prop('editingFoods')).toEqual(false);
  });

  it('starts a new food', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <AuthenticatedAdminActionsMenu />
      </Provider>,
    );
    const renderedAdminActionsMenu = wrapper.find(AdminActionsMenu);
    expect(renderedAdminActionsMenu.prop('startNewFood')).toBeDefined();

    const expectedActions = [
      { type: 'SET_NEW_FOOD', food: {}, listId: lists[0].id },
    ];
    renderedAdminActionsMenu.prop('startNewFood')(lists[0].id);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('allows editing foods', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <AuthenticatedAdminActionsMenu />
      </Provider>,
    );
    const renderedAdminActionsMenu = wrapper.find(AdminActionsMenu);
    expect(renderedAdminActionsMenu.prop('setEditingFoods')).toBeDefined();

    const expectedActions = [
      { type: 'SET_EDITING_FOODS', editingFoods: true },
    ];
    renderedAdminActionsMenu.prop('setEditingFoods')(true);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
