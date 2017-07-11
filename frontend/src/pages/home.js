import React from 'react';
import { connect } from 'react-redux';
import Landing from './landing';
import Main from './main';

const Home = ({ loggedIn }) => {
  if (loggedIn) {
    return <Main />;
  }
  return <Landing />;
};

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });

export default connect(mapStateToProps)(Home);
