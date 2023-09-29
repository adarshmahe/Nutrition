import React, { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import style from './category-drivers.module.scss';
import classNames from 'classnames';
import TitleMenu from '../title-menu/title-menu.jsx';

import Introduction from './components/introduction.jsx';
import MarketPerformance from './components/market-performance.jsx';
import { useBase } from '../../hooks/useBase.jsx';
import { scrollTopAnimations } from '../../utils/index.js';

const menuList = [
  {
    title: 'Key Drivers',
    children: [
      {
        title: 'Introduction',
        url: '',
        index: '0-0'
      },
      {
        title: 'De-Averaged Category\n Drivers: By Region,\n Generation and Diet',
        url: '',
        index: '0-1'
      },
    ],
    url: '',
    index: '0'
  },
  {
    title: 'Market Performance',
    children: [],
    url: '',
    index: '1'
  },
];

const CategoryDriversPage = ({onClose}) => {
  const { subUrl } = useBase();
  const [curIndex, setCurIndex] = useState('0');
  const [curModuleIndex, setCurModuleIndex] = useState('0');

  useEffect(() => {
    if(subUrl) {
      if(subUrl === '1-0') {
        setCurIndex('0-0');
      } else if(subUrl === '1-1') {
        setCurIndex('1');
      }
    }
  }, [subUrl]);

  useEffect(() => {
    const tempCurModuleIndex = curIndex.split('-')[0];
    setCurModuleIndex(tempCurModuleIndex);
  }, [curIndex]);

  const fnUrlChange = (curItem) => {
    let tempIndex = curItem.index;
    if(curItem.children && curItem.children.length) {
      tempIndex = curItem.children[0].index;
    }
    setCurIndex(tempIndex);
    scrollTopAnimations(tempIndex);
  };

  return <CustomModal title='CATEGORY DRIVERS' onClose={onClose}>
    <div className={classNames(style.content)}>
      <TitleMenu menuList={menuList} curIndex={curIndex} onChange={fnUrlChange}></TitleMenu>
      <div className={classNames(style.rightWrap)} id="mainContentId">
        {
          curModuleIndex === '0' && <Introduction></Introduction> 
        }
        {
          curModuleIndex === '1' && <MarketPerformance></MarketPerformance>
        }
      </div>
    </div>
  </CustomModal>;
};

export default CategoryDriversPage;