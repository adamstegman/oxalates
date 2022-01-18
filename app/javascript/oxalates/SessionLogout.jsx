import React from 'react';
import PropTypes from 'prop-types';

export const SessionLogout = ({ onLogout }) => {
  return (
    <button type="button"
            className="action logout"
            onClick={onLogout}>
      Log out
    </button>
  );
};

SessionLogout.propTypes = {
  onLogout: PropTypes.func,
};
