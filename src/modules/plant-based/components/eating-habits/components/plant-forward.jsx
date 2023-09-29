import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import ReactECharts from 'echarts-for-react';
import style from '../eating-habits.module.scss';
import DownloadIcon from '../../../../../assets/images/plant-based/download.svg';
// import LightBallIcon from '../../../../../assets/images/plant-based/light-ball.svg';
import CommonBtn from '../../common-btn/common-btn.jsx';
import { Col, Row, Select } from 'antd';
import usePlantBasedDitesTrend from '../../../hooks/usePlantBasedDitesTrend';
import useTotalPlantBasedFoodConsumptionTrend from '../../../hooks/useTotalPlantBasedFoodConsumptionTrend';
import usePlantBasedFoodsConsumptionTrend from '../../../hooks/usePlantBasedFoodsConsumptionTrend';

const countryOptions = [
  {
    label: 'UK',
    value: 'UK'
  },
  {
    label: 'Germany',
    value: 'DE'
  },
  {
    label: 'Netherlands',
    value: 'NL'
  }
];
const PlantForward = () => {
  const [chosedCountry, setChosedCountry] = useState([]);
  // const [chosedCountryForRight, setChosedCountryForRight] = useState([]);

  const {filter: btnListForDites, dataForDE, dataForNL, dataForUK, getChartOptions } = usePlantBasedDitesTrend();
  const {countryList: btnListForLeft, getChartOptions: getChartOptionsForLeft} = useTotalPlantBasedFoodConsumptionTrend();
  const { filter: btnListForRight,  getChartOptions: getChartOptionsForRight} = usePlantBasedFoodsConsumptionTrend();

  const [filterDataForDites, setFilterDataForDites] = useState([]);
  const [filterDataForLeft, setFilterDataForLeft] = useState([]);
  const [filterDataForRight, setFilterDataForRight] = useState([]);

  const fnChosedFilterForDites = useCallback((val) => {
    const tempFilterData = [...filterDataForDites];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setFilterDataForDites(tempFilterData);
  }, [filterDataForDites]);

  const fnChosedFilterForLeft = useCallback((val) => {
    const tempFilterData = [...filterDataForLeft];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setFilterDataForLeft(tempFilterData);
  }, [filterDataForLeft]);

  const fnChosedFilterForRight = useCallback((val) => {
    const tempFilterData = [...filterDataForRight];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setFilterDataForRight(tempFilterData);
  }, [filterDataForRight]);

  const getLgVal = useCallback(() => {
    const length = chosedCountry.length;
    if(length === 0 || length === 3) return 8;
    if(length === 1) return 24;
    if(length === 2) return 12;
  }, [chosedCountry]);

  useEffect(() => {
    if(btnListForDites.length) {
      setFilterDataForDites(btnListForDites);
    }
    if(btnListForLeft.length) {
      setFilterDataForLeft(btnListForLeft);
    }
    if(btnListForRight.length) {
      setFilterDataForRight(btnListForRight);
    }
  }, [btnListForDites, btnListForLeft, btnListForRight]);
  
  return <>
    <div className={classNames(style.rowSpaceBetween)}>
      <div className={classNames(style.labelHeader)}>
        <img src={DownloadIcon} alt=""/>
        <span className={classNames(style.label)} style={{marginLeft: '25px'}}>Plant based food consumpution</span>
        <div className={style.inputBorder}>
          <Select
            mode="multiple"
            style={{width: '140px'}}
            placeholder='All Countries'
            allowClear
            options={countryOptions}
            onChange={(val) => setChosedCountry(val)}
            popupMatchSelectWidth={false}
          />
        </div>
      </div>
      {/* <img src={LightBallIcon} alt=''></img> */}
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.btnList)}>
      {
        btnListForDites.map((item, index) => <CommonBtn key={index} label={item} checked={filterDataForDites.includes(item)} onClick={() => fnChosedFilterForDites(item)}></CommonBtn>)
      }
    </div>
    <Row gutter={60}>
      {
        (chosedCountry.includes('UK') || chosedCountry.length === 0) && <Col lg={getLgVal()} md={24}>
          <div style={{margin: '32px 0 27px', textAlign: 'center', fontSize: '14px', color: '#fff', fontWeight: 'bold'}}>
            UK
          </div>
          <ReactECharts style={{height: '330px'}} option={getChartOptions(filterDataForDites, dataForUK)} notMerge={true} lazyUpdate={true}/>
        </Col>
      }
      {
        (chosedCountry.includes('DE') || chosedCountry.length === 0) && <Col lg={getLgVal()} md={24}>
          <div style={{margin: '32px 0 27px', textAlign: 'center', fontSize: '14px', color: '#fff', fontWeight: 'bold'}}>
            Germany
          </div>
          <ReactECharts style={{height: '330px'}} option={getChartOptions(filterDataForDites, dataForDE)} notMerge={true} lazyUpdate={true}/>
        </Col>
      }
      {
        (chosedCountry.includes('NL') || chosedCountry.length === 0) && <Col lg={getLgVal()} md={24}>
          <div style={{margin: '32px 0 27px', textAlign: 'center', fontSize: '14px', color: '#fff', fontWeight: 'bold'}}>
            Netherlands
          </div>
          <ReactECharts style={{height: '330px'}} option={getChartOptions(filterDataForDites, dataForNL)} notMerge={true} lazyUpdate={true}/>
        </Col>
      }
    </Row>

    <div style={{height: '60px'}}></div>

    <Row gutter={60}>
      <Col lg={11} md={24}>
        <div className={classNames(style.labelHeader)} style={{marginTop: '30px'}}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)} style={{marginLeft: '25px'}}>Is plant based consumption on rise in</span>
        </div>
        <div style={{height: '18px'}}></div>
        <div style={{minHeight: '85px'}}>
          <div className={classNames(style.btnList)}>
            {
              btnListForLeft.map((item, index) => <CommonBtn key={index} label={item} checked={filterDataForLeft.includes(item)} onClick={() => fnChosedFilterForLeft(item)}></CommonBtn>)
            }
          </div>
        </div>
        <ReactECharts style={{height: '330px'}} option={getChartOptionsForLeft(filterDataForLeft)} notMerge={true} lazyUpdate={true}/>
      </Col>
      <Col lg={13} md={24}>
        <div className={classNames(style.labelHeader)} style={{marginTop: '30px'}}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)} style={{marginLeft: '25px'}}>Which plant-based foods gain traction</span>
          {/* <div className={style.inputBorder}>
            <Select
              mode="multiple"
              style={{width: '140px'}}
              placeholder='All Countries'
              allowClear
              options={countryOptions}
              onChange={(val) => setChosedCountryForRight(val)}
              popupMatchSelectWidth={false}
            />
          </div> */}
        </div>
        <div style={{height: '18px'}}></div>
        <div style={{minHeight: '85px'}}>
          <div className={classNames(style.btnList)}>
            {
              btnListForRight.map((item, index) => <CommonBtn key={index} label={item} checked={filterDataForRight.includes(item)} onClick={() => fnChosedFilterForRight(item)}></CommonBtn>)
            }
          </div>
        </div>
        <ReactECharts style={{height: '500px'}} option={getChartOptionsForRight(filterDataForRight, filterDataForLeft)} notMerge={true} lazyUpdate={true}/>
      </Col>
    </Row>
  </>;
};

export default PlantForward;