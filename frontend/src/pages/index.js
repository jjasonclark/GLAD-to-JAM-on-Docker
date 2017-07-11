import React from 'react';
import Home from './home';
import Signup from './signup';
import { Route } from 'react-router-dom'
import './index.css';

const App = () => (
  <div className='App'>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
  </div>
);

export default App;
