import {
  authenticateFailure,
  authenticateSuccess,
  setAuthenticated,
  setAuthenticating,
  setPassword,
} from '../actions';
import { session } from './session';

describe('session state', () => {
  it('is correct initially', () => {
    const initialState = {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    };
    expect(session(undefined, {})).toEqual(initialState);
  });

  describe('SET_AUTHENTICATED', () => {
    it('updates authenticated state', () => {
      const initialSession = {
        authenticated: true,
        authenticating: false,
        error: null,
        password: 'password',
      };
      const action = setAuthenticated(false);
      const loggedOutState = {
        authenticated: false,
        authenticating: false,
        error: null,
        password: 'password',
      };
      expect(session(initialSession, action)).toEqual(loggedOutState);
    });
  });

  describe('SET_AUTHENTICATING', () => {
    it('updates authenticating status', () => {
      const initialSession = {
        authenticated: false,
        authenticating: false,
        error: null,
        password: '',
      };
      const action = setAuthenticating(true);
      const authenticatingState = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: '',
      };
      expect(session(initialSession, action)).toEqual(authenticatingState);
    });
  });

  describe('SET_PASSWORD', () => {
    it('updates password', () => {
      const initialSession = {
        authenticated: false,
        authenticating: false,
        error: 'some error',
        password: '',
      };
      const action = setPassword('password');
      const passwordState = {
        authenticated: false,
        authenticating: false,
        error: null,
        password: 'password',
      };
      expect(session(initialSession, action)).toEqual(passwordState);
    });
  });

  describe('AUTHENTICATE_SUCCESS', () => {
    it('updates authenticating status', () => {
      const initialSession = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password',
      };
      const action = authenticateSuccess('password');
      const authenticatedState = {
        authenticated: true,
        authenticating: false,
        error: null,
        password: 'password',
      };
      expect(session(initialSession, action)).toEqual(authenticatedState);
    });

    it('is ignored if the password has changed', () => {
      const initialSession = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password2',
      };
      const action = authenticateSuccess('password');
      const authenticatedState = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password2',
      };
      expect(session(initialSession, action)).toEqual(authenticatedState);
    });
  });

  describe('AUTHENTICATE_FAILURE', () => {
    it('indicates an error state', () => {
      const initialSession = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password',
      };
      const action = authenticateFailure('password', 'some error');
      const failureState = {
        authenticated: false,
        authenticating: true,
        error: 'some error',
        password: 'password',
      };
      expect(session(initialSession, action)).toEqual(failureState);
    });

    it('is ignored if the password has changed', () => {
      const initialSession = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password2',
      };
      const action = authenticateFailure('password', 'some error');
      const failureState = {
        authenticated: false,
        authenticating: true,
        error: null,
        password: 'password2',
      };
      expect(session(initialSession, action)).toEqual(failureState);
    });
  });
});
