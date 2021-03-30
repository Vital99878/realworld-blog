import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classnames from 'classnames/bind';
import { message } from 'antd';
import PropTypes from 'prop-types';
import styles from '../Modal.module.scss';
import Error from '../components/Error';
import { editUserThunk } from '../../../redux/actions';

const cn = classnames.bind(styles);

const CLASS_NAME = 'form';

const Profile = ({ isSignUp, serverErrors, editUser, token, username, email, image }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (formData) => {
    setIsLoading(true);
    editUser(formData, token).then(() => {
      setIsLoading(false);
      message.info('Сhange successful!');
    });
  };

  if (!isSignUp) {
    return <Redirect to="/" />;
  }

  return (
    <form className={cn(CLASS_NAME)} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(`${CLASS_NAME}__title`)}>Edit Profile</h2>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Username</span>
        <input
          className={cn(`${CLASS_NAME}__input`, errors.username && `${CLASS_NAME}__input--error`)}
          type="text"
          name="username"
          ref={register({ required: true, minLength: 3, maxLength: 20 })}
          defaultValue={username}
        />
        {errors.username?.type === 'minLength' && <Error text="Your username needs to be at least 3 characters" />}
        {errors.username?.type === 'required' && <Error text="Username is required" />}
        {serverErrors?.username && <Error text={serverErrors.username} />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Email address</span>
        <input
          className={cn(`${CLASS_NAME}__input`, errors.email && `${CLASS_NAME}__input--error`)}
          type="email"
          name="email"
          ref={register({ required: true })}
          defaultValue={email}
        />
        {errors.email?.type === 'required' && <Error text="Email is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>New password</span>
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
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Avatar image (url)</span>
        <input
          className={cn(`${CLASS_NAME}__input`)}
          type="url"
          name="image"
          placeholder="Avatar image"
          ref={register()}
          defaultValue={image}
        />
      </label>
      <button type="submit" disabled={isLoading} className={cn(`${CLASS_NAME}__button`)}>
        {!isLoading ? 'Save' : 'Saving...'}
      </button>
    </form>
  );
};

const mapStateToProps = ({ user }) => ({
  ...user,
});

const mapDispatchToProps = {
  editUser: editUserThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.defaultProps = {
  serverErrors: {},
  token: '',
  username: '',
  image: '',
  email: '',
};

Profile.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  serverErrors: PropTypes.objectOf(),
  token: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  editUser: PropTypes.func.isRequired,
};
