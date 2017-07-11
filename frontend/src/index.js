import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './pages';
import createStore from './store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { currentUserFetch } from './ducks/user';
import 'reset.css';
import './index.css';

const store = createStore();
store.dispatch(currentUserFetch()).catch(()=>null)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
