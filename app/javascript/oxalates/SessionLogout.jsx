import React from 'react';
import PropTypes from 'prop-types';

import "./SessionLogout.scss";

export const SessionLogout = ({ onChangePassword }) => {
  const onLogOut = () => onChangePassword('');
  return (
    <button type="button"
            className="action logout"
            onClick={onLogOut}>
      Log out
    </button>
  );
};

SessionLogout.propTypes = {
  onChangePassword: PropTypes.func,
};
