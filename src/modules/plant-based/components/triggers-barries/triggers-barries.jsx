import React, { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import style from './triggers-barries.module.scss';
import classNames from 'classnames';
import TitleMenu from '../title-menu/title-menu.jsx';
import BarriersPainPoints from './components/barriers-pain-points.jsx';
import TriggersGains from './components/triggers-gains.jsx';
import { useBase } from '../../hooks/useBase.jsx';
import { scrollTopAnimations } from '../../utils/index.js';

const menuList = [
  {
    title: 'Plant-Based\n Triggers & Gains',
    children: [
      {
        title: 'Intro to Plant-\nBased Gains',
        url: '',
        index: '0-0'
      },
      {
        title: 'Plant-Forward Eating\n Pattern Gains ',
        url: '',
        index: '0-1'
      },
      {
        title: 'Plant-Based purchase\n Barriers',
        url: '',
        index: '0-2'
      },
    ],
    url: '',
    index: '0'
  },
  {
    title: 'Plant-Based\n Barriers & Pain Points',
    url: '',
    index: '1',
    children: [
      {
        title: 'Introduction',
        url: '',
        index: '1-0'
      },
      {
        title: 'Plant-forward eating\n pattern pains',
        url: '',
        index: '1-1'
      },
      {
        title: 'Plant-Based purchase\n Barriers',
        url: '',
        index: '1-2'
      },
    ],
  },
];

const TriggersBarriesPage = ({onClose}) => {
  const { subUrl } = useBase();
  const [curIndex, setCurIndex] = useState('0');
  const [curModuleIndex, setCurModuleIndex] = useState('0');

  useEffect(() => {
    if(subUrl) {
      if(subUrl === '2-0') {
        setCurIndex('0-0');
      } else if(subUrl === '2-1') {
        setCurIndex('1-0');
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

  return <CustomModal title='PAINS & GAINS' onClose={onClose}>
    <div className={classNames(style.content)}>
      <TitleMenu menuList={menuList} curIndex={curIndex} onChange={fnUrlChange}></TitleMenu>
      <div className={classNames(style.rightWrap)} id="mainContentId">
        {
          curModuleIndex === '0' && <TriggersGains></TriggersGains> 
        }
        {
          curModuleIndex === '1' && <BarriersPainPoints></BarriersPainPoints>
        }
      </div>
    </div>
  </CustomModal>;
};

export default TriggersBarriesPage;