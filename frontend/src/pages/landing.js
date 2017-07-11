import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="App centered">
    <img src={logo} className="App-logo" alt="logo" />
    <div>Hello, world</div>
    <Link to="/signup">Signup</Link>
  </div>
);


export default Landing;
