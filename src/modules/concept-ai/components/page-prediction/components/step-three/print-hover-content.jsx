import React from 'react';
import PropTypes from 'prop-types';
import BorderLightPrint from '../../../border-light/print-border.jsx';
import style from './hover.module.scss';

function HoverContent({children}) {
  return (
    <BorderLightPrint>
      <div className={style.hoverContent}>
        <div className={style.mainContent}>
          {children}
        </div>
      </div>
    </BorderLightPrint>
  );
}

HoverContent.propTypes = {
  children: PropTypes.any
};

export default HoverContent;