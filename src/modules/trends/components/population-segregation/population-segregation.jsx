import React from 'react';
import { populationSegData } from './population-seg-data.jsx';
import ReactECharts from 'echarts-for-react';
import 'echarts/lib/chart/sunburst';
import 'echarts/lib/component/title';
const PopulationSegregationInfo = () => {
  const modifiedData = populationSegData.map((item) => {
    return {
      ...item,
      label: {
        ...item.label,
      },
      name: item.name.toUpperCase(),
    };
  });
  const option = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: '100%',
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'inside',
        },
        itemStyle: {
          borderRadius: 0,
        },

        data: modifiedData,
        emphasis: {
          label: {
            color: '#FFFFFF',
            show: true,
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="population-seg-desc">
        <p>
          As consumer cohorts become more diverse — due to globalisation,
          immigration and wider social change - region-specific flavours are in
          need. This is about food as a means of connecting people back to their
          culture. Consumers look to brands to help them connect with heritage
          and authentic cuisines allowing them to authentically cook and consume
          foods from their various cultures and cuisines roots at home.
        </p>
      </div>

      <div className="diaspora-wrapper">
        <div className="show-list">
          <ul className="left-column">
            <h3>Country</h3>
            {populationSegData.map((item, index) => {
              return <li key={index}>{item.name}</li>;
            })}
          </ul>

          <ul className="right-column">
            <h3>Population</h3>
            {populationSegData.map((item, index) => {
              return <li key={index}>{item.value}</li>;
            })}
          </ul>
        </div>
        <div className="show-graph">
          <ReactECharts
            isAnimationActive={true}
            option={option}
            style={{ height: 600 }}
          />
        </div>
      </div>
    </>
  );
};

export default PopulationSegregationInfo;
