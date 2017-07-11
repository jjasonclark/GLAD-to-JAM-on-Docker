import React from 'react';
import { Link } from 'react-router-dom';
import LogoutForm from '../components/logout_form';

const Logout = () => (
  <div className="App centered">
    <div>Logout Page</div>
    <Link to="/">Back to home</Link>
    <LogoutForm />
  </div>
);

export default Logout;
