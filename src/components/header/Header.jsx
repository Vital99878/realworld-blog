import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import { setUserLogOutAction } from '../../redux/actions';
import styles from './Header.module.scss';
import userAvatar from '../post/img/Rectangle-1.png';

const cn = classnames.bind(styles);

const Header = ({ isSignUp, username, image, logOut }) => (
  <div className={cn('header-container')}>
    <header className={cn('header')}>
      <Link className={cn('title')} to="/">
        Realworld Blog
      </Link>
      {!isSignUp && (
        <>
          <Link className={cn('button', 'button--sign-in')} to="/sign-in">
            Sign In
          </Link>
          <Link className={cn('button', 'button--sign-up')} to="/sign-up">
            Sign Up
          </Link>
        </>
      )}
      {isSignUp && (
        <>
          <Link className={cn('create-article')} to="/new-article">
            Create article
          </Link>
          <Link to="/profile">
            <div className={cn('user')}>
              <span className={cn('user__name')}>{username}</span>
              <img className={cn('user__avatar')} src={image || userAvatar} alt="" />
            </div>
          </Link>
          <button type="button" onClick={logOut} className={cn('button', 'button--log-out')}>
            Log Out
          </button>
        </>
      )}
    </header>
  </div>
);

const mapStateToProps = ({ user }) => ({
  ...user,
});

const mapDispatchToProps = {
  logOut: setUserLogOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.defaultProps = {
  username: '',
  image: '',
};

Header.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  username: PropTypes.string,
  image: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};
