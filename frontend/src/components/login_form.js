import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loginUser } from '../ducks/user';
import { preventDefault } from '../lib/event_handler';
import Error from './error';

const createLoginData = ({ username: { value: username }, password: { value: password } }) => ({
  username,
  password,
});

const LoginForm = ({ history, username, error, loginUser }) => (
  <div>
    <form
      onSubmit={preventDefault(() => loginUser(createLoginData(this), history).catch(() => null))}
    >
      {error && <Error message={error} />}
      <input type="text" defaultValue={username} ref={input => (this.username = input)} />
      <input type="password" ref={input => (this.password = input)} />
      <input type="submit" />
    </form>
  </div>
);

const mapStateToProps = ({ user: { username, error } }) => ({ username, error });

export default connect(mapStateToProps, { loginUser })(withRouter(LoginForm));
