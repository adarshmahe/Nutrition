import { Col, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import CommonBtn from '../../common-btn/common-btn.jsx';
import classNames from 'classnames';
import LightBallIcon from '../../../../../assets/images/plant-based/light-ball.svg';
import DownloadIcon from '../../../../../assets/images/plant-based/download.svg';

import style from '../eating-habits.module.scss';
import usePopularDiet from '../../../hooks/usePopularDiet';

const EatingPatterns = ({onOpenIllustrate}) => {
  const {filter : btnList, countryList, ageList, getChartOptionsForCountry, getChartOptionsForAge} = usePopularDiet();
  const [countryFilter, setCountryFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState([]);

  const [chosedFilter, setChosedFilter] = useState([]);

  const fnChosedFilter = useCallback((val) => {
    const tempFilterData = [...chosedFilter];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setChosedFilter(tempFilterData);
  }, [chosedFilter]);

  useEffect(() => {
    if(btnList.length) {
      setChosedFilter(btnList);
    }
  }, [btnList]);

  return <>
    <div className={classNames(style.filterBox)}>
      <div className={classNames(style.btnList)}>
        {
          btnList.map((item, index) => <CommonBtn key={index} label={item} checked={chosedFilter.includes(item)} onClick={() => fnChosedFilter(item)}></CommonBtn>)
        }
      </div>
      <img src={LightBallIcon} alt='' onClick={() => onOpenIllustrate('1')} className={classNames(style.pointer)}></img>
    </div>
    <div style={{height: '30px'}}></div>
    <Row gutter={40}>
      <Col lg={12} md={24}>
        <div className={classNames(style.labelHeader, style.margin)}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)}>Popular Dish Tybe by</span>
          <div className={style.inputBorder}>
            <Select
              mode="multiple"
              style={{width: '140px'}}
              placeholder='All Countries'
              allowClear
              options={countryList}
              onChange={(val) => setCountryFilter(val)}
              popupMatchSelectWidth={false}
            />
          </div>
        </div>
        <ReactECharts option={getChartOptionsForCountry(chosedFilter, countryFilter)} notMerge={true} lazyUpdate={true}/>
      </Col>
      <Col lg={12} md={24}>
        <div className={classNames(style.labelHeader, style.margin)}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)}>Popular Dish Tybe by</span>
          <div className={style.inputBorder}>
            <Select
              mode="multiple"
              style={{width: '140px'}}
              placeholder='All Ages'
              allowClear
              options={ageList}
              onChange={(val) => setAgeFilter(val)}
              popupMatchSelectWidth={false}
            />
          </div>
        </div>
        <ReactECharts option={getChartOptionsForAge(chosedFilter, ageFilter)} notMerge={true} lazyUpdate={true}/>
      </Col>
    </Row>
  </>;
};

export default EatingPatterns;