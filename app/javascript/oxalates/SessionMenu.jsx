import React from 'react';
import PropTypes from 'prop-types';

import { SessionForm } from './SessionForm';
import { SessionLogin } from './SessionLogin';
import { SessionLogout } from './SessionLogout';

export class SessionMenu extends React.Component {
  render() {
    const {
      authenticated,
      authenticating,
      error,
      password,
      onChangePassword,
      onStartAuthentication,
      onStopAuthentication,
    } = this.props;

    if (authenticating) {
      return <SessionForm error={error}
                          password={password}
                          onChangePassword={onChangePassword}
                          onStopAuthentication={onStopAuthentication} />;
    }

    if (authenticated) {
      return <SessionLogout onChangePassword={onChangePassword} />;
    }

    return <SessionLogin onStartAuthentication={onStartAuthentication} />;
  }
};

SessionMenu.propTypes = {
  authenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  error: PropTypes.string,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onStartAuthentication: PropTypes.func,
  onStopAuthentication: PropTypes.func,
};
