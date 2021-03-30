import React from 'react';
import classnames from 'classnames/bind';
import styles from './Error.module.scss';

const cn = classnames.bind(styles)

const Error = ({ text }) => (
  <span className={cn('error-text')}>{text}</span>
);

export default Error;
