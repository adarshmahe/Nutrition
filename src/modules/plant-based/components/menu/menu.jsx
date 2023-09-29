import React, { useEffect, useState } from 'react';
import style from './menu.module.scss';
import classNames from 'classnames';

import { menuList } from './data.js';

import { ReactComponent as ToBottomSvg } from '../../../../assets/images/plant-based/to-bottom.svg';
import ChosedPointSvg from '../../../../assets/images/plant-based/chosed-point.svg';

const Menu = ({onUrlChange}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [curOption, setCurOption] = useState('');

  useEffect(() => {
    setCurOption('');
  }, [activeIndex]);

  const fnOnClick = (index) => {
    if(activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
    if(index === 4) {
      console.log(12123);
    }
  };

  const fnOnChosed = (url) => {
    setCurOption(url);
    if(onUrlChange) {
      onUrlChange(url);
    }
  };

  return <>
    <div className={classNames(style.menuWrap)}>
      {
        menuList.map((item, index) => <MenuItem key={index} isActive={activeIndex === index} onClick={() => fnOnClick(index)} onChosed={fnOnChosed} curOption={curOption} detail={item}></MenuItem>)
      }
    </div>
  </>;
};

const MenuItem = ({detail, isActive, curOption, onChosed, onClick}) => {
  const [eleHeight, setEleHeight] = useState(0);

  useEffect(() => {
    if(!isActive) {
      setTimeout(() => {
        const curEle = document.querySelector(`#plantMainMenu${detail.index}`);
        if(curEle) {
          const height = curEle.offsetHeight;
          setEleHeight(height);
          curEle.setAttribute('style', 'height: 0px !important');
        }
      }, 0);
    }
  }, [isActive]);

  const fnClick = () => {
    const curEle = document.querySelector(`#plantMainMenu${detail.index}`);
    if(curEle) {
      curEle.setAttribute('style', `height: ${eleHeight}px !important`);
    }
    onClick();
  };

  return <div className={classNames(style.menuItemWrap)}>
    <div className={classNames(style.menuItem, isActive && style.active)}  onClick={fnClick}>
      <img src={detail.icon} className={classNames(style.menuItemRight)}></img>
      <div className={classNames(style.menuItemCenter)}>
        <div className={classNames(style.title)}>{detail.title}</div>
        <div className={classNames(style.desc)}>{detail.desc}</div>
      </div>
      <ToBottomSvg className={classNames(style.menuItemRight, isActive &&  style.active)}></ToBottomSvg>
    </div>
    {
      detail.options && <div id={`plantMainMenu${detail.index}`} className={classNames(style.menuItemDetailWrap)}>
        <div className={classNames(style.menuItemDetail)}>
          {
            detail.options.map((item, index) => <div key={index} onClick={() => onChosed(item.subUrl)} className={classNames(style.optionItem)}>
              {
                curOption === item.subUrl ? <img src={ChosedPointSvg} className={classNames(style.img)}/> : <div className={classNames(style.img)}></div>
              }
              <div className={classNames(style.subTitle, curOption === item.subUrl && style.active)}>{item.subTitle}</div>
              <div className={classNames(style.subDesc)}>{item.subDesc}</div>
            </div>)
          }
          {
            detail.options.length === 0 && <div className={classNames(style.comeSoon)}>Coming Soon</div>
          }
        </div>
      </div>
    }
  </div>;
};

export default Menu;