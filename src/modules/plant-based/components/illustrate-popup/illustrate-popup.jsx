import React, { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import classNames from 'classnames';
import style from './illustrate-popup.module.scss';

import BallBgIcon from '../../../../assets/images/plant-based/ball.svg';

import IllusIcon1 from '../../../../assets/images/plant-based/illustrate-icon-1.svg';
import IllusIcon2 from '../../../../assets/images/plant-based/illustrate-icon-2.svg';
import IllusIcon3 from '../../../../assets/images/plant-based/illustrate-icon-3.svg';
import IllusIcon4 from '../../../../assets/images/plant-based/illustrate-icon-4.svg';
import IllusIcon5 from '../../../../assets/images/plant-based/illustrate-icon-5.svg';
import IllusIcon6 from '../../../../assets/images/plant-based/illustrate-icon-6.svg';
import IllusIcon7 from '../../../../assets/images/plant-based/illustrate-icon-7.svg';
import IllusIcon8 from '../../../../assets/images/plant-based/illustrate-icon-8.svg';
import IllusIcon9 from '../../../../assets/images/plant-based/illustrate-icon-9.svg';
import IllusIcon10 from '../../../../assets/images/plant-based/illustrate-icon-10.svg';
import IllusIcon11 from '../../../../assets/images/plant-based/illustrate-icon-11.svg';
import { Modal } from 'antd';

const dataList1 = [
  {
    icon: IllusIcon1,
    title: 'CARNIVORE',
    desc: 'I eat meat and/or fish (almost) every day – like I have always done and I am not interested in reducing the amount I consume. '
  },
  {
    icon: IllusIcon2,
    title: 'OMNIVORE',
    desc: 'I am not avoiding meat and/or fish, but I try to follow a healthier and more balanced diet and eat more vegetables / grains / pulses than I used to.'
  },
  {
    icon: IllusIcon3,
    title: 'LIGHT FLEXITARIAN',
    desc: 'I am still eating meat and/or fish, but I have consciously started to reduce my consumption (e.g. meat-free day once a week).'
  },
  {
    icon: IllusIcon4,
    title: 'HEAVY FLEXITARIAN',
    desc: 'I have definitely cut down on the amount of meat and/or fish which I now only occasionally consume, with the majority of meals being meat-free.'
  },
  {
    icon: IllusIcon5,
    title: 'VEGETARIAN',
    desc: 'I am a vegetarian and I have cut out all types of meat and fish from my diet completely, but still consume dairy and eggs.'
  },
  {
    icon: IllusIcon6,
    title: 'VEGAN',
    desc: 'I am a vegan and have cut out all foods that come from an animal (incl. meat, fish, eggs, dairy, etc.) from my diet completely.'
  }
];

const dataList2 = [
  {
    icon: IllusIcon7,
    title: 'ANIMAL MEAT',
    desc: 'Any form of meat that comes from an animal, like beef, pork, lamb, chicken, turkey, etc. '
  },
  {
    icon: IllusIcon8,
    title: 'MEAT SUBSTITUTES',
    desc: 'Plant-based equivalents of animal meat cuts (similar looks, taste, functionality), like plant-based mince, burgers, sausages, etc.'
  },
  {
    icon: IllusIcon9,
    title: 'OTHER PLANT\n-BASED PROTEINS',
    desc: 'I am still eating meat and/or fish, but I have consciously started to reduce my consumption (e.g. meat-free day once a week).'
  },
  {
    icon: IllusIcon10,
    title: 'PULSE- OR GRAIN\n-BASED PIECES',
    desc: 'Plant-based meal ingredients made from pulses and/or grains that bear no reference to animal meat (e.g. falafel, black bean burger, pulled oats)'
  },
  {
    icon: IllusIcon11,
    title: 'VEGGIE BURGERS\n & PIECES',
    desc: 'Plant-based meal ingredients made from vegetables that bear no reference to animal meat, like spinach & cheese burger, pulled jackfruit, etc.'
  },
];

const IllustratePopup = ({open, type = '1', onClose}) => {
  const [dataList, setDataList] = useState([]);
  
  useEffect(() => {
    if(open) {
      if(type === '1') {
        setDataList(dataList1);
      } else {
        setDataList(dataList2);
      }
    }
  }, [open, type]);

  return <Modal open={open} closeIcon={false} width="85%" footer={false} className={style.customModalWrap}  destroyOnClose={true}>
    <CustomModal title='ILLUSTRATE' onClose={onClose}>
      <div className={classNames(style.content)}>
        {
          dataList.map((item, index) => <div key={index} className={classNames(style.illustrateItem)}>
            <div className={classNames(style.imgWrap)}>
              <img src={BallBgIcon} alt="" className={classNames(style.imgBg)} />
              <img src={item.icon} alt="" className={classNames(style.imgIcon)} />
            </div>
            <div className={classNames(style.title)} style={{height: type === '1' ? '50px' : '70px' }}>
              {item.title}
            </div>
            <div className={classNames(style.desc)}>
              {item.desc}
            </div>
          </div>)
        }
      </div>
    </CustomModal>
  </Modal>;
};

export default IllustratePopup;