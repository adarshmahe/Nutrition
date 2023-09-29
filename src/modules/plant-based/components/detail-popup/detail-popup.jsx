import React, { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import classNames from 'classnames';
import style from './detail-popup.module.scss';

import TasteBg from '../../../../assets/images/plant-based/taste-bg.png';
import EthicsBg from '../../../../assets/images/plant-based/ethics-bg.png';
import HealthBg from '../../../../assets/images/plant-based/health-bg.png';

import { Modal } from 'antd';

const dataObj = {
  'taste': {
    bg: TasteBg,
    desc: 'Get inspired by how UK brand Plantastic communicates verbally and non-verbally the great taste and texture of their products',
    ques: 'How can you cue great TASTE?',
    tags: ['Taste claims', 'Texture', 'Colourful', 'Flavour blends', 'Real/Artisanal', 'High quality', 'Freshness']
  },
  'health': {
    bg: HealthBg,
    desc: 'Get inspired by how UK brand BOL communicates the goodness of their products with powerful, easy to grasp claims',
    ques: 'How can you cue HEALTH?',
    tags: ['High protein', 'Organic', 'Fortified', 'Positive nutrition', 'Clean label', 'Natural ingredients', 'Low baddies']
  },
  'ethics': {
    bg: EthicsBg,
    desc: 'Get inspired by how SG brand WhatIF Foods communicates the impact of their regenerative crops used for their products',
    ques: 'How can you cue ETHICS?',
    tags: ['Sustainably grown', 'Fairtrade', 'Ecolabel', 'Carbon neutral', 'Recyclable', 'Deforestation free', 'Biodegradable']
  }
};

const DetailPopup = ({open, onClose, type}) => {
  const [curDetail, setCurDetail] = useState({});
  useEffect(() => {
    setCurDetail(dataObj[type]);
  }, [type]);

  return <Modal open={open} closeIcon={false} width="85%" footer={false} className={style.customModalWrap}  destroyOnClose={true}>
    <CustomModal title='INSPRIATION' onClose={onClose}>
      <div className={classNames(style.content)}>
        <img src={curDetail?.bg} alt='' className={classNames(style.imgBg)}></img>

        <div className={classNames(style.descBox)}>
          <div className={classNames(style.desc)}>
            {curDetail?.desc}
          </div>
          <div className={classNames(style.tagTitle)}>
            {curDetail?.ques}
          </div>
          <div className={classNames(style.tagList)}>
            {
              (curDetail?.tags || []).map((item, index) => <div className={classNames(style.tag)} key={index}>{item}</div>)
            }
          </div>
        </div>
      </div>
    </CustomModal>
  </Modal>;
};

export default DetailPopup;