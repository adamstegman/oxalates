import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ActiveSessionMenu } from './ActiveSessionMenu';
import { SessionMenu } from './SessionMenu';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const state = {
  session: {
    authenticated: false,
    authenticating: true,
    error: new Error('some error'),
    password: 'password'
  }
};

describe('ActiveSessionMenu', () => {
  beforeEach(() => {
    fetchMock.mock('*', 200);
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders the session menu', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveSessionMenu />
      </Provider>,
    );
    const renderedSessionMenu = wrapper.find(SessionMenu);
    expect(renderedSessionMenu.prop('authenticated')).toEqual(false);
    expect(renderedSessionMenu.prop('authenticating')).toEqual(true);
    expect(renderedSessionMenu.prop('error')).toEqual('some error');
    expect(renderedSessionMenu.prop('password')).toEqual('password');
  });

  it('starts authentication', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveSessionMenu />
      </Provider>,
    );
    const renderedSessionMenu = wrapper.find(SessionMenu);
    expect(renderedSessionMenu.prop('onStartAuthentication')).toBeDefined();

    const expectedActions = [
      { type: 'SET_AUTHENTICATING', authenticating: true },
    ];
    renderedSessionMenu.prop('onStartAuthentication')();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updates the password', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveSessionMenu />
      </Provider>,
    );
    const renderedSessionMenu = wrapper.find(SessionMenu);
    expect(renderedSessionMenu.prop('onChangePassword')).toBeDefined();

    const expectedActions = [
      { type: 'SET_PASSWORD', password: 'password' },
    ];
    renderedSessionMenu.prop('onChangePassword')('password');
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('authenticates the password', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveSessionMenu />
      </Provider>,
    );
    const renderedSessionMenu = wrapper.find(SessionMenu);
    expect(renderedSessionMenu.prop('onStopAuthentication')).toBeDefined();

    const expectedActions = [
      { type: 'AUTHENTICATE_REQUEST' },
    ];
    renderedSessionMenu.prop('onStopAuthentication')('password');
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('logs out', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <ActiveSessionMenu />
      </Provider>,
    );
    const renderedSessionMenu = wrapper.find(SessionMenu);
    expect(renderedSessionMenu.prop('onLogout')).toBeDefined();

    const expectedActions = [
      { type: 'SET_AUTHENTICATED', authenticated: false },
      { type: 'SET_PASSWORD', password: '' },
    ];
    renderedSessionMenu.prop('onLogout')();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
