import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import TrendsHorizontalNav from '../trends-horizantal-nav/trend-horizantal-nav.jsx';
import { apiURL } from '../../../../env-url.js';
import api from '../../../../util/api.jsx';
import Loader from '../../../../components/loader/loader.jsx';
import Drill from './top-dish-table/drill-down.jsx';

const TopDishes = ({ category, consumerTrendsCategory, selectedItemName }) => {
  const [data, setData] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isLoading, setLoading] = useState(true);
  const [showTickTock, setShowTickTock] = useState(true);
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [showbarchart,setShowbarchart]=useState(false);
  const [object, setObject] = useState('');
  const fetchTopSearchCategories = () => {
    let consumerTrend = encodeURIComponent(selectedItemName);
    api
      .get(
        `${apiURL}/trends/search/categories/associated?country=uk&consumerTrend=${consumerTrend}`
      )
      .then((response) => {
        setSearchCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchData = () => {
    let brandcategory = encodeURIComponent(selectedCategory);
    let consumerTrendCategory = encodeURIComponent(selectedItemName);
    api
      .get(
        `${apiURL}/trends/search/categories/${brandcategory}?country=uk&consumerTrend=${consumerTrendCategory}&numberOfObjects=30`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchTopSearchCategories();
    fetchData();
  }, [selectedCategory]);

  const getOption = () => {
    return {
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fdfffd',
          },
        },
      },
      yAxis: {
        // type: 'value',
        triggerEvent: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fdfffd',
          },
        },
      },
      series: [
        {
          data: data.map((item) => ({
            value: item.objectValue,
            name: item.objectName,
          })),
          type: 'bar',
          itemStyle: {
            color: '#71717a',
            emphasis: {
              color: '#00a32e',
            },
          },
          label: {
            show: true,
            position: 'outside',
            rotate: 90,
            distance: 30,
            textStyle: {
              color: 'white',
              fontSize: 12,
              fontFamily: 'unilever-shilling-regular',
            },
            formatter: '{b}',
          },
        },
      ],
    };
  };

  const handleLearningTagClick = (clickedCategory) => {
    if (clickedCategory && clickedCategory.categoryName) {
      setSelectedCategory(clickedCategory.categoryName);
    }
  };

  const onChartClick = (params) => {
    setObject(params.data.name);
    setShowDrillDown(true);
  };

  const onEvents = {
    click: onChartClick,
  };

  return isLoading ? ( //Checkif if is loading
    <Loader />
  ) : (
    <div className="top-dishes-container">
      {showbarchart==false&& <TrendsHorizontalNav
        consumerTrendsCategory={consumerTrendsCategory}
        selectedItemName={selectedItemName}
        selectedCategory={selectedCategory}
        showTickTock={showTickTock}
        setShowTickTock={setShowTickTock}
        showDrillDown={showDrillDown}
        setShowDrillDown={setShowDrillDown}
        object={object}
      />}
      {showTickTock && showDrillDown == false && (
        <>
          <div className="learning-tags mt-30">
            <div className="mb-10" onClick={(e) => handleLearningTagClick(e)}>
              {searchCategories.map((item, i) => (
                <span
                  className={`tags ${
                    selectedCategory === item.categoryName ? 'active-dish' : ''
                  }`}
                  key={i}
                  onClick={() => handleLearningTagClick(item)}
                >
                  {item.categoryName}
                </span>
              ))}
            </div>
          </div>
          <h3 className="mt-30">
            Most Associated Subcategories with this trend
          </h3>
          <div
            id="main"
            className="top-dishesh"
            style={{ width: '100%', height: '600px' }}
          >
            {selectedCategory && (
              <ReactEcharts onEvents={onEvents} option={getOption()} />
            )}
          </div>
        </>
      )}
      {showTickTock && showDrillDown && (
        <Drill
          category={selectedCategory}
          object={object}
          consumerTrendsCategory={consumerTrendsCategory}
          selectedItemName={selectedItemName}
          showDrillDown={showDrillDown}
          showbarchart={showbarchart}
          setShowbarchart={setShowbarchart}
        />
      )}
    </div>
  );
};

export default TopDishes;
