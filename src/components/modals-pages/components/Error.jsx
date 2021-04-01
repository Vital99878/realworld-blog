import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Error.module.scss';

const cn = classnames.bind(styles);

const Error = ({ text }) => <span className={cn('error-text')}>{text}</span>;

export default Error;

Error.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};
