import React, { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal.jsx';
import classNames from 'classnames';
import style from './data-change-popup.module.scss';
import ReactECharts from 'echarts-for-react';

import { Col, Modal, Row, Select } from 'antd';
import useChangeOverTime from '../../hooks/useChangeOverTime.js';

const DataChangePopup = ({open, onClose}) => {
  const [filter, setFilter] = useState('');
  // eslint-disable-next-line no-unused-vars
  const { filterOptions, getChartOptions } = useChangeOverTime();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if(open) {
      setTimeout(() => {
        setIsShow(true);
      }, 100);
    } else {
      setIsShow(false);
    }
  }, [open]);

  useEffect(() => {
    if(filterOptions.length) {
      setFilter(filterOptions[0].value);
    }
  }, [filterOptions]);

  return <Modal open={open} closeIcon={false} width="85%" footer={false} className={style.customModalWrap}>
    <CustomModal title='INSPRIATION' onClose={onClose}>
      <div className={classNames(style.content)}>
        <div className={classNames(style.desc)}>
          There are still several persistent pain points to relieve to further accelerate the adoption of  plant-forward eating patterns.
        </div>
        <div style={{textAlign: 'right', margin: '30px 0'}}>
          <div className={style.inputBorder}>
            <Select
              value={filter}
              style={{width: '140px', textAlign: 'left'}}
              placeholder='All Countries'
              options={filterOptions}
              onChange={(val) => setFilter(val)}
              popupMatchSelectWidth={false}
            />
          </div>
        </div>
        
        <Row gutter={50}>
          <Col span={12}>
            <div className={classNames(style.echartsLabel)}>
              FiRST YEAR
            </div>
            {isShow && <ReactECharts option={getChartOptions('First Year', filter)} notMerge={true} lazyUpdate={true}></ReactECharts>}
          </Col>
          <Col span={12}>
            <div className={classNames(style.echartsLabel)}>
              AFTER 5 YEAR
            </div>
            {isShow && <ReactECharts option={getChartOptions('After 5 Years', filter)} notMerge={true} lazyUpdate={true}></ReactECharts>}
          </Col>
        </Row>
      </div>
    </CustomModal>
  </Modal>;
};

export default DataChangePopup;