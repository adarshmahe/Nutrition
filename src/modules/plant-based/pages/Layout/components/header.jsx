import React from 'react';
import classNames from 'classnames';
import style from './commen.module.scss';

import PlantLogo from '../../../../../assets/images/plant-based/plant-based-logo.png';

const PlantHeader = () => {
  return <>
    <div className={classNames(style.headerWrap, style.headerHeight)}>
      <img src={PlantLogo} style={{height: '60px'}}></img>
    </div>
    <div className={classNames(style.headerHeight)}></div>
  </>;
};

export default PlantHeader;
