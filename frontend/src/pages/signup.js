import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/signup_form';

const Signup = () => (
  <div className="App centered">
    <div>Signup Page</div>
    <Link to="/">Back to home</Link>
    <SignupForm />
  </div>
);

export default Signup;
