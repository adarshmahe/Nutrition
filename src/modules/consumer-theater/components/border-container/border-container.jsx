import React from 'react';
import PropTypes from 'prop-types';
import style from './border-container.module.scss';
import classNames from 'classnames';

function BorderContainer({ id, children }) {

  const borderBoxPath1 = 'border-box-path-1' + id;
  const borderBoxPath2 = 'border-box-path-2' + id;
  const borderBoxPath3 = 'border-box-path-3' + id;
  const borderBoxPath4 = 'border-box-path-4' + id;
  const borderBoxPath5 = 'border-box-path-5' + id;
  const borderBoxPath6 = 'border-box-path-6' + id;
  const borderBoxPath7 = 'border-box-path-7' + id;
  const borderBoxPath8 = 'border-box-path-8' + id;
  const borderBoxMask1 = 'border-box-mask-1' + id;
  const borderBoxMask2 = 'border-box-mask-2' + id;
  const borderBoxMask3 = 'border-box-mask-3' + id;
  const borderBoxMask4 = 'border-box-mask-4' + id;
  const borderBoxGradient = 'border-box-gradient' + id;

  return (
    <div className={style.lightBorderContainer}>
      <svg className={classNames(style.borderSvg, style.borderSvg1)} width="100" height="100">
        <defs>
          <path id={borderBoxPath1} d="M2 50 L2 2" fill="transparent" />
          <path id={borderBoxPath2} d="M0 2 L100 2 L100 30" fill="transparent" />
          <radialGradient id={borderBoxGradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={borderBoxMask1}>
            <circle cx="0" cy="0" r="100" fill={`url(#${borderBoxGradient})`}>
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath1}`}
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath2}`}
          mask={`url(#${borderBoxMask1})`}
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg2)} width="100" height="150">
        <defs>
          <path id={borderBoxPath3} d="M98 150 L98 2" fill="transparent" />
          <path id={borderBoxPath4} d="M0 2 L100 2 L100 30" fill="transparent" />
          <radialGradient id={borderBoxGradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={borderBoxMask2}>
            <circle cx="100" cy="2" r="100" fill={`url(#${borderBoxGradient})`}>
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath3}`}
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath4}`}
          mask={`url(#${borderBoxMask2})`}
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg3)} width="200" height="200">
        <defs>
          <path id={borderBoxPath5} d="M198 50 L198 200" fill="transparent" />
          <path id={borderBoxPath6} d="M200 198 L0 198 L0 150" fill="transparent" />
          <radialGradient id={borderBoxGradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={borderBoxMask3}>
            <circle cx="200" cy="198" r="150" fill={`url(#${borderBoxGradient})`}>
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath5}`}
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath6}`}
          mask={`url(#${borderBoxMask3})`}
        >
        </use>
      </svg>
      <svg className={classNames(style.borderSvg, style.borderSvg4)} width="200" height="200">
        <defs>
          <path id={borderBoxPath7} d="M2 50 L2 200" fill="transparent" />
          <path id={borderBoxPath8} d="M0 198 L150 198 L150 150" fill="transparent" />
          <radialGradient id={borderBoxGradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={borderBoxMask4}>
            <circle cx="0" cy="198" r="150" fill={`url(#${borderBoxGradient})`}>
            </circle>
          </mask>
        </defs>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath7}`}
        >
        </use>
        <use
          stroke="#00FF00"
          strokeWidth="4"
          xlinkHref={`#${borderBoxPath8}`}
          mask={`url(#${borderBoxMask4})`}
        >
        </use>
      </svg>
      <div className={style.borderBoxContent}>
        {children}
      </div>
    </div>
  );
}

BorderContainer.defaultProps = {
  id: ''
};

BorderContainer.propTypes = {
  children: PropTypes.any
};

export default BorderContainer;