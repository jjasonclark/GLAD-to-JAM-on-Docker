import React from 'react';
import logo from '../assets/logo.svg';
import AuthLink from '../components/auth_link';

const Landing = () => (
  <div className="App centered">
    <img src={logo} className="App-logo" alt="logo" />
    <div>Hello, world</div>
    <AuthLink />
  </div>
);


export default Landing;
