import classNames from 'classnames';
import React from 'react';
import style from './title-menu.module.scss';
import RightArrowIcon from '../../../../assets/images/plant-based/right_arrow.svg';

const TitleMenu = ({menuList = [], curIndex, onChange}) => {

  const fnChoseUrl = (item) => {
    if(onChange) {
      onChange(item);
    }
  };

  const checkChosed = (index) => {
    if(curIndex === `${index}`) {
      return true;
    } else {
      return curIndex.includes(`${index}-`);
    }
  };

  return <>
    <div className={classNames(style.menuWrap)}>
      <div className={classNames(style.menuList)}>
        {
          menuList.map((item, index) => <div key={index} className={classNames(style.menuItemWrap)}>
            <div className={classNames(style.menuItem)}>
              {
                checkChosed(index) && <img src={RightArrowIcon} alt="" />
              }
              <div onClick={() => fnChoseUrl(item)} className={classNames(style.label, checkChosed(index) && style.active)}>{item.title}</div>
            </div>
            {
              checkChosed(index) && <div className={classNames(style.menuSumWrap)}>
                {
                  item.children.map((subItem, subIndex) => <div onClick={() => fnChoseUrl(subItem)} key={subIndex} className={classNames(style.subLabel, curIndex===`${index}-${subIndex}` && style.active)}>
                    {subItem.title}
                  </div>)
                }
              </div>
            }
          </div>)
        }
      </div>
      <div className={classNames(style.line)}></div>
    </div>
  </>;
};

export default TitleMenu;