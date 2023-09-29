// import { useState } from 'react'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, changeCountry, clearStepOneData, changeStepTwoData, changePredictionStep } from '../../store/concept-ai.js';
import classNames from 'classnames';
import style from './select-ball.module.scss';

function SelectBall() {
  // 页面类型
  const pageType = useSelector(state => state.conceptAi.pageType);
  // 页面 ConceptPrediction 下的 地区类型
  const country = useSelector(state => state.conceptAi.country);

  const dispatch = useDispatch();
  // 切换页面
  const selectPage = (val) => {
    dispatch(changePage({pageType: val}));
    if (val === 'MyConcept') {
      dispatch(changeCountry({country: ''}));
    } else {
      if (pageType === 'MyConcept') {
        dispatch(changeCountry({country: 'UK'}));
        dispatch(clearStepOneData());
        dispatch(changeStepTwoData({stepTwoData: []}));
        dispatch(changePredictionStep({predictionStep: 1}));
      }
    }
  };
  // 切换地区
  const selectCountry = (val) => {
    dispatch(changeCountry({country: val}));
    if (val !== country) {
      dispatch(clearStepOneData());
      dispatch(changeStepTwoData({stepTwoData: []}));
      dispatch(changePredictionStep({predictionStep: 1}));
    }
  };

  return (
    <div className={style.selectBallCom}>
      <div className={style.ballItemBox}>
        <div
          className={
            classNames(
              style.ballItem,
              {
                [style.active]: pageType === 'ConceptPrediction'
              }
            )
          }
          onClick={() => selectPage('ConceptPrediction')}
        >
          <div className={style.ballContent}>
            {
              pageType === 'ConceptPrediction' &&
              <>
                <div className={classNames(style.areaItem, { [style.active]: country === 'UK' })} onClick={() => selectCountry('UK')}>United Kingdom</div>
                {/* <div className={classNames(style.areaItem, { [style.active]: country === 'Germany' })} onClick={() => selectCountry('Germany')}>Germany</div> */}
                <div className={classNames(style.areaItem, style.disabled)}>Germany</div>
                <div className={classNames(style.areaItem, { [style.active]: country === 'US' })} onClick={() => selectCountry('US')}>United States</div>
              </>
            }
            {
              pageType !== 'ConceptPrediction' &&
              <div className={style.ballName}>Start<br />Predicting</div>
            }
          </div>
        </div>
      </div>
      <div className={classNames(style.ballItemBox, style.delay)}>
        <div
          className={
            classNames(
              style.ballItem,
              {
                [style.active]: pageType === 'MyConcept'
              }
            )
          }
          onClick={() => selectPage('MyConcept')}
        >
          <div className={style.ballContent}>
            <div className={style.ballName}>My<br />Concept</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectBall;
