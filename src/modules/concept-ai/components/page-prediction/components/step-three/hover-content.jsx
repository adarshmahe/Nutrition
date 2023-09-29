import React from 'react';
import PropTypes from 'prop-types';
import BorderLight from '../../../border-light/border-light.jsx';
import style from './hover.module.scss';

function HoverContent({children}) {
  return (
    <BorderLight wrapperClass={style.hoverHeatmap}>
      <div className={style.hoverContent}>
        <div className={style.mainContent}>
          {children}
        </div>
        <div className={style.tips}>Words highlighted in green indicate a positive contribution to the expected result(outstanding), while words highlighted in red signify a negative impact. The brighter the shade, the more significant the impact</div>
      </div>
    </BorderLight>
  );
}

HoverContent.propTypes = {
  children: PropTypes.any
};

export default HoverContent;