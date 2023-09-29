import React from 'react';
import BorderContainer from '../border-container/border-container.jsx';
import style from './custom-modal.module.scss';
import classNames from 'classnames';
import PopupHeaderBg from '../../../../assets/images/plant-based/popup-header.svg';
import CloseBtnSvg from '../../../../assets/images/plant-based/close-icon.svg';

const CustomModal = ({children, title='', onClose}) => {

  return <>
    <div className={classNames(style.borderWrap)}>
      <div className={classNames(style.modelHeader)}>
        <img src={PopupHeaderBg} alt="" className={classNames(style.bgImg)} />
        <img src={CloseBtnSvg} alt="" className={classNames(style.closeBtnIcon)} onClick={onClose}/>
        <div className={classNames(style.headerTitle)}>
          {title}
        </div>
      </div>
      <BorderContainer showTL={false}>
        <div className={classNames(style.content)}>
          {children}
        </div>
      </BorderContainer>
    </div>
  </>;
};

export default CustomModal;