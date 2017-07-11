import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AuthLink = ({ loggedIn }) => {
  console.log(`AuthLink loggedIn: ${loggedIn}`);
  if (loggedIn) {
    return(
    <div className="links centered">
    <Link to="/logout">logout</Link>
    </div>)
    ;
  }
  return (
    <div className="links centered">
      <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
    </div>
  );
};

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });

export default connect(mapStateToProps)(AuthLink);
