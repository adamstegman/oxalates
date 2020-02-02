export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const setAuthenticated = authenticated => {
  return {
    type: SET_AUTHENTICATED,
    authenticated,
  };
};

export const SET_AUTHENTICATING = 'SET_AUTHENTICATING';
export const setAuthenticating = authenticating => {
  return {
    type: SET_AUTHENTICATING,
    authenticating,
  };
};

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = password => {
  return {
    type: SET_PASSWORD,
    password,
  };
};

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const authenticateRequest = () => {
  return {
    type: AUTHENTICATE_REQUEST,
  };
};

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const authenticateSuccess = password => {
  return {
    type: AUTHENTICATE_SUCCESS,
    password,
  };
};

export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';
export const authenticateFailure = (password, err) => {
  return {
    type: AUTHENTICATE_FAILURE,
    password,
    err,
  };
};

const AUTHENTICATE_URL = '/session/validate';
export const authenticate = password => {
  return dispatch => {
    dispatch(authenticateRequest());
    return fetch(AUTHENTICATE_URL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
    }).then(response => {
      if (response.ok) {
        dispatch(authenticateSuccess(password));
        return;
      }
      throw new Error('Failed');
    }).catch(err => {
      dispatch(authenticateFailure(password, err));
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(setAuthenticated(false));
    dispatch(setPassword(''));
  };
};
