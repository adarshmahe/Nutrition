import { useCallback, useEffect, useState } from 'react';
import { painPointsChangeOverTime } from '../api/request';
import * as echarts from 'echarts';

const options = {
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '0%',
    containLabel: true
  },
  yAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      fontSize: 16
    }
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [
    {
      data: [10, 20,30,40,50,60,70,80],
      type: 'bar',
      label: {
        show: true,
        position: 'insideRight',
        formatter: '{c}%',
        offset: [-10,0],
        color: '#fff'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
          offset: 0,
          color: 'rgba(0,45,27,0.7)'
        }, {
          offset: 1,
          color: 'rgba(0,174,0,0.7)'
        }])
      }
    }
  ]
};

// const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC', '#006717','#005eef','#e60067','#f752c7'];

const useChangeOverTime = () => {
  const [thirdKeys, setThirdKeys] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [secondKeys, setSecondKeys] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [firstKeys, setFirstKeys] = useState([]);
  const [dataList, setDataList] = useState({});

  const [filterOptions, setFilterOptions] = useState([]);

  const getChartData = useCallback(async () => {
    const {data={}, status=''}  = await painPointsChangeOverTime();
    if(status === 'Success') {
      setDataList(data);

      const tempFirstKeys = Object.keys(data);
      setFirstKeys(tempFirstKeys);
      
      let tempSecondKeys = [];
      tempFirstKeys.forEach(item => {
        let length = 0;
        const keys = Object.keys(data[item]);
        if(keys.length > length) {
          tempSecondKeys = keys;
          length = keys.length;          
        }
      });
      setSecondKeys(tempSecondKeys);

      let tempThirdKeys = [];
      tempFirstKeys.forEach(item => {
        let length = 0;
        tempSecondKeys.forEach(subItem => {
          if(data[item]) {
            const keys = Object.keys(data[item][subItem]);
            if(keys.length > length) {
              tempThirdKeys = keys;
              length = keys.length;
            }
          }
        });
      });
      setThirdKeys(tempThirdKeys);

      const tempFilterOptions = [];
      tempSecondKeys.forEach(item => tempFilterOptions.push({label: item, value: item}));
      setFilterOptions(tempFilterOptions);
    }
  }, []);

  const getDataForFilter = useCallback((timeFilter = '', curFilter = '') => {
    if(!timeFilter || !curFilter || !Object.keys(dataList).length) return;
    const data = dataList[timeFilter][curFilter];
    return data;
  }, [dataList]);

  const getChartOptions = useCallback((timeFilter = '',  curFilter = '') => {
    if(!thirdKeys.length) return options;
    let yAxisData = thirdKeys;
    let seriesData = [];

    const originData = getDataForFilter(timeFilter, curFilter);
    yAxisData.forEach(item => {
      const tempVal = (originData[item] * 100).toFixed(0);
      seriesData.push(tempVal);
    });

    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.yAxis.data = yAxisData;
    tempOptions.series[0].data = seriesData;
    return tempOptions;
  }, [thirdKeys]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return {filterOptions, getChartOptions};
};

export default useChangeOverTime;