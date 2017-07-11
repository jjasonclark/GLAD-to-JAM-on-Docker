import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signupUser } from '../ducks/user';
import { preventDefault } from '../lib/event_handler';
import Error from './error';

const createSignupData = ({
  username: { value: username },
  password: { value: password },
  passwordConfirmation: { value: passwordConfirmation },
}) => ({
  username,
  password,
  passwordConfirmation,
});

const SignupForm = ({ history, username, error, signupUser }) => (
  <div>
    <form
      onSubmit={preventDefault(() => signupUser(createSignupData(this), history).catch(() => null))}
    >
      {error && <Error message={error} />}
      <input type="text" defaultValue={username} ref={input => (this.username = input)} />
      <input type="password" ref={input => (this.password = input)} />
      <input type="password" ref={input => (this.passwordConfirmation = input)} />
      <input type="submit" />
    </form>
  </div>
);

const mapStateToProps = ({ user: { username, error } }) => ({ username, error });

export default connect(mapStateToProps, { signupUser })(withRouter(SignupForm));
