import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  authenticate,
  logout,
  setAuthenticating,
  setPassword,
} from './session';

const mockStore = configureMockStore([thunk]);
const password = 'password';

test('setAuthenticating dispatches SET_AUTHENTICATING action', () => {
  expect(setAuthenticating(true)).toEqual({
    type: 'SET_AUTHENTICATING',
    authenticating: true,
  });
});

test('setPassword dispatches SET_PASSWORD action', () => {
  expect(setPassword('password')).toEqual({
    type: 'SET_PASSWORD',
    password,
  });
});

test('logout dispatches actions to clear the session', () => {
  const expectedActions = [
    { type: 'SET_AUTHENTICATED', authenticated: false },
    { type: 'SET_PASSWORD', password: '' },
  ];
  const store = mockStore({ session: { authenticated: true, password: 'password' } });
  store.dispatch(logout());
  expect(store.getActions()).toEqual(expectedActions);
});

describe('authenticate', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('authenticates for the given password and dispatches a success event', () => {
    fetchMock.postOnce({
      matcher: (url, opts) => {
        return (
          url === '/session/validate' &&
          opts && opts.body && JSON.parse(opts.body).password === password
        )
      },
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: {},
    });

    const expectedActions = [
      { type: 'AUTHENTICATE_REQUEST' },
      { type: 'AUTHENTICATE_SUCCESS', password },
    ];
    const store = mockStore({ session: { authenticating: true } });
    return store.dispatch(authenticate('password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on unsuccessful response', () => {
    fetchMock.postOnce({
      matcher: '/session/validate',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: { status: 401 },
    });

    const err = new Error('Failed');
    const expectedActions = [
      { type: 'AUTHENTICATE_REQUEST' },
      { type: 'AUTHENTICATE_FAILURE', password, err },
    ];
    const store = mockStore({ session: { authenticating: true } });
    return store.dispatch(authenticate('password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches a failure event on request failure', () => {
    const err = new Error('request failure');
    fetchMock.getOnce({
      matcher: '/session/validate',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      response: { throws: err },
    });

    const expectedActions = [
      { type: 'AUTHENTICATE_REQUEST' },
      { type: 'AUTHENTICATE_FAILURE', password, err },
    ];
    const store = mockStore({ session: { authenticating: true } });
    return store.dispatch(authenticate('password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
