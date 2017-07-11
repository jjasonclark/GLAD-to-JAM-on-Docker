import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './pages';
import createStore from './store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import 'reset.css';
import './index.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
