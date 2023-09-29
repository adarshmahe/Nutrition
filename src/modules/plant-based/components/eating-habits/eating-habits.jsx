import React, { useCallback, useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import style from './eating-habits.module.scss';
import classNames from 'classnames';
import TitleMenu from '../title-menu/title-menu.jsx';

import EatingPatterns from './components/eating-patterns.jsx';
import CategoryEngagement from './components/category-engagement.jsx';
import PlantForward from './components/plant-forward.jsx';

import IllustratePopup from '../illustrate-popup/illustrate-popup.jsx';
import { useBase } from '../../hooks/useBase.jsx';
import { scrollTopAnimations } from '../../utils/index.js';

const menuList = [
  {
    title: 'Eating Patterns',
    children: [],
    url: '',
    index: '0'
  },
  {
    title: 'Category Engagement',
    children: [
      {
        title: 'Animal meat VS\n Plant Based food',
        url: '',
        index: '1-0'
      },
      {
        title: 'Plant based food\n consumption',
        url: '',
        index: '1-1'
      },
      {
        title: 'Frequency of\n consumption',
        url: '',
        index: '1-2'
      }
    ],
    url: '',
    index: '1'
  },
  {
    title: 'Plant Forward',
    children: [],
    url: '',
    index: '2'
  },
];

const EatingHabitsPage = ({onClose}) => {
  const { subUrl } = useBase();
  const [winType, setWinType] = useState('1');
  const [openWin, setOpenWin] = useState(false);
  const [curIndex, setCurIndex] = useState('0');
  const [curModuleIndex, setCurModuleIndex] = useState('0');

  const fnCloseWin = useCallback(() => {
    setOpenWin(false);
  }, []);

  const fnOpenWin = useCallback((type) => {
    setWinType(type);
    setOpenWin(true);
  }, []);

  useEffect(() => {
    if(subUrl) {
      if(subUrl === '0-0') {
        setCurIndex('0');
      } else if(subUrl === '0-1') {
        setCurIndex('1-0');
      } else {
        setCurIndex('2');
      }
    }
  }, [subUrl]);

  useEffect(() => {
    const tempCurModuleIndex = curIndex.split('-')[0];
    setCurModuleIndex(tempCurModuleIndex);

    if(['0', '1'].includes(tempCurModuleIndex)) {
      if(tempCurModuleIndex === '0' && !localStorage.getItem('isFirstOne')) {
        fnOpenWin('1');
        localStorage.setItem('isFirstOne', true);
      } else  if(tempCurModuleIndex === '1' && !localStorage.getItem('isFirstTwo')) {
        fnOpenWin('2');
        localStorage.setItem('isFirstTwo', true);
      }
    }
  }, [curIndex, fnOpenWin]);

  const fnUrlChange = (curItem) => {
    let tempIndex = curItem.index;
    if(curItem.children && curItem.children.length) {
      tempIndex = curItem.children[0].index;
    }
    setCurIndex(tempIndex);
    scrollTopAnimations(tempIndex);
  };

  return <CustomModal title='EATING HABITS' onClose={onClose}>
    <div className={classNames(style.content)}>
      <TitleMenu menuList={menuList} curIndex={curIndex} onChange={fnUrlChange}></TitleMenu>
      <div className={classNames(style.rightWrap)} id="mainContentId">
        {
          curModuleIndex === '0' && <EatingPatterns onOpenIllustrate={fnOpenWin}></EatingPatterns> 
        }
        {
          curModuleIndex === '1' && <CategoryEngagement onOpenIllustrate={fnOpenWin}></CategoryEngagement>
        }
        {
          curModuleIndex === '2' && <PlantForward></PlantForward>
        }
      </div>
    </div>
    <IllustratePopup type={winType} open={openWin} onClose={fnCloseWin}></IllustratePopup>
  </CustomModal>;
};

export default EatingHabitsPage;