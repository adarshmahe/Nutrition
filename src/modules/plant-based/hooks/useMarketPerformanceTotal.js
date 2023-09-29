import { useCallback, useEffect, useState } from 'react';
import { plantBasedTotalCategoryPerformance } from '../api/request';

const options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '5%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E',
      formatter: '{value}%'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      color: '#00A32E',
      fontSize: 12,
      fontWeight: 'bold',
    },
    axisLine: {
      lineStyle: {
        color: '#00A32E'
      }
    }
  },
  series: {
    type: 'bar',
    data: [{
      value: 10,
      itemStyle: {
        color: '#7705BC'
      }
    }, {
      value: 20,
      itemStyle: {
        color: '#00A32E'
      }
    }, {
      value: 30,
      itemStyle: {
        color: '#FFC000'
      }
    }, {
      value: 40,
      itemStyle: {
        color: '#00A889'
      }
    }, {
      value: 50,
      itemStyle: {
        color: '#FF7C7D'
      }
    }]
  }
};

const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC', '#006717','#005eef','#e60067','#f752c7'];

const useMarketPerformanceTotal = () => {
  const [thirdKeys, setThirdKeys] = useState([]);
  const [secondKeys, setSecondKeys] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [countryList, setCountryList] = useState([]);
  const [dataList, setDataList] = useState({});

  const [countryOptions, setCountryOptions] = useState([]);

  const getChartData = useCallback(async () => {
    const {data={}, status=''}  = await plantBasedTotalCategoryPerformance();
    if(status === 'Success') {
      setDataList(data);

      const countryKeys = Object.keys(data);
      setCountryList(countryKeys);

      const tempCountryOptions = [];
      countryKeys.forEach(item => tempCountryOptions.push({label: item, value: item}));
      setCountryOptions(tempCountryOptions);
      
      let tempSecondKeys = [];
      countryKeys.forEach(item => {
        let length = 0;
        const keys = Object.keys(data[item]);
        if(keys.length > length) {
          tempSecondKeys = keys;
          length = keys.length;          
        }
      });
      setSecondKeys(tempSecondKeys);

      let tempThirdKeys = [];
      countryKeys.forEach(item => {
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
    }
  }, []);

  const getDataForCountry = useCallback((country = '') => {
    if(!country || !secondKeys.length) return;
    const curSecondKey = secondKeys[0];
    const data = dataList[country][curSecondKey];
    const tempObj = {};
    const keys = Object.keys(data);
    keys.forEach(item => {
      tempObj[item] = ((data[item] || 0) * 100).toFixed(0);
    });
    return tempObj;
  }, [secondKeys, dataList]);

  const getChartOptions = useCallback((curCountry = '') => {
    if(!(curCountry && thirdKeys.length)) return options;
    let xAxisData = thirdKeys;
    let seriesData = [];

    const originData = getDataForCountry(curCountry);
    xAxisData.forEach(subItem => {
      const tempVal = originData[subItem];
      const index =  xAxisData.findIndex(filterItem => filterItem === subItem);
      const color = colors[index];
      seriesData.push({
        value: tempVal,
        itemStyle: {
          color: color
        }
      });
    });

    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.tooltip.formatter = (params) =>{
      const header = `${params[0].axisValue} <br/>`;
      let body = '';
      params.forEach(item => {
        body += `<div style="display: flex;justify-content: space-between;"><div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span></div><span style="margin-left: 20px;">${item.value}%</span></div>`;
      });
      return header + body;
    };
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series.data = seriesData;
    return tempOptions;
  }, [thirdKeys, getDataForCountry]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return {countryOptions, getChartOptions};
};

export default useMarketPerformanceTotal;