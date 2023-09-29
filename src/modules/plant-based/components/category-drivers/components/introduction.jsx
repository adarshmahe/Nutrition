import classNames from 'classnames';
import React from 'react';
import style from '../category-drivers.module.scss';

import RightArrowIcon from '../../../../../assets/images/plant-based/right_arrow.svg';
import IntroductionIcon1 from '../../../../../assets/images/plant-based/category-1.png';
import IntroductionIcon2 from '../../../../../assets/images/plant-based/category-2.png';
import KeyDriversVideo from '../../../../../assets/videos/plant-based-key-drivers.mp4';

import { Col, Row } from 'antd';

const Introduction = () => {
  return <>
    <div className={classNames(style.labelHeader)} id="anchor-point-0">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Introduction</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.boxWrap1)}>
      <div className={classNames(style.desc1)}>
        The transition to more plant-based diets is primarily driven by health reasons, underpinned by broader ethical/environmental considerations.
      </div>
      <div style={{height: '20px'}}></div>
      <Row gutter={40}>
        <Col lg={10} md={24} className={classNames(style.desc2)}>
            Over the last decade the plant-based foods category grew exponentially, as a transition from animal rights being the (sole and) primary driving force, to a combination of multiple intrinsic and extrinsic drivers jet-fueled growth.
          <br></br>
            The stakes are higher than ever: to feed a future population of 10b people, the global consumption of plant-based foods will have to double, while consumption of (red) meat will have to be reduced by over 50%.
          <br></br>
            But there are also more personal forces at play. In this section you will learn about the overall category drivers for plant-based and key differences across regions and cohorts.
        </Col>
        <Col lg={14} md={24}>
          <img src={IntroductionIcon1} alt='' className={classNames(style.imgIcon1)}></img>
        </Col>
      </Row>
      <div style={{height: '40px'}}></div>
      <div className={classNames(style.labelHeader)}>
        <span className={classNames(style.label)}>Hear what our consumers say:</span>
      </div>
      <div style={{height: '10px'}}></div>
      <div className={classNames(style.videoBox)}>
        <video controls src={KeyDriversVideo}></video>
      </div>
    </div>

    <div style={{height: '43px'}}></div>
    <div className={classNames(style.labelHeader)} id="anchor-point-1">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>De-Averaged Category Drivers: By Region, Generation and Diet</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.boxWrap1)}>
      <div className={classNames(style.desc1)}>
        Ethical motivations increase with rising affluence, while socio-demographic factors are more prominent plant-based category drivers in D&E markets.
      </div>
      <div style={{height: '20px'}}></div>
      <img src={IntroductionIcon2} alt='' className={classNames(style.imgIcon1)}></img>
      <div className={classNames(style.bottomWrap)}>
        <div className={classNames(style.desc1)}>
        While Health unlocks the plant-based foods revolution among the masses, Ethical drivers are equally important among specific cohorts.
        </div>
        <div style={{height: '20px'}}></div>
        <Row gutter={40}>
          <Col lg={12} md={24} className={classNames(style.contentBox)}>
            <div className={style.labelBorder} style={{marginBottom: '16px'}}>
              <div className={classNames(style.tagLabel)}>GENERATION</div>
            </div>
            <div className={classNames(style.descBox)}>
              <span className={classNames(style.highlight)}>Sustainability</span> is a core driver for younger consumers (esp. Gen Z)-it is an equally strong motivation for them to adopt plant-forward eating patterns as their personal health and wellbeing.
              <div style={{height: '15px'}}></div>
              Older cohorts are predominantly driven by their <span className={classNames(style.highlight)}>own health</span> and less so by planetary he
            </div>
          </Col>
          <Col lg={12} md={24} className={classNames(style.contentBox)}>
            <div className={style.labelBorder} style={{marginBottom: '16px'}}>
              <div className={classNames(style.tagLabel)}>EATING PATTERN</div>
            </div>
            <div className={classNames(style.descBox)}>
              For Vegans & Vegetarians, <span className={classNames(style.highlight)}>animal rights</span> are the strongest driver, for Flexitarians it is <span className={classNames(style.highlight)}>health</span> .
              <div style={{height: '15px'}}></div>
              For Flexitarians there’s also a motivational shift over time: for those who have been on the plant-forward journey for longer, <span className={classNames(style.highlight)}>sustainability</span> and <span className={classNames(style.highlight)}>dietary diversity</span> gain importance.
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </>;
};

export default Introduction;