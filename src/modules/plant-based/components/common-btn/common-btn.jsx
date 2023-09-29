import classNames from 'classnames';
import React from 'react';
import style from './common-btn.module.scss';

const CommonBtn = ({label, checked= false, onClick}) => {
  return <div className={classNames(style.btnWrap, checked && style.active)} onClick={onClick}>
    {label}
  </div>;
};

export default CommonBtn;