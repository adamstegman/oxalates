import { connect } from 'react-redux';
import {
  authenticate,
  logout,
  setAuthenticating,
  setPassword
} from './actions';
import { SessionMenu } from './SessionMenu';

const mapStateToProps = state => {
  const {
    authenticated,
    authenticating,
    error,
    password,
  } = state.session;
  const errorMessage = error ? error.message : null;
  return {
    authenticated,
    authenticating,
    error: errorMessage,
    password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePassword: password => dispatch(setPassword(password)),
    onLogout: () => dispatch(logout()),
    onStartAuthentication: () => dispatch(setAuthenticating(true)),
    onStopAuthentication: password => dispatch(authenticate(password)),
  };
};

export const ActiveSessionMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionMenu);
