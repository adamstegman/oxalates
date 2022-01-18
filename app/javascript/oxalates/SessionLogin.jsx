import React from 'react';
import PropTypes from 'prop-types';

export const SessionLogin = ({ onStartAuthentication }) => {
  return (
    <button type="button"
            className="action login"
            onClick={onStartAuthentication}>
      Log in
    </button>
  );
};

SessionLogin.propTypes = {
  onStartAuthentication: PropTypes.func,
};
