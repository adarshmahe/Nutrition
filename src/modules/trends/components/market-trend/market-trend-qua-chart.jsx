import React from 'react';
import ReactEcharts from 'echarts-for-react';
const MarketTrendQuaChart = ({ data }) => {
  const getOption = () => {
    let monthdis = [];
    let monthValue = [];
    monthdis =
      data &&
      data.map((item) => {
        return item.period;
      });
    monthValue =
      data &&
      data.map((item) => {
        return item.value;
      });
    return {
      grid: { show: false },
      xAxis: {
        type: 'category',
        data: monthdis,
        axisLabel: {
          fontSize: 10,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#fff',
          },
        },
        position: 'left',
        axisLabel: {
          fontSize: 10,
          margin: -10,
          showGrid: false,
          padding: [-10, 0, 0, 0],
        },
      },
      series: [
        {
          data: monthValue,
          type: 'line',
          lineStyle: {
            color: '#fff',
            width: 1,
          },
          itemStyle: {
            color: '#00a889',
            width: 1,
          },
        },
      ],
    };
  };

  return (
    <>
      <ReactEcharts option={getOption()} />
    </>
  );
};

export default MarketTrendQuaChart;
