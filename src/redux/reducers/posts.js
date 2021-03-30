import {
  START_LOADING_ACTION,
  STOP_LOADING_ACTION,
  SET_POSTS_ACTION,
  SET_POSTS_COUNT_ACTION,
  SET_CURRENT_PAGE_ACTION,
  SET_POST_ACTION,
  SET_LIKE_POST_ACTION,
  SET_DISLIKE_POST_ACTION,
} from '../actions';

export const initialState = {
  isLoading: false,
  posts: [],
  openedPost: null,
  postsCount: 0,
  currentPage: 1,
};

const posts = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING_ACTION:
      return { ...state, isLoading: true };

    case STOP_LOADING_ACTION:
      return { ...state, isLoading: false };

    case SET_POSTS_ACTION:
      return { ...state, posts: payload };

    case SET_POSTS_COUNT_ACTION:
      return { ...state, postsCount: payload };

    case SET_CURRENT_PAGE_ACTION:
      return { ...state, currentPage: payload };
    
    case SET_POST_ACTION:
      return { ...state, openedPost: payload};

    case SET_LIKE_POST_ACTION:
      console.log(payload);
      return { ...state, openedPost: payload, posts: state.posts.map(post => post.slug === payload.slug ? payload : post)};

    case SET_DISLIKE_POST_ACTION:
      return { ...state, openedPost: payload, posts: state.posts.map(post => post.slug === payload.slug ? payload : post)};

    default:
      return state;
  }
};

export default posts;