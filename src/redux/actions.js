import RealworldBlogApi from '../api/realworldBlogApi';

const { getPosts, getPost, signUp, signIn, editUser, deletePost, likePost, dislikePost } = RealworldBlogApi;

export const STOP_LOADING_ACTION = 'STOP_LOADING_ACTION';
export const stopLoadingAction = () => ({
  type: STOP_LOADING_ACTION,
});

export const START_LOADING_ACTION = 'START_LOADING_ACTION';
export const startLoadingAction = () => ({
  type: START_LOADING_ACTION,
});

export const SET_POSTS_ACTION = 'SET_POSTS_ACTION';
export const setPostsAction = (payload) => ({
  type: SET_POSTS_ACTION,
  payload,
});

export const SET_POSTS_COUNT_ACTION = 'SET_POSTS_COUNT_ACTION';
export const setPostsCountAction = (payload) => ({
  type: SET_POSTS_COUNT_ACTION,
  payload,
});

export const SET_CURRENT_PAGE_ACTION = 'SET_CURRENT_PAGE_ACTION';
export const setCurrentPageAction = (payload) => ({
  type: SET_CURRENT_PAGE_ACTION,
  payload,
});

export const SET_POST_ACTION = 'OPEN_POST_ACTION';
export const setPostAction = (payload) => ({
  type: SET_POST_ACTION,
  payload,
});

export const SET_USER_ACTION = 'SET_USER_ACTION';
export const setUserAction = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return {
    type: SET_USER_ACTION,
    payload,
  }
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
  }
};

export const SET_LIKE_POST_ACTION = 'SET_LIKE_POST_ACTION';
export const setLikePostAction = (payload) => ({
  type: SET_LIKE_POST_ACTION,
  payload,
});

export const SET_DISLIKE_POST_ACTION = 'SET_DISLIKE_POST_ACTION';
export const setDislikePostAction = (payload) => ({
  type: SET_DISLIKE_POST_ACTION,
  payload,
});

export const getPostsThunk = (take, token) => async (dispatch) => {
  dispatch(startLoadingAction());
  const { articles, articlesCount } = await getPosts(take, token);
  dispatch(setPostsAction(articles));
  dispatch(setPostsCountAction(articlesCount));
  dispatch(stopLoadingAction());
};

export const getPostThunk = (slug, token) => async (dispatch) => {
  const { article } = await getPost(slug, token);
  dispatch(setPostAction(article));
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

export const deletePostThunk = (slug, token) => async (dispatch) => {
  await deletePost(slug, token);
  dispatch(setPostAction(null));
};

export const likePostThunk = (slug, token) => async (dispatch) => {
  const { article } = await likePost(slug, token);
  dispatch(setLikePostAction(article));
};

export const dislikePostThunk = (slug, token) => async (dispatch) => {
  const { article } = await dislikePost(slug, token);
  dispatch(setDislikePostAction(article));
};
