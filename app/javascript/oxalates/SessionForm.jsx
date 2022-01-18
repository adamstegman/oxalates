import React from 'react';
import PropTypes from 'prop-types';

export const SessionForm = ({ error, password, onChangePassword, onStopAuthentication }) => {
  const _onStopAuthentication = event => {
    event.preventDefault();
    onStopAuthentication(password);
  };
  const _onChangePassword = event => onChangePassword(event.target.value);

  let errorMessage = null;
  if (error) {
    errorMessage = <p className="item">{error}</p>;
  }

  return (
    <form className="session" onSubmit={_onStopAuthentication}>
      <label htmlFor="password">Password</label>
      <input type="password"
             name="password"
             placeholder="Password"
             autoFocus
             value={password}
             onChange={_onChangePassword} />
      <input type="submit" value="Log in" />
      {errorMessage}
    </form>
  );
};

SessionForm.propTypes = {
  error: PropTypes.string,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onStopAuthentication: PropTypes.func,
};
