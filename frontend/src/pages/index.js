import React from 'react';
import Home from './home';
import Signup from './signup';
import Login from './login';
import Logout from './logout';
import { Route } from 'react-router-dom'
import './index.css';

const App = () => (
  <div className='App'>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
  </div>
);

export default App;
