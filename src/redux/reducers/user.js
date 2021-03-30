import Cookies from 'js-cookie';
import {
  SET_USER_SUGN_UP_ACTION,
  SET_USER_ACTION,
  SET_SERVER_ERRORS_ACTION,
  SET_USER_LOG_OUT_ACTION,
} from '../actions';

export const initialState = Cookies.get('user')
  ? { ...JSON.parse(Cookies.get('user')), isSignUp: true, serverErrors: null }
  : {
      isSignUp: false,
      serverErrors: null,
    };

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_SUGN_UP_ACTION:
      return { ...state, isSignUp: true };

    case SET_USER_ACTION:
      Cookies.set('user', payload);
      return { ...state, ...payload };

    case SET_SERVER_ERRORS_ACTION:
      return { ...state, serverErrors: payload };

    case SET_USER_LOG_OUT_ACTION:
      Cookies.remove('user');
      return {
        serverErrors: null,
        isSignUp: false,
      };

    default:
      return state;
  }
};

export default user;
