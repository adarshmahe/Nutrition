import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import style from '../category-drivers.module.scss';
import DownloadIcon from '../../../../../assets/images/plant-based/download.svg';
import CommonBtn from '../../common-btn/common-btn.jsx';
import ReactECharts from 'echarts-for-react';
import { Col, Row, Select } from 'antd';
import useMarketPerformanceTotal from '../../../hooks/useMarketPerformanceTotal';
import useMarketPerformanceBrand from '../../../hooks/useMarketPerformanceBrand';

const MarketPerformance = () => {
  const { countryOptions: countryOptionsFroTop,  getChartOptions: getChartOptionsForTop} = useMarketPerformanceTotal();
  const [curCountryForTop, setCurCountryForTop] = useState('');
  useEffect(() => {
    if(countryOptionsFroTop.length) {
      setCurCountryForTop(countryOptionsFroTop[0].value);
    }
  }, [countryOptionsFroTop]);
  const setCountryFilterForTop = (val) => {
    setCurCountryForTop(val);
  };

  const { countryOptions: countryOptionsFroBottom, thirdKeys: btnListForBottom, getChartOptions: getChartOptionsForBottom  } = useMarketPerformanceBrand();
  const [curCountryForBottom, setCurCountryForBottom] = useState('');
  useEffect(() => {
    if(countryOptionsFroBottom.length) {
      setCurCountryForBottom(countryOptionsFroBottom[0].value);
    }
  }, [countryOptionsFroBottom]);
  const setCountryFilterForBottom = (val) => {
    setCurCountryForBottom(val);
  };

  const [filterData, setFilterData] = useState([]);
  const fnChosedFilter = useCallback((val) => {
    const tempFilterData = [...filterData];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setFilterData(tempFilterData);
  }, [filterData]);

  useEffect(() => {
    if(btnListForBottom.length) {
      setFilterData(btnListForBottom);
    }
  }, [btnListForBottom]);

  return <>
    <div className={classNames(style.rowSpaceBetween)}>
      <div className={classNames(style.labelHeader)}>
        <img src={DownloadIcon} alt=""/>
        <span className={classNames(style.label)} style={{marginLeft: '25px'}}>Plant based Total Category Performance -Category Drivers</span>
      </div>
      <div className={style.inputBorder}>
        <Select
          value={curCountryForTop}
          style={{width: '140px', textAlign: 'left'}}
          placeholder='All Countries'
          options={countryOptionsFroTop}
          onChange={(val) => setCountryFilterForTop(val)}
          popupMatchSelectWidth={false}
        />
      </div>
    </div>
    <div style={{height: '52px'}}></div>
    <Row>
      <Col span={24}>
        <ReactECharts option={getChartOptionsForTop(curCountryForTop)} notMerge={true} lazyUpdate={true}/>
      </Col>
    </Row>

    <div style={{height: '80px'}}></div>

    <div className={classNames(style.rowSpaceBetween)}>
      <div className={classNames(style.labelHeader)}>
        <img src={DownloadIcon} alt=""/>
        <span className={classNames(style.label)} style={{marginLeft: '25px'}}>Is plant based consumption on rise in</span>
      </div>
      <div className={style.inputBorder}>
        <Select
          value={curCountryForBottom}
          style={{width: '140px', textAlign: 'left'}}
          placeholder='All Countries'
          options={countryOptionsFroBottom}
          onChange={(val) => setCountryFilterForBottom(val)}
          popupMatchSelectWidth={false}
        />
      </div>
    </div>
    <div style={{height: '25px'}}></div>
    <div className={classNames(style.btnList)}>
      {
        btnListForBottom.map((item, index) => <CommonBtn key={index} label={item} checked={filterData.includes(item)} onClick={() => fnChosedFilter(item)}></CommonBtn>)
      }
    </div>
    <div style={{height: '25px'}}></div>
    <Row>
      <Col span={24}>
        <ReactECharts option={getChartOptionsForBottom(curCountryForBottom, filterData)} notMerge={true} lazyUpdate={true}/>
      </Col>
    </Row>
  </>;
};

export default MarketPerformance;