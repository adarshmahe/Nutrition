import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import MarketTrendQuaChart from './market-trend-qua-chart.jsx';
import api from '../../../../util/api.jsx';
import { apiURL } from '../../../../env-url.js';
import { chevronDownIcon } from '../../../../components/icons/icons.jsx';

const MarketTrendChart = ({ selectedItemName }) => {
  const [selectedQuater, setSelectedQuater] = useState(2023);
  const [yearsData, setYearData] = useState([]);
  const [monthsData, setMonthData] = useState([]);
  const [selectedYearMonthData, setSlectedYearMonthsData] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [option, setOption] = useState([]);
  const fetchGraphData = () => {
    let trends = encodeURIComponent(selectedItemName);
    api
      .get(`${apiURL}/trends/search/details?country=uk&consumerTrend=${trends}`)
      .then((res) => {
        setYearData(res.data.yearsData);
        setMonthData(res.data.monthsData);
        const mondata = res.data.monthsData.filter((item) => {
          return item.period.split('-')[0] == selectedQuater;
        });
        setSlectedYearMonthsData(mondata);
        const monthOptions = res.data.yearsData.map((item) => {
          return {
            value: item.period,
            label: item.period,
          };
        });
        setOption(monthOptions);
      });
  };
  useEffect(() => {
    fetchGraphData();
  }, []);

  const handleButtonClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelectedQuaOption = (e) => {
    setSelectedQuater(e.target.value);
    const result = monthsData.filter((item) => {
      return item.period.split('-')[0] === e.target.value;
    });
    setSlectedYearMonthsData(result);
  };
  const getOption = () => {
    let districts = [];
    let disValue = [];
    Object.keys(yearsData).forEach((e) => {
      districts = [...new Set([...districts, yearsData[e].period])];
      disValue = [...new Set([...disValue, yearsData[e].value])];
    });
    return {
      grid: { show: false },
      xAxis: {
        type: 'category',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          fontSize: 10,
        },
        data: districts,
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
          margin: -20,
          showGrid: false,
          padding: [-10, 0, 0, 0],
        },
      },
      series: [
        {
          data: disValue,
          type: 'line',
          lineStyle: {
            color: '#fff',
            width: 1,
          },
          itemStyle: {
            color: '#fff',
            width: 1,
          },
        },
      ],
    };
  };
  return (
    <>
      <div className="line-graph-chart">
        <h2>Number of Searches in Google</h2>
        <ReactEcharts option={getOption()} />
      </div>
      <div className="line-graph-chart">
        <h2>Number of Searches in Google</h2>
        <div className="year-select">
          <div className="sort-container">
            <button
              className={'btn-down ' + (isDropDownOpen ? 'active' : '')}
              onClick={handleButtonClick}
            >
              <span>{selectedQuater}</span>
              {isDropDownOpen ? (
                <img
                  className="up-arrow-sort"
                  src={chevronDownIcon}
                  alt="arrow"
                />
              ) : (
                <img className="arrow-sort" src={chevronDownIcon} alt="arrow" />
              )}
            </button>
          </div>
          {isDropDownOpen && (
            <div className="drop-down mt-50">
              <ul className=" item-list">
                {option &&
                  option.map((item, index) => {
                    return (
                      <li key={index}>
                        <label>
                          {item.label}{' '}
                          <input
                            type="radio"
                            name={item.value}
                            value={item.value}
                            className="item-radio-button"
                            checked={selectedQuater == item.value}
                            style={{
                              backgroudColor:
                                selectedQuater == item.value
                                  ? '#06ca3d'
                                  : '#71717a',
                            }}
                            onChange={(e) => handleSelectedQuaOption(e)}
                          />
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
        {selectedQuater && <MarketTrendQuaChart data={selectedYearMonthData} />}
      </div>
    </>
  );
};

export default MarketTrendChart;
