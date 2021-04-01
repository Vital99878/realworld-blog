import RealworldBlogApi from '../../api/realworldBlogApi';

const { signUp, signIn, editUser } = RealworldBlogApi;

export const SET_USER_ACTION = 'SET_USER_ACTION';
export const setUserAction = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return {
    type: SET_USER_ACTION,
    payload,
  };
};

export const SET_USER_SUGN_UP_ACTION = 'SET_USER_SUGN_UP_ACTION';
export const setUserSignUpAction = () => ({
  type: SET_USER_SUGN_UP_ACTION,
});

export const SET_SERVER_ERRORS_ACTION = 'SET_SERVER_ERRORS_ACTION';
export const setServerErrorsAction = (payload) => ({
  type: SET_SERVER_ERRORS_ACTION,
  payload,
});

export const SET_USER_LOG_OUT_ACTION = 'SET_USER_LOG_OUT_ACTION';
export const setUserLogOutAction = () => {
  localStorage.removeItem('user');
  return {
    type: SET_USER_LOG_OUT_ACTION,
  };
};

export const signUpThunk = (userData) => async (dispatch) => {
  const response = await signUp(userData);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setServerErrorsAction(null));
    dispatch(setUserSignUpAction());
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
};

export const signInThunk = (userData) => async (dispatch) => {
  const response = await signIn(userData);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setServerErrorsAction(null));
    dispatch(setUserSignUpAction());
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
};

export const editUserThunk = (userData, token) => async (dispatch) => {
  const response = await editUser(userData, token);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setServerErrorsAction(null));
    dispatch(setUserSignUpAction());
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }

  return response;
};
