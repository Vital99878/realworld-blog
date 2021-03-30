import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import Error from '../components';
import styles from '../Modal.module.scss';
import { signInThunk } from '../../../redux/actions';

const cn = classnames.bind(styles);

const CLASS_NAME = 'form';

const SignIn = ({ isSignUp, serverErrors, signIn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (formData) => {
    setIsLoading(true);
    signIn(formData).then(() => {
      setIsLoading(false);
    });
  };

  if (isSignUp) {
    return <Redirect to="/" />;
  }

  return (
    <form className={cn(CLASS_NAME)} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(`${CLASS_NAME}__title`)}>Sign In</h2>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Email address</span>
        <input
          className={cn(`${CLASS_NAME}__input`, errors.email && `${CLASS_NAME}__input--error`)}
          type="email"
          name="email"
          ref={register({ required: true })}
          placeholder="Email address"
        />
        {errors.email?.type === 'required' && <Error text="Email is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Password</span>
        <input
          className={cn(`${CLASS_NAME}__input`, errors.password && `${CLASS_NAME}__input--error`)}
          type="password"
          ref={register({ required: true, minLength: 8, maxLength: 40 })}
          name="password"
          placeholder="Password"
        />
        {errors.password?.type === 'minLength' && <Error text="Your password needs to be at least 8 characters" />}
        {errors.password?.type === 'required' && <Error text="Password is required" />}
      </label>
      <button type="submit" disabled={isLoading} className={cn(`${CLASS_NAME}__button`)}>
        {!isLoading ? 'Login' : 'Loggining...'}
      </button>
      {serverErrors?.['email or password'] && <Error text={`Email or password ${serverErrors['email or password']}`} />}
      <span className={cn(`${CLASS_NAME}__login`)}>
        Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </form>
  );
};

const mapStateToProps = ({ user }) => ({
  ...user,
});

const mapDispatchToProps = {
  signIn: signInThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.defaultProps = {
  serverErrors: {},
};

SignIn.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  serverErrors: PropTypes.objectOf(),
  signIn: PropTypes.func.isRequired,
};
