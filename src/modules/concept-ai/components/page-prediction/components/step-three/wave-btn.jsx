import React from 'react';
import style from './btn.module.scss';

function WaveBtn() {
  return (
    <div className={style.waveBtnCom}>
      <div className="wave-btn">
        <div className="waves-1"></div>
        <div className="waves-2"></div>
        <div className="waves-3"></div>
        <div className="view-more">Please hover on heatmap to see details</div>
      </div>
    </div>
  );
}

export default WaveBtn;