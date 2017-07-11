import { FULFILLED, REJECTED } from 'redux-promise-middleware';
import typeToReducer from 'type-to-reducer';
import { postLogin, postLogout, postSignup, fetchSelf } from '../actions/user';
import { dig } from '../lib/utils';

export const SIGNUP = 'USER/SIGNUP';
export const LOGIN = 'USER/LOGIN';
export const LOGOUT = 'USER/LOGOUT';
export const FETCH_SELF = 'USER/FETCH_SELF';

export const signupUser = (signupData, history) => ({
  type: SIGNUP,
  payload: {
    data: signupData,
    promise: postSignup(signupData, history),
  },
});

export const loginUser = (loginData, history) => ({
  type: LOGIN,
  payload: {
    data: loginData,
    promise: postLogin(loginData, history),
  },
});

export const logoutUser = history => ({
  type: LOGOUT,
  payload: postLogout(history),
});

export const currentUserFetch = () => ({
  type: FETCH_SELF,
  payload: fetchSelf(),
});

const INITIAL_STATE = {
  username: '',
  loggedIn: false,
  error: '',
};

const loginSuccess = (state, action) => {
  console.log('loginSuccess', action);
  return { ...state, loggedIn: true, error: '' };
};

const loginFail = (state, action) => {
  console.log('loginFail', action);
  return { ...state, loggedIn: false, error: action.payload.error };
};

const signupSuccess = (state, action) => {
  console.log('signupSuccess', action);
  return { ...state, loggedIn: true, error: '' };
};

const signupFail = (state, action) => {
  console.log('signupFail', action);
  return { ...state, loggedIn: false, error: action.payload.error };
};

const logoutSuccess = (state, action) => {
  return { ...state, ...INITIAL_STATE };
};

const fetchSelfSuccess = (state, action) => {
  console.log('fetchSelfSuccess', action);
  return { ...state, loggedIn: true, username: dig(action, 'payload', 'data', 'me', 'username') };
};

const actionHandlers = {
  [LOGIN]: {
    [FULFILLED]: loginSuccess,
    [REJECTED]: loginFail,
  },
  [SIGNUP]: {
    [FULFILLED]: signupSuccess,
    [REJECTED]: signupFail,
  },
  [LOGOUT]: {
    [FULFILLED]: logoutSuccess,
  },
  [FETCH_SELF]: {
    [FULFILLED]: fetchSelfSuccess,
  },
};

export default typeToReducer(actionHandlers, INITIAL_STATE);
