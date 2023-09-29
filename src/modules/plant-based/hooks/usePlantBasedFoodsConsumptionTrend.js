import { useCallback, useEffect, useState } from 'react';
import { plantBasedFoodsConsumptionTrend, plantBasedFoodsConsumptionTrendKey, waveKey } from '../api/request';
import { formatPercentData, tooltipFormatter } from '../utils';

const options = {
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
  tooltip: {
    trigger: 'axis',
    confine: true
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '40%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#00A32E'
      }
    },
    axisLabel: {
      interval: 0,
      rotate: 60,
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E',
      formatter: '{value}%'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E'
      }
    }
  },
  series: [
    {
      data: [11, 30, 24, 18, 35, 17, 26],
      type: 'line',
      symbol: 'none',
      color: '#00A32E',
    },
  ]
};

const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC', '#006717','#005eef','#e60067','#f752c7', '#f7e152', '#a6f540', '#538216', '#2fd4a5', '#38fff8', '#1616a1', '#be89fa', '#8718a8', '#b30e0e', '#cf7e44', '#97b03e', '#2e7d18', '#13d0d4', '#4c87c7', '#b24cc7'];

const useDataFormat = (country) => {
  const [dataList, setDataList] = useState([]);

  const getChartData = useCallback(async () => {
    const {data={}, status=''}  = await plantBasedFoodsConsumptionTrend({country:country});
    if(status === 'Success') {
      // format data
      const tempFormatData = formatPercentData(data);
      setDataList(tempFormatData);
    }
  }, [country]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return {dataList};
};

const usePlantBasedFoodsConsumptionTrend = () => {
  const [filter, setFilter] = useState([]);
  const [countryList] = useState(['UK', 'DE', 'NL']);

  const {dataList: dataForUK} = useDataFormat('UK');
  const {dataList: dataForDE} = useDataFormat('DE');
  const {dataList: dataForNL} = useDataFormat('NL');

  const [dateList, setDateList] = useState([]);

  const getKey = useCallback(async () => {
    const {data = [], status = ''} = await plantBasedFoodsConsumptionTrendKey();
    if(status === 'Success') {
      setFilter(data);
    }
  }, []);

  const getWaveKey = useCallback(async () => {
    const {data = [], status = ''} = await waveKey();
    if(status === 'Success') {
      setDateList(data);
    }
  }, []);

  const getChartOptions = useCallback((curFilter = [], curCountryList = []) => {
    let legendData = [];
    let xAxisData = dateList;
    let seriesData = [];

    filter.forEach(item => {
      if(curFilter.includes(item)) {
        legendData.push(item);
      }
    });

    if(!curCountryList.length) {
      curCountryList = countryList;
    }

    const seriesKeysList = [];
    curCountryList.forEach(item => {
      legendData.forEach(subItem => {
        seriesKeysList.push(`${item}-${subItem}`);
      });
    });

    const tempObjForFilterKey = {};
    if(Object.keys(dataForUK).length && Object.keys(dataForDE).length && Object.keys(dataForNL).length) {
      seriesKeysList.forEach(item => {
        tempObjForFilterKey[item] = [];
        if(item.indexOf('UK-') > -1) {
          const tempKey = item.split('-')[1];
          xAxisData.forEach(subItem => {
            const tempVal = dataForUK[subItem][tempKey];
            tempObjForFilterKey[item].push(tempVal);
          });
        }
        if(item.indexOf('DE-') > -1) {
          const tempKey = item.split('-')[1];
          xAxisData.forEach(subItem => {
            const tempVal = dataForDE[subItem][tempKey];
            tempObjForFilterKey[item].push(tempVal);
          });
        }
        if(item.indexOf('NL-') > -1) {
          const tempKey = item.split('-')[1];
          xAxisData.forEach(subItem => {
            const tempVal = dataForNL[subItem][tempKey];
            tempObjForFilterKey[item].push(tempVal);
          });
        }
      });
    }

    seriesKeysList.forEach(item => {
      const index =  filter.findIndex(filterItem => filterItem === item);
      const color = colors[index];
      const temp = {
        name: item,
        type: 'line',
        symbol: 'none',
        color: color,
        data: tempObjForFilterKey[item]
      };
      seriesData.push(temp);
    });

    const tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.tooltip.formatter = tooltipFormatter;
    tempOptions.legend.data = seriesKeysList;
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series = seriesData;
    return tempOptions;
  }, [dateList, filter, countryList, dataForUK, dataForDE, dataForNL]);

  useEffect(() => {
    getKey();
    getWaveKey();
  }, []);

  return {filter, getChartOptions};
};

export default usePlantBasedFoodsConsumptionTrend;