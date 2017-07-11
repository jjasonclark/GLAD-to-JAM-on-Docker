import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/login_form';

const Login = () => (
  <div className="App centered">
    <div>Login Page</div>
    <Link to="/">Back to home</Link>
    <LoginForm />
  </div>
);

export default Login;
