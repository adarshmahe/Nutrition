import React from 'react';
import style from './step-two.module.scss';
import SelectorOptions from './selector-options.jsx';

function AddressingCom() {
  return (
    <div className={style.addressCom}>
      <div className={style.title}>Is this new idea addressing:</div>
      <SelectorOptions />
      <div className={style.addressInfo}>Please select one or multiple choices.</div>
    </div>
  );
}

export default AddressingCom;