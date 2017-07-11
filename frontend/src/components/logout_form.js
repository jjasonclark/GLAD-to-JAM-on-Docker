import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../ducks/user';
import { preventDefault } from '../lib/event_handler';

const LogoutForm = ({ history, logoutUser }) => (
  <div>
    <form onSubmit={preventDefault(() => logoutUser(history).catch(() => null))}>
      <input type="submit" value="Logout" />
    </form>
  </div>
);

export default connect(null, { logoutUser })(withRouter(LogoutForm));
