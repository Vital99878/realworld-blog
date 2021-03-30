import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signUpThunk } from '../../../redux/actions';
import Error from '../components';
import classnames from 'classnames/bind';
import styles from '../Modal.module.scss';

const cn = classnames.bind(styles);

const CLASS_NAME = 'form';

const SignUp = ({ isSignUp, serverErrors, signUp  }) => { 

  let [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = formData => {
    setIsLoading(true);
    signUp(formData).then(() => {
      setIsLoading(false);
    });
  };
  const password = useRef({});
  password.current = watch( 'password', '' );

  if (isSignUp) {
    return <Redirect to="/" />
  }

  return (
    <form className={cn(CLASS_NAME)}  onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(`${CLASS_NAME}__title`)}>Create new account</h2>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Username</span>
        <input 
          className={cn(`${CLASS_NAME}__input`, errors.username && `${CLASS_NAME}__input--error`)} 
          type="text" 
          name="username" 
          ref={register({ required: true, minLength: 3, maxLength: 20 })} 
          placeholder="Username"
        />
        {errors.username?.type === "minLength" && <Error text="Your username needs to be at least 3 characters" />}
        {errors.username?.type === "required" && <Error text="Username is required" />}
        {serverErrors?.username && <Error text={serverErrors.username} />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Email address</span>
        <input 
          className={cn(`${CLASS_NAME}__input`, errors.email && `${CLASS_NAME}__input--error`)}
          type="email" 
          name="email"  
          ref={register({required: true})} 
          placeholder="Email address"
        />
        {errors.email?.type === "required" && <Error text="Email is required" />}
        {serverErrors?.email && <Error text={serverErrors.email} />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Password</span>
        <input 
          className={cn(`${CLASS_NAME}__input`, errors.password && `${CLASS_NAME}__input--error`)} 
          type="password" 
          ref={register({required: true, minLength: 8, maxLength: 40})} 
          name="password" 
          placeholder="Password"
        />
        {errors.password?.type === "minLength" && <Error text="Your password needs to be at least 8 characters" />}
        {errors.password?.type === "required" && <Error text="Password is required" />}
        {serverErrors?.password && <Error text={serverErrors.password} />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__label-text`)}>Repeat password</span>
        <input 
          className={cn(`${CLASS_NAME}__input`, errors.repeatPassword && `${CLASS_NAME}__input--error`)}  
          ref={register({validate: value => value === password.current || <Error text='The passwords do not match' />, required: true, minLength: 8, maxLength: 40})} 
          type="password" 
          placeholder="Password"
          name="repeatPassword"
        />
        {errors.repeatPassword && errors.repeatPassword.message}
        {errors.repeatPassword?.type === "required" && <Error text="Repeat password" />}
        {errors.repeatPassword?.type === "minLength" && <Error text="Your password needs to be at least 6 characters" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label-checkbox`)}>
        <input 
          className={cn(`${CLASS_NAME}__input-checkbox`)} 
          type="checkbox" 
          name="agreement" 
          ref={register({required: true})} 
        />
        <div>
          <span className={cn(`${CLASS_NAME}__input-checkbox-text`)}>I agree to the processing of my personal information</span>
          {errors.agreement?.type === "required" && <Error text="You must agree to the terms of the privacy policy." />}
        </div>
      </label>
      <button disabled={isLoading} className={cn(`${CLASS_NAME}__button`)}>{!isLoading ? 'Create' : 'Creating...'}</button>
      <span className={cn(`${CLASS_NAME}__login`)}>Already have an account? <Link to="/sign-in">Sign In.</Link></span>
    </form>
  ) 
}

const mapStateToProps = ({ user }) => ({
  ...user,
});

const mapDispatchToProps = {
  signUp: signUpThunk,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
