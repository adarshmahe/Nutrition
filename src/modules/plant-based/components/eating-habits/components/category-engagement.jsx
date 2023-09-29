import React, { useCallback, useEffect, useState } from 'react';
import style from '../eating-habits.module.scss';
import classNames from 'classnames';
import ReactECharts from 'echarts-for-react';

import RightArrowIcon from '../../../../../assets/images/plant-based/right_arrow.svg';
import DownloadIcon from '../../../../../assets/images/plant-based/download.svg';
import CommonBtn from '../../common-btn/common-btn.jsx';
import LightBallIcon from '../../../../../assets/images/plant-based/light-ball.svg';
import { Col, Row, Select } from 'antd';
import useAnimalMeatVsPlantBaseFood from '../../../hooks/useAnimalMeatVsPlantBaseFood';
import usePlantBasedFoodConsumption from '../../../hooks/usePlantBasedFoodConsumption';
import useFrequenceOfMeatSubstitutesComsuption from '../../../hooks/useFrequenceOfMeatSubstitutesComsuption';

const CategoryEngagement = ({onOpenIllustrate}) => {
  const {filter : btnList, countryList: countryListForMeatVsPlant, ageList: ageListForMeatVsPlant, getChartOptionsForCountry: getOptionsForMeatVsPlantCountry, getChartOptionsForAge: getOptionsForMeatVsPlantAge} = useAnimalMeatVsPlantBaseFood();
  const [countryFilterForMeatVsPlant, setCountryFilterForMeatVsPlant] = useState([]);
  const [ageFilterForMeatVsPlant, setAgeFilterForMeatVsPlant] = useState([]);

  const {filter : btnListForPlantBase, countryList: countryListForPlantBase, ageList: ageListForPlantBase, getChartOptionsForCountry: getOptionsForPlantBaseCountry, getChartOptionsForAge: getOptionsForPlantBaseAge} = usePlantBasedFoodConsumption();
  const [countryFilterForPlantBase, setCountryFilterForPlantBase] = useState([]);
  const [ageFilterForPlantBase, setAgeFilterForPlantBase] = useState([]);

  const {filter : btnListForFrequence, countryList: countryListForFrequence, ageList: ageListForFrequence, getChartOptionsForCountry: getOptionsForFrequenceCountry, getChartOptionsForAge: getOptionsForFrequenceAge} = useFrequenceOfMeatSubstitutesComsuption();
  const [countryFilterForFrequence, setCountryFilterForFrequence] = useState([]);
  const [ageFilterForFrequence, setAgeFilterForFrequence] = useState([]);

  const [chosedFilterForMeatVsPlant, setChosedFilterForMeatVsPlant] = useState([]);
  const [chosedFilterForPlantBase, setChosedFilterForPlantBase] = useState([]);
  const [chosedFilterForFrequence, setChosedFilterForFrequence] = useState([]);

  const fnChosedFilterForMeatVsPlant = useCallback((val) => {
    const tempFilterData = [...chosedFilterForMeatVsPlant];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setChosedFilterForMeatVsPlant(tempFilterData);
  }, [chosedFilterForMeatVsPlant]);

  const fnChosedFilterForPlantBase = useCallback((val) => {
    const tempFilterData = [...chosedFilterForPlantBase];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setChosedFilterForPlantBase(tempFilterData);
  }, [chosedFilterForPlantBase]);

  const fnChosedFilterForFrequence = useCallback((val) => {
    const tempFilterData = [...chosedFilterForFrequence];
    const index = tempFilterData.findIndex(item => item === val);
    if(index > -1) {
      tempFilterData.splice(index, 1);
    } else {
      tempFilterData.push(val);
    }
    setChosedFilterForFrequence(tempFilterData);
  }, [chosedFilterForFrequence]);

  useEffect(() => {
    if(btnList.length) {
      setChosedFilterForMeatVsPlant(btnList);
    }

    if(btnListForPlantBase.length) {
      setChosedFilterForPlantBase(btnListForPlantBase);
    }

    if(btnListForFrequence.length) {
      setChosedFilterForFrequence(btnListForFrequence);
    }

  }, [btnList, btnListForPlantBase, btnListForFrequence]);

  return <>
    <>
      <div className={classNames(style.rowSpaceBetween)} id="anchor-point-0">
        <div className={classNames(style.labelHeader)}>
          <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
          <span className={classNames(style.label)}>Animal meat VS Plant based food</span>
        </div>
        <div className={classNames(style.downloadWrap)}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)}>Download</span>
        </div>
      </div>
      <div style={{height: '20px'}}></div>
      <div className={classNames(style.filterBox)}>
        <div className={classNames(style.btnList)}>
          {
            btnList.map((item, index) => <CommonBtn key={index} label={item} checked={chosedFilterForMeatVsPlant.includes(item)} onClick={() => fnChosedFilterForMeatVsPlant(item)}></CommonBtn>)
          }
        </div>
        <img src={LightBallIcon} alt='' onClick={() => onOpenIllustrate('2')} className={classNames(style.pointer)}></img>
      </div>

      <Row gutter={60}>
        <Col lg={10} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Countries'
                allowClear
                options={countryListForMeatVsPlant}
                onChange={(val) => setCountryFilterForMeatVsPlant(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForMeatVsPlantCountry(chosedFilterForMeatVsPlant, countryFilterForMeatVsPlant)} notMerge={true} lazyUpdate={true}/>
        </Col>
        <Col lg={14} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Ages'
                allowClear
                options={ageListForMeatVsPlant}
                onChange={(val) => setAgeFilterForMeatVsPlant(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForMeatVsPlantAge(chosedFilterForMeatVsPlant, ageFilterForMeatVsPlant)} notMerge={true} lazyUpdate={true}/>
        </Col>
      </Row>
    </>

    <div style={{height: '90px'}}></div>

    <>
      <div className={classNames(style.rowSpaceBetween)} id="anchor-point-1">
        <div className={classNames(style.labelHeader)}>
          <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
          <span className={classNames(style.label)}>Plant based food consumpution</span>
        </div>
        <div className={classNames(style.downloadWrap)}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)}>Download</span>
        </div>
      </div>
      <div style={{height: '20px'}}></div>
      <div className={classNames(style.filterBox)}>
        <div className={classNames(style.btnList)}>
          {
            btnListForPlantBase.map((item, index) => <CommonBtn key={index} label={item} checked={chosedFilterForPlantBase.includes(item)} onClick={() => fnChosedFilterForPlantBase(item)}></CommonBtn>)
          }
        </div>
        <img src={LightBallIcon} alt='' onClick={() => onOpenIllustrate('2')} className={classNames(style.pointer)}></img>
      </div>

      <Row gutter={60}>
        <Col lg={10} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Countries'
                allowClear
                options={countryListForPlantBase}
                onChange={(val) => setCountryFilterForPlantBase(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForPlantBaseCountry(chosedFilterForPlantBase, countryFilterForPlantBase)} notMerge={true} lazyUpdate={true}/>
        </Col>
        <Col lg={14} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Ages'
                allowClear
                options={ageListForPlantBase}
                onChange={(val) => setAgeFilterForPlantBase(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForPlantBaseAge(chosedFilterForPlantBase, ageFilterForPlantBase)} notMerge={true} lazyUpdate={true}/>
        </Col>
      </Row>
    </>

    <div style={{height: '90px'}}></div>

    <>
      <div className={classNames(style.rowSpaceBetween)} id="anchor-point-2">
        <div className={classNames(style.labelHeader)}>
          <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
          <span className={classNames(style.label)}>Frequency of comsumption</span>
        </div>
        <div className={classNames(style.downloadWrap)}>
          <img src={DownloadIcon} alt=""/>
          <span className={classNames(style.label)}>Download</span>
        </div>
      </div>
      <div style={{height: '20px'}}></div>
      <div className={classNames(style.filterBox)}>
        <div className={classNames(style.btnList)}>
          {
            btnListForFrequence.map((item, index) => <CommonBtn key={index} label={item} checked={chosedFilterForFrequence.includes(item)} onClick={() => fnChosedFilterForFrequence(item)}></CommonBtn>)
          }
        </div>
        <img src={LightBallIcon} alt='' onClick={() => onOpenIllustrate('2')} className={classNames(style.pointer)}></img>
      </div>

      <Row gutter={60}>
        <Col lg={10} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Countries'
                allowClear
                options={countryListForFrequence}
                onChange={val => setCountryFilterForFrequence(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForFrequenceCountry(chosedFilterForFrequence, countryFilterForFrequence)} notMerge={true} lazyUpdate={true}/>
        </Col>
        <Col lg={14} md={24}>
          <div style={{margin: '42px 0 27px', textAlign: 'right'}}>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                style={{width: '140px', textAlign: 'left'}}
                placeholder='All Ages'
                allowClear
                options={ageListForFrequence}
                onChange={val => setAgeFilterForFrequence(val)}
                popupMatchSelectWidth={false}
              />
            </div>
          </div>
          <ReactECharts option={getOptionsForFrequenceAge(chosedFilterForFrequence, ageFilterForFrequence)} notMerge={true} lazyUpdate={true}/>
        </Col>
      </Row>
    </>
    <div style={{height: '90px'}}></div>
  </>;
};

export default CategoryEngagement;