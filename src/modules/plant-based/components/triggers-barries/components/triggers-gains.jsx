import classNames from 'classnames';
import React, { useState } from 'react';
import style from '../triggers-barries.module.scss';

import RightArrowIcon from '../../../../../assets/images/plant-based/right_arrow.svg';
import LightBallIcon from '../../../../../assets/images/plant-based/light-ball.svg';

import { Col, Row } from 'antd';
import CommonBtn from '../../common-btn/common-btn.jsx';

import BgIcon1 from '../../../../../assets/images/plant-based/bg-icon-1.png';
import BgIcon2 from '../../../../../assets/images/plant-based/bg-icon-2.png';
import BgIcon3 from '../../../../../assets/images/plant-based/bg-icon-3.png';
import BgIcon4 from '../../../../../assets/images/plant-based/bg-icon-4.png';
import BgIcon5 from '../../../../../assets/images/plant-based/bg-icon-5.png';
import DetailPopup from '../../detail-popup/detail-popup.jsx';

import TriggersVideo from '../../../../../assets/videos/plant-based-triggers.mp4';

const TriggersGains = () => {
  const [hoverTag, setHoverTag] = useState('');
  const [openDetailWin, setOpenDetailWin] = useState(false);
  const [popupType, setPopupType] = useState('taste');

  const fnOpenDetailWin = (type) => {
    setPopupType(type);
    setOpenDetailWin(true);
  };

  const fnCloseDetailWin = () => {
    setOpenDetailWin(false);
  };

  const fnMouseOver = (tag) => {
    setHoverTag(tag);
  };

  const fnMouseLeave = () => {
    setHoverTag('');
  };

  return <>
    <div className={classNames(style.labelHeader)} id="anchor-point-0">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Intro to plant-based gains</span>
    </div>
    <div style={{height: '30px'}}></div>
    <Row gutter={40}>
      <Col lg={12} md={24} className={classNames(style.desc2)}>
        <div className={classNames(style.subTitle1)}>WE ARE SEEING A PLANT-BASED FOODS REVOLUTION TODAY</div>
        <div style={{height: '10px'}}></div>
        <div className={classNames(style.desc1)}>
        fueled by increased media attention and celebrity endorsement that put a spotlight on a broad range of benefits, plant-forward eating has outgrown its niche status to become an aspirational lifestyle for the masses.
        in this section you will learn more about the gains associated with plant-forward eating patterns (from the consumer lens), and plant-based product purchase triggers (from the shopper lens).
        </div>
      </Col>
      <Col lg={12} md={24}>
        <div className={classNames(style.subTitle1)}>Hear what our consumers say:</div>
        <div style={{height: '10px'}}></div>
        <video style={{width: '100%'}} controls src={TriggersVideo}></video>
      </Col>
    </Row>

    <div className={classNames(style.labelHeader)} id="anchor-point-1">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Plant-forward eating pattern gains</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.desc2)}>
    Plant-forward eating patterns are on the rise and are likely to become the new norm, considering they serve a myriad of benefits.
    </div>
    <div style={{height: '20px'}}></div>
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize:'10px', color: '#fff'}}>Explore benefits:</div>
      <div style={{height: '10px'}}></div>
      <div>
        <CommonBtn checked={hoverTag === 'functional'} label="FUNCTIONAL"></CommonBtn>
        <CommonBtn checked={hoverTag === 'emotional'} label="EMOTIONAL"></CommonBtn>
      </div>
    </div>
    <div style={{height: '8px'}}></div>
    <Row gutter={40}>
      <Col lg={12} md={24}>
        <div className={classNames(style.imgContentBox)} onMouseOver={() => fnMouseOver('functional')} onMouseLeave={fnMouseLeave}>
          <img src={BgIcon1} alt='' style={{width: '100%', height: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Fresher & Lighter:</div>
            <div className={classNames(style.val)}>Less heavy food, moving away from traditional heavy cuisines, helps digestion & sleep</div>
            <div className={classNames(style.label)}>Balanced & Wholesome:</div>
            <div className={classNames(style.val)}>Getting goodness from a variety of sources, helps digestion & sleep</div>
            <div className={classNames(style.label)}>Vital Energy:</div>
            <div className={classNames(style.val)}>Feeling energized, active & full of life, living better & longer</div>
            <div className={classNames(style.label)}>Clean & Pure:</div>
            <div className={classNames(style.val)}>Helps to eat in a more natural way, keeping the body free from antibiotics & hormones</div>
          </div>
        </div>
      </Col>
      <Col lg={12} md={24}>
        <div className={classNames(style.imgContentBox)} onMouseOver={() => fnMouseOver('emotional')} onMouseLeave={fnMouseLeave}>
          <img src={BgIcon2} alt='' style={{width: '100%', height: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Pride:</div>
            <div className={classNames(style.val)}>Contributing to a more sustainable food system & a healthy planet makes one feel proud</div>
            <div className={classNames(style.label)}>Mindful:</div>
            <div className={classNames(style.val)}>Helps to be more purposeful and responsible in one’s choices</div>
            <div className={classNames(style.label)}>Balanced:</div>
            <div className={classNames(style.val)}>Helps to live a life of balance and moderation</div>
            <div className={classNames(style.label)}>Modern & Progressive:</div>
            <div className={classNames(style.val)}>Motivates to try new things (in a safe way)</div>
          </div>
        </div>
      </Col>
    </Row>
    <div style={{height: '40px'}}></div>

    <div className={classNames(style.labelHeader)} id="anchor-point-2">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Plant-Based purchase Triggers</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.desc2)}>
    To deliver against consumer expectations and drive conversion at the POS, plant-based products must communicate boldly on holistic superiority drivers.
    </div>
    <div style={{height: '20px'}}></div>
    <Row gutter={40}>
      <Col lg={8} md={24}>
        <div className={style.labelBorder} style={{marginBottom: '16px'}}>
          <div className={classNames(style.tagLabel)}>TASTE</div>
        </div>
        <div className={classNames(style.imgContentBox)} style={{height: '320px'}}>
          <img src={BgIcon3} alt='' style={{width: '100%', height: '100%'}}></img>
          <div className={classNames(style.detailBox, style.detailBox2)}>
            <div className={classNames(style.desc)}>Taste cues & claims that overcome bland taste barrier associated with plant-based meals</div>
            <div className={classNames(style.btnBox)} onClick={() => fnOpenDetailWin('taste')}>
              <img src={LightBallIcon} alt='' width={'15px'} style={{marginRight: '5px'}}></img>
              INSPIRATION
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={24}>
        <div className={style.labelBorder} style={{marginBottom: '16px'}}>
          <div className={classNames(style.tagLabel)}>HEALTH</div>
        </div>
        <div className={classNames(style.imgContentBox)} style={{height: '320px'}}>
          <img src={BgIcon4} alt='' style={{width: '100%', height: '100%'}}></img>
          <div className={classNames(style.detailBox, style.detailBox2)}>
            <div className={classNames(style.desc)}>Good nutritional values, cleaner label with no harmful ingredients and as natural as possible</div>
            <div className={classNames(style.btnBox)} onClick={() => fnOpenDetailWin('health')}>
              <img src={LightBallIcon} alt='' width={'15px'} style={{marginRight: '5px'}}></img>
              INSPIRATION
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={24}>
        <div className={style.labelBorder} style={{marginBottom: '16px'}}>
          <div className={classNames(style.tagLabel)}>ETHICS</div>
        </div>
        <div className={classNames(style.imgContentBox)} style={{height: '320px'}}>
          <img src={BgIcon5} alt='' style={{width: '100%', height: '100%'}}></img>
          <div className={classNames(style.detailBox, style.detailBox2)}>
            <div className={classNames(style.desc)}>Sustainably & ethically sourced, processed and packaged</div>
            <div className={classNames(style.btnBox)} onClick={() => fnOpenDetailWin('ethics')}>
              <img src={LightBallIcon} alt='' width={'15px'} style={{marginRight: '5px'}}></img>
              INSPIRATION
            </div>
          </div>
        </div>
      </Col>
    </Row>

    <DetailPopup open={openDetailWin} onClose={fnCloseDetailWin} type={popupType}></DetailPopup>
  </>;
};

export default TriggersGains;