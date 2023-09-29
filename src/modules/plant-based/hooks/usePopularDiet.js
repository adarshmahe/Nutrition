import { useCallback, useEffect, useState } from 'react';
import { popularDiet, popularDietKey } from '../api/request';
import { formatPercentData, tooltipFormatter } from '../utils';

const options = {
  legend: {
    data: [],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    confine: true,
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
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
    },
    max: 100,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLabel: {
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
  series: []
};

const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC'];

const usePopularDiet = () => {
  const [filter, setFilter] = useState([]);

  const [dataForCountry, setDataForCountry] = useState({});
  const [countryList, setCountryList] = useState([]);

  const [dataForAge, setDataForAge] = useState({});
  const [ageList, setAgeList] = useState([]);

  const getKey = useCallback(async () => {
    const {data = [], status = ''} = await popularDietKey();
    if(status === 'Success') {
      setFilter(data);
    }
  }, []);

  const getChartDataForCountry = useCallback(async () => {
    const {data={}, status=''}  = await popularDiet({split:'country'});
    if(status === 'Success') {
      
      // format data
      const tempFormatData = formatPercentData(data);
      setDataForCountry(tempFormatData);

      const keyList = Object.keys(data);
      const tempCountryList = [];
      keyList.forEach(item => tempCountryList.push({label: item, value: item}));
      setCountryList(tempCountryList);
    }
  });

  const getChartDataForAge = useCallback(async () => {
    const {data={}, status=''}  = await popularDiet({split:'age'});
    if(status === 'Success') {
      // format data
      const tempFormatData = formatPercentData(data);
      setDataForAge(tempFormatData);

      const keyList = Object.keys(data);
      const tempAgeList = [];
      keyList.forEach(item => tempAgeList.push({label: item, value: item}));
      setAgeList(tempAgeList);
    }
  });

  const getChartOptionsForCountry = useCallback((curFilter = [], country = []) => {
    // 筛选数据，定顺序， 定颜色
    let legendData = [];
    let xAxisData = [];
    let seriesData = [];

    filter.forEach(item => {
      if(curFilter.includes(item)) {
        legendData.push(item);
      }
    });

    const countryKeys = countryList.map(item => item.value);
    if(country.length) {
      countryKeys.forEach(item => {
        if(country.includes(item)) {
          xAxisData.push(item);
        }
      });
    } else {
      xAxisData = countryKeys;
    }

    const tempObjForFilterKey = {};
    legendData.forEach(item => {
      tempObjForFilterKey[item] = [];
      xAxisData.forEach(subItem => {
        const tempVal = dataForCountry[subItem][item];
        tempObjForFilterKey[item].push(tempVal);
      });
    });
    
    legendData.forEach(item => {
      const index =  filter.findIndex(filterItem => filterItem === item);
      const color = colors[index];
      const temp = {
        name: item,
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        color: color,
        barWidth: 60,
        data: tempObjForFilterKey[item]
      };
      seriesData.push(temp);
    });
    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.tooltip.formatter = tooltipFormatter;
    tempOptions.legend.data = legendData;
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series = seriesData;
    return tempOptions;
  }, [dataForCountry, filter, countryList]);

  const getChartOptionsForAge = useCallback((curFilter = [], age = []) => {
    // 筛选数据，定顺序， 定颜色
    let legendData = [];
    let xAxisData = [];
    let seriesData = [];

    filter.forEach(item => {
      if(curFilter.includes(item)) {
        legendData.push(item);
      }
    });

    const ageKeys = ageList.map(item => item.value);
    if(age.length) {
      ageKeys.forEach(item => {
        if(age.includes(item)) {
          xAxisData.push(item);
        }
      });
    } else {
      xAxisData = ageKeys;
    }

    const tempObjForFilterKey = {};
    legendData.forEach(item => {
      tempObjForFilterKey[item] = [];
      xAxisData.forEach(subItem => {
        const tempVal = dataForAge[subItem][item];
        tempObjForFilterKey[item].push(tempVal);
      });
    });
    
    legendData.forEach(item => {
      const index =  filter.findIndex(filterItem => filterItem === item);
      const color = colors[index];
      const temp = {
        name: item,
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        color: color,
        data: tempObjForFilterKey[item]
      };
      seriesData.push(temp);
    });
    
    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.tooltip.formatter = tooltipFormatter;
    tempOptions.legend.data = legendData;
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series = seriesData;
    return tempOptions;
  }, [dataForAge, filter, ageList]);

  useEffect(() => {
    getKey();
    getChartDataForCountry();
    getChartDataForAge();
  }, []);

  return {filter, countryList, dataForCountry, ageList, dataForAge, getChartOptionsForCountry, getChartOptionsForAge};
};

export default usePopularDiet;