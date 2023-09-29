import React from 'react';
import PropTypes from 'prop-types';
import style from './border-container.module.scss';
import classNames from 'classnames';

function BorderContainer({ children }) {
  return (
    <div className={style.lightBorderContainer}>
      <div className={style.lightBox}></div>
      <svg className={classNames(style.borderSvg, style.borderSvg1)} width="100" height="100">
        <defs>
          <path id="border-box-path-1" d="M2 50 L2 2" fill="transparent" />
          <path id="border-box-path-2" d="M0 2 L100 2 L100 30" fill="transparent" />
          <radialGradient id="border-box-gradient-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="border-box-mask-1">
            <circle cx="0" cy="0" r="100" fill="url(#border-box-gradient-1)">
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-1"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-2"
          mask="url(#border-box-mask-1)"
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg2)} width="100" height="150">
        <defs>
          <path id="border-box-path-3" d="M98 150 L98 2" fill="transparent" />
          <path id="border-box-path-4" d="M0 2 L100 2 L100 30" fill="transparent" />
          <radialGradient id="border-box-gradient-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="border-box-mask-2">
            <circle cx="100" cy="2" r="100" fill="url(#border-box-gradient-1)">
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-3"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-4"
          mask="url(#border-box-mask-2)"
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg3)} width="200" height="200">
        <defs>
          <path id="border-box-path-5" d="M198 50 L198 200" fill="transparent" />
          <path id="border-box-path-6" d="M200 198 L0 198 L0 150" fill="transparent" />
          <radialGradient id="border-box-gradient-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="border-box-mask-3">
            <circle cx="200" cy="198" r="150" fill="url(#border-box-gradient-1)">
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-5"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-6"
          mask="url(#border-box-mask-3)"
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg4)} width="200" height="200">
        <defs>
          <path id="border-box-path-7" d="M2 50 L2 200" fill="transparent" />
          <path id="border-box-path-8" d="M0 198 L150 198 L150 150" fill="transparent" />
          <radialGradient id="border-box-gradient-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="border-box-mask-4">
            <circle cx="0" cy="198" r="150" fill="url(#border-box-gradient-1)">
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-7"
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref="#border-box-path-8"
          mask="url(#border-box-mask-4)"
        >
        </use>
      </svg>
      <div className={style.borderBoxContent}>
        {children}
      </div>
    </div>
  );
}

BorderContainer.propTypes = {
  children: PropTypes.any
};

export default BorderContainer;