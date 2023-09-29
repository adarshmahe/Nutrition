import React from 'react';
import PropTypes from 'prop-types';
import style from './border-light.module.scss';
import classNames from 'classnames';

function BorderLight({ wrapperClass, children }) {
  return (
    <div className={classNames(style.lightBorderContainer, wrapperClass)}>
      <div className={style.lightBox}></div>
      <svg className={classNames(style.borderSvg, style.borderSvg1)} width="100" height="100">
        <defs>
          <path id="border-box-path-11" d="M2 50 L2 2" fill="transparent" />
          <path id="border-box-path-22" d="M0 2 L100 2 L100 30" fill="transparent" />
          <radialGradient id="border-box-gradient-11" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="border-box-mask-11">
            <circle cx="0" cy="0" r="100" fill="url(#border-box-gradient-11)">
            </circle>
          </mask>
          <mask id="border-box-mask-33">
            <circle cx="200" cy="198" r="120" fill="url(#border-box-gradient-11)">
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-11"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-22"
          mask="url(#border-box-mask-11)"
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg3)} width="200" height="200">
        <defs>
          <path id="border-box-path-55" d="M198 140 L198 200" fill="transparent" />
          <path id="border-box-path-66" d="M200 198 L0 198 L0 0" fill="transparent" />
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="6"
          xlinkHref="#border-box-path-55"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-66"
          mask="url(#border-box-mask-33)"
        >
        </use>
      </svg>
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