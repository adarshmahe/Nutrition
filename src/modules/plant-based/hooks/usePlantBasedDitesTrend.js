import { useCallback, useEffect, useState } from 'react';
import { plantBasedDitesTrend, plantBasedDitesTrendKey, waveKey } from '../api/request';
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
    bottom: '25%',
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

const colors = ['#00A32E', '#FFC000', '#FE544F', '#00A889', '#FE7C7D', '#7705BC', '#006717','#005eef','#e60067','#f752c7'];

const useDataFormat = (country) => {
  const [dataList, setDataList] = useState([]);

  const getChartData = useCallback(async () => {
    const {data={}, status=''}  = await plantBasedDitesTrend({split:country});
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

const usePlantBasedDitesTrend = () => {
  const [filter, setFilter] = useState([]);

  const {dataList: dataForUK} = useDataFormat('UK');
  const {dataList: dataForDE} = useDataFormat('DE');
  const {dataList: dataForNL} = useDataFormat('NL');

  const [dateList, setDateList] = useState([]);

  const getKey = useCallback(async () => {
    const {data = [], status = ''} = await plantBasedDitesTrendKey();
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

  const getChartOptions = useCallback((curFilter = [], originData = []) => {
    let legendData = [];
    let xAxisData = dateList;
    let seriesData = [];

    filter.forEach(item => {
      if(curFilter.includes(item)) {
        legendData.push(item);
      }
    });

    const tempObjForFilterKey = {};
    if(Object.keys(originData).length) {
      legendData.forEach(item => {
        tempObjForFilterKey[item] = [];
        xAxisData.forEach(subItem => {
          const tempVal = originData[subItem][item];
          tempObjForFilterKey[item].push(tempVal);
        });
      });
    }

    legendData.forEach(item => {
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
    tempOptions.legend.data = legendData;
    tempOptions.xAxis.data = xAxisData;
    tempOptions.series = seriesData;
    return tempOptions;
  }, [dateList, filter]);

  useEffect(() => {
    getKey();
    getWaveKey();
  }, []);

  return {filter, dataForDE, dataForNL, dataForUK, getChartOptions};
};

export default usePlantBasedDitesTrend;