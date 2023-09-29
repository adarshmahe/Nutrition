import React from 'react';
import PropTypes from 'prop-types';
import style from './border-light.module.scss';
import classNames from 'classnames';

function BorderLight({ children }) {
  return (
    <div className={classNames(style.lightBorderContainer, style.print)}>
      <div className={style.lightBox}></div>
      <div className={classNames(style.borderImg, style.borderImg1)}></div>
      <div className={classNames(style.borderImg, style.borderImg3)}></div>
      <div className={style.borderBoxContent}>
        {children}
      </div>
    </div>
  );
}

BorderLight.propTypes = {
  children: PropTypes.any
};

export default BorderLight;