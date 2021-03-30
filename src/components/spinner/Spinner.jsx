import React from 'react';
import { Spin } from 'antd';
import classnames from 'classnames/bind';
import styles from './Spinner.module.scss';

const cn = classnames.bind(styles);

const Spinner = () => (
  <div className={cn('spinner-wrapper')}>
    <Spin wrapperClassName={cn('spinner-wrapper')} size="large" />
  </div>
);

export default Spinner;
