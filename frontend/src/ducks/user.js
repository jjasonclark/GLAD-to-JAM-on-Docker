import { FULFILLED, REJECTED } from 'redux-promise-middleware';
import typeToReducer from 'type-to-reducer';
import { postSignup } from '../actions/user';

export const SIGNUP = 'USER/SIGNUP';

export const signupUser = (signupData, history) => ({
  type: SIGNUP,
  payload: {
    data: signupData,
    promise: postSignup(signupData, history),
  },
});

const INITIAL_STATE = {
  name: '',
  username: '',
  loggedIn: false,
  error: '',
};

const signupSuccess = (state, action) => {
  console.log('signupSuccess', action);
  return { ...state, loggedIn: true, error: '' };
};

const signupFail = (state, action) => {
  console.log('signupFail', action);
  return { ...state, loggedIn: false, error: action.payload.error };
};

const actionHandlers = {
  [SIGNUP]: {
    [FULFILLED]: signupSuccess,
    [REJECTED]: signupFail,
  },
};

export default typeToReducer(actionHandlers, INITIAL_STATE);
