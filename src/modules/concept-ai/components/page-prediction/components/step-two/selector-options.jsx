import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeStepTwoData } from '../../../../store/concept-ai.js';
import PropTypes from 'prop-types';
import style from './step-two.module.scss';
import classNames from 'classnames';

function SelectorOptions({overview}) {
  const dispatch = useDispatch();
  const selectList = useSelector(state => state.conceptAi.stepTwoData);
  const options = [
    {
      id: 0,
      text: 'A new group of users ?'
    },
    {
      id: 1,
      text: 'A new trend ?'
    },
    {
      id: 2,
      text: 'A new occasion ?'
    },
    {
      id: 3,
      text: 'A new channel ?'
    },
    {
      id: 4,
      text: 'A truly new and differentiated benefit?'
    }
  ];
  function selectItem(id) {
    if (overview) return;
    let res = [];
    selectList.forEach((item, index) => {
      item && res.push(index);
    });
    if (selectList[id]) {
      res = res.filter(item => item !== id);
    } else {
      res = [...res, id];
    }
    dispatch(changeStepTwoData({stepTwoData: res}));
  }
  return (
    <div className={style.selectorOptionsContainer}>
      {
        options.map(item => {
          const selected = selectList[item.id];
          return (
            <div className={classNames(style.optionItem, selected ? style.selected : '' , overview ? style.overview : '')} key={item.id} onClick={() => selectItem(item.id)}>
              <div className={style.itemText}>{item.text}</div>
              {selected && <div className={style.selectedIcon}></div>}
            </div>
          );
        })
      }
      
    </div>
  );
}
SelectorOptions.defaultProps = {
  overview: false
};
SelectorOptions.propTypes = {
  overview: PropTypes.bool,
};

export default SelectorOptions;