import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './ducks';

const middleware = [promiseMiddleware()];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({ collapsed: true, logger: console });
  middleware.push(logger);
}

const composer = () => {
  /* eslint-disable no-underscore-dangle */
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    console.log('adding Redux dev tools');
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  } else {
    return compose;
  }
  /* eslint-enable */
};

export default function(initialState = {}) {
  return createStore(rootReducer, initialState, composer()(applyMiddleware(...middleware)));
}
