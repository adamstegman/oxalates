import {
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  SET_AUTHENTICATED,
  SET_AUTHENTICATING,
  SET_PASSWORD,
} from '../actions';

const authenticated = (state = false, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_SUCCESS:
      if (action.password === password) {
        return true;
      }
      return state;
    case SET_AUTHENTICATED:
      return action.authenticated;
    default:
      return state;
  }
};

const authenticating = (state = false, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_SUCCESS:
      if (action.password === password) {
        return false;
      }
      return state;
    case SET_AUTHENTICATING:
      return action.authenticating;
    default:
      return state;
  }
};

const sessionError = (state = null, action, { password }) => {
  switch(action.type) {
    case AUTHENTICATE_FAILURE:
      if (action.password === password) {
        return action.err;
      }
      return state;
    case SET_PASSWORD:
      return null;
    default:
      return state;
  }
};

const password = (state = '', action) => {
  switch(action.type) {
    case SET_PASSWORD:
      return action.password;
    default:
      return state;
  }
};

export const session = (state = {}, action) => {
  return {
    authenticated: authenticated(state.authenticated, action, { password: state.password }),
    authenticating: authenticating(state.authenticating, action, { password: state.password }),
    error: sessionError(state.error, action, { password: state.password }),
    password: password(state.password, action),
  };
};
