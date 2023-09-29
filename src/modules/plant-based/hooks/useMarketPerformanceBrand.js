import { useCallback, useEffect, useState } from 'react';
import { brandPerformanceCategoryPerformance } from '../api/request';

const options = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [],
    icon: 'circle',
    bottom: 0,
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    // {
    //   name: 'Brand expertise',
    //   type: 'bar',
    //   color: '#00A32E',
    //   data: [
    //     25.6, 76.7, 35.6, 11.2, 33.6, 20.0, 6.4, 3.3
    //   ]
    // },
    // {
    //   name: 'Health',
    //   type: 'bar',
    //   color: '#FF7C7D',
    //   data: [
    //     28.7, 70.7, 25.6, 22.2, 18, 18.8, 6.0, 2.3
    //   ]
    // },
    // {
    //   name: 'Taste',
    //   type: 'bar',
    //   color: '#00A889',
    //   data: [
    //     28.7, 70.7, 35.6, 52.2, 48.7, 18.8, 6.0, 2.3
    //   ]
    // },
    // {
    //   name: 'Convenience',
    //   type: 'bar',
    //   color: '#FFC000',
    //   data: [
    //     28.7, 70.7, 45.6, 42.2, 48.7, 18.8, 6.0, 2.3
    //   ]
    // },
    // {
    //   name: 'Ethics',
    //   type: 'bar',
    //   color: '#7705BC',
    //   data: [
    //     28.7, 70.7, 75.6, 22.2, 48.7, 18.8, 6.0, 2.3
    //   ]
    // }
  ]
};

const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC', '#006717','#005eef','#e60067','#f752c7'];

const useMarketPerformanceBrand = () => {
  const [thirdKeys, setThirdKeys] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [countryList, setCountryList] = useState([]);
  const [dataList, setDataList] = useState({});

  const [countryOptions, setCountryOptions] = useState([]);

  const getChartData = useCallback(async () => {
    const {data={}, status=''}  = await brandPerformanceCategoryPerformance();
    if(status === 'Success') {
      setDataList(data);

      const countryKeys = Object.keys(data);
      setCountryList(countryKeys);

      const tempCountryOptions = [];
      countryKeys.forEach(item => tempCountryOptions.push({label: item, value: item}));
      setCountryOptions(tempCountryOptions);

      const tempSecondKeys = Object.keys(data[countryKeys[0]]);

      const tempThirdKeys = Object.keys(data[countryKeys[0]][tempSecondKeys[0]]);
      setThirdKeys(tempThirdKeys);
    }
  }, []);

  const getChartOptions = useCallback((curCountry = '', curFilter = []) => {
    if(!curCountry || !Object.keys(dataList).length) return options;
    let legendData = [];
    let xAxisData = [];
    let seriesData = [];

    const originData = dataList[curCountry];
    xAxisData = Object.keys(originData);
    const tempThirdKeys = Object.keys(originData[xAxisData[0]]);

    tempThirdKeys.forEach(item => {
      if(curFilter.includes(item)) {
        legendData.push(item);
      }
    });

    const tempObjForFilterKey = {};
    legendData.forEach(item => {
      tempObjForFilterKey[item] = [];
      xAxisData.forEach(subItem => {
        const tempVal = (originData[subItem][item] || 0).toFixed(0);
        tempObjForFilterKey[item].push(tempVal);
      });
    });

    legendData.forEach(item => {
      const index =  thirdKeys.findIndex(filterItem => filterItem === item);
      const color = colors[index];
      const temp = {
        name: item,
        type: 'bar',
        color: color,
        data: tempObjForFilterKey[item]
      };
      seriesData.push(temp);
    });

    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series = seriesData;
    return tempOptions;
  }, [dataList]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return {countryOptions, thirdKeys, getChartOptions};
};

export default useMarketPerformanceBrand;