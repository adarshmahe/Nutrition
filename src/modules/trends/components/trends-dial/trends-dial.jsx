import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts/lib/chart/sunburst';
import 'echarts/lib/component/title';
import SegmentPopup from './segment-popup.jsx';
import api from '../../../../util/api.jsx';
import { apiURL } from '../../../../env-url.js';
import Profile from '../../../../components/profile/profile.jsx';
import { useNavigate } from 'react-router-dom';
import MiniMealsData from './mini-meals.jsx';


const TrendsDial = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [clickedSegment, setClickedSegment] = useState(null);
  const [trendsData, setTrendsData] = useState({});
  const [healthierLivingData, setHealthierLivingData] = useState([]);
  const [smartSpendingData, setSmartSpendingData] = useState([]);
  const [indulgingExperiencesData, setIndulgingExperiencesData] = useState([]);
  const [smartSolutionData, setSmartSolutionData] = useState([]);
  const [cookingRenaissanceData, setCookingRenaissanceData] = useState([]);
  const [anytimeAnywhereData, setAnytimeAnywhereData] = useState([]);
  const [consciousChoicesData, setConsciousChoicesData] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [selectedSegmentData, setSelectedSegmentData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [marketTrends, setMarketTrends] = useState(false);
  const [showDropdownData, setShowDropdownData] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('UK');
  const apiUrlCountryBased =
    selectedOption == 'UK'
      ? `${apiURL}/trends/search/dial?country=UK`
      : `${apiURL}/trends/search/dial?country=us`;
  const chartRef = useRef();

  const handleDropdownCategory = (e) => {
    const selectedValue = e.target.value;
    setPopupVisible(!popupVisible);
    setSelectedCategory(selectedValue);
    setShowDropdownData(e.target.value === "Mini Meals");
  };

  const handleSegmentClick = (params) => {
    const clickedData = params.data;
    setPopupVisible(true);
    let selectedData = null;
    setClickedSegment(!null);

    if (clickedData.macro === 'HEALTHIER LIVING') {
      selectedData = data[0].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'SMART SPENDING') {
      selectedData = data[1].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'INDULGING EXPERIENCES') {
      selectedData = data[2].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'SMART SOLUTIONS') {
      selectedData = data[3].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'COOKING RENAISSANCE') {
      selectedData = data[4].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'ANYTIME ANYWHERE') {
      selectedData = data[5].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'CONSCIOUS CHOICES') {
      selectedData = data[6].children;
      setSelectedSegmentData(selectedData);
    } else if (clickedData.macro === 'DIASPORAS') {
      navigate('/population-segregation');
      return;
    } else {
      return;
    }
  };

  const modalClose = () => {
    setPopupVisible(false);
  };

  const getTooltipContent = (params) => {
    const name = params.name;
    return name;
  };

  const fetchData = () => {
    api
      .get(apiUrlCountryBased)
      .then((response) => {
        setTrendsData(response.data);
        const names = Object.keys(response.data);
        setCategoryNames(names);

        if ('Healthier Living' in response.data) {
          setHealthierLivingData(response.data['Healthier Living']);
        }
        if ('Smart Spending' in response.data) {
          setSmartSpendingData(response.data['Smart Spending']);
        }
        if ('Indulging Experiences ' in response.data) {
          setIndulgingExperiencesData(response.data['Indulging Experiences ']);
        }
        if ('Smart Solutions' in response.data) {
          setSmartSolutionData(response.data['Smart Solutions']);
        }
        if ('Cooking Renaissance' in response.data) {
          setCookingRenaissanceData(response.data['Cooking Renaissance']);
        }
        if ('Anytime Anywhere' in response.data) {
          setAnytimeAnywhereData(response.data['Anytime Anywhere']);
        }
        if ('Conscious Choices' in response.data) {
          setConsciousChoicesData(response.data['Conscious Choices']);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    // if(selectedOption === 'uk') {
    //   setDefaultCountry(`${apiURL}/trends/search/dial?country=uk`);
    // } else if (selectedOption === 'us') {
    //   setDefaultCountry(`${apiURL}/trends/search/dial?country=us`);
    // }
  };

  const customLabelFormatter = (params) => {
    const label = params.name;
    const maxLength = 15;
    if (label.length > maxLength) {
      return label.slice(0, maxLength) + '...';
    }
    return label;
  };

  const data = [
    {
      name: '30%',
      value: 30,
      macro: 'HEALTHIER LIVING',
      itemStyle: {
        color: '#04763F',
      },
      children: [
        {
          name: 'HEALTHIER LIVING',
          value: 30,
          macro: 'HEALTHIER LIVING',
          itemStyle: {
            color: '#04763F',
          },

          children: [
            {
              name: 'IRRESISTIBILE VEGETABLES',
              value: 10,
              link: '/emerging-food',
              macro: 'HEALTHIER LIVING',
              itemStyle: {
                color: '#024826',
              },
              children: (
                healthierLivingData !== 'undefined' && healthierLivingData
              ).map((category) => ({
                name: category.name,
                value: 6,
                macro: 'HEALTHIER LIVING',
                itemStyle: {
                  color: '#047940',
                },
              })),
            },
            {
              name: 'FEEL GOOD FOOD',
              value: 10,
              link: '/feel-good-food',
              macro: 'HEALTHIER LIVING',
              itemStyle: {
                color: '#024826',
              },
            },
            {
              name: 'MINDFUL PROTEINS',
              value: 10,
              link: '/mindful-proteins',
              macro: 'HEALTHIER LIVING',
              itemStyle: {
                color: '#024826',
              },
            },
          ],
        },
      ],
    },

    {
      name: '16.4%',
      value: 16.4,
      macro: 'SMART SPENDING',
      itemStyle: {
        color: '#F6DF00',
      },
      children: [
        {
          name: 'SMART SPENDING',
          value: 16.4,
          macro: 'SMART SPENDING',
          itemStyle: {
            color: '#F6DF00',
          },
          children: [
            {
              name: 'Low waste Menus',
              value: 16.4,
              link: '/low-waste-menus',
              macro: 'SMART SPENDING',
              itemStyle: {
                color: '#948600',
              },
              children: (
                smartSpendingData !== 'undefined' && smartSpendingData
              ).map((category) => ({
                name: category.name,
                value: 8.2,
                macro: 'SMART SPENDING',
                itemStyle: {
                  color: '#F6DF00',
                },
              })),
            },
          ],
        },
      ],
    },

    {
      name: '17.6%',
      value: 17.6,
      macro: 'INDULGING EXPERIENCES',
      itemStyle: {
        color: '#E38008',
      },
      children: [
        {
          name: 'INDULGING EXPERIENCES',
          value: 17.6,
          macro: 'INDULGING EXPERIENCES',
          itemStyle: {
            color: '#E38008',
          },
          children: [
            {
              name: 'Wild & Pure',
              value: 8.8,
              link: '/wild-pure',
              macro: 'INDULGING EXPERIENCES',
              itemStyle: {
                color: '#8B4E05',
              },
              children: (
                indulgingExperiencesData !== 'undefined' &&
                indulgingExperiencesData
              ).map((category) => ({
                name: category.name,
                value: 5.9,
                macro: 'INDULGING EXPERIENCES',
                itemStyle: {
                  color: '#E38008',
                },
              })),
            },

            {
              name: 'Flavor Contrasts',
              value: 8.8,
              link: '/flavour-contrasts',
              macro: 'INDULGING EXPERIENCES',
              itemStyle: {
                color: '#8B4E05',
              },
            },
          ],
        },
      ],
    },

    {
      name: '18%',
      value: 18,
      macro: 'SMART SOLUTIONS',
      itemStyle: {
        color: '#004771',
      },
      children: [
        {
          name: 'SMART SOLUTIONS',
          value: 18,
          macro: 'SMART SOLUTIONS',
          itemStyle: {
            color: '#004771',
          },
          children: [
            {
              name: '',
              value: 18,
              macro: 'SMART SOLUTIONS',
              itemStyle: {
                color: '#002B45',
              },
              children: (
                smartSolutionData !== 'undefined' && smartSolutionData
              ).map((category) => ({
                name: category.name,
                value: 9,
                macro: 'SMART SOLUTIONS',
                itemStyle: {
                  color: '#004771',
                },
              })),
            },
          ],
        },
      ],
    },

    {
      name: '12%',
      value: 12,
      macro: 'COOKING RENAISSANCE',
      itemStyle: {
        color: '#006090',
      },
      children: [
        {
          name: 'COOKING RENAISSANCE',
          value: 12,
          macro: 'COOKING RENAISSANCE',
          itemStyle: {
            color: '#006090',
          },
          children: [
            {
              name: 'Modernized Comfort Food',
              value: 6,
              link: '/modernized-comfort-food',
              macro: 'COOKING RENAISSANCE',
              itemStyle: {
                color: '#003B5A',
              },
              children: (
                cookingRenaissanceData !== 'undefined' && cookingRenaissanceData
              ).map((category) => ({
                name: category.name,
                value: 6,
                macro: 'COOKING RENAISSANCE',
                itemStyle: {
                  color: '#006090',
                },
              })),
            },
            {
              name: 'Joyful Sharing',
              value: 6,
              link: '/joyful-sharing',
              macro: 'COOKING RENAISSANCE',
              itemStyle: {
                color: '#003B5A',
              },
            },
          ],
        },
      ],
    },

    {
      name: '1%',
      value: 5,
      macro: 'ANYTIME ANYWHERE',
      itemStyle: {
        color: '#F8BC02',
      },
      children: [
        {
          name: 'ANYTIME ANYWHERE',
          value: 5,
          macro: 'ANYTIME ANYWHERE',
          itemStyle: {
            color: '#F8BC02',
          },
          children: [
            {
              name: '',
              value: 5,
              macro: 'ANYTIME ANYWHERE',
              itemStyle: {
                color: '#967100',
              },
              children: (
                anytimeAnywhereData !== 'undefined' && anytimeAnywhereData
              ).map((category) => ({
                name: category.name,
                value: 2.5,
                macro: 'ANYTIME ANYWHERE',
                itemStyle: {
                  color: '#F8BC02',
                },
              })),
            },
          ],
        },
      ],
    },

    {
      name: '4.3%',
      value: 8,
      macro: 'CONSCIOUS CHOICES',
      itemStyle: {
        color: '#047940',
      },
      children: [
        {
          name: 'CONSCIOUS CHOICES',
          value: 8,
          macro: 'CONSCIOUS CHOICES',
          itemStyle: {
            color: '#047940',
          },
          children: [
            {
              name: '',
              value: 8,
              macro: 'CONSCIOUS CHOICES',
              itemStyle: {
                color: '#024826',
              },
              children: (
                consciousChoicesData !== 'undefined' && consciousChoicesData
              ).map((category) => ({
                name: category.name,
                value: 2.7,
                macro: 'CONSCIOUS CHOICES',
                itemStyle: {
                  color: '#047940',
                },
              })),
            },
          ],
        },
      ],
    },

    {
      name: '0.3%',
      value: 2,
      macro: 'DIASPORAS',
      itemStyle: {
        color: '#A6A6A6',
      },
      children: [
        {
          name: 'DIASPORAS',
          value: 2,
          macro: 'DIASPORAS',
          itemStyle: {
            color: '#A6A6A6',
          },
          children: [
            {
              name: '',
              value: 2,
              macro: 'DIASPORAS',
              itemStyle: {
                color: '#666666',
              },
              children: [
                {
                  name: '',
                  value: 2,
                  macro: 'DIASPORAS',
                  itemStyle: {
                    color: '#A6A6A6',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const modifiedData = data.map((item) => {
    const bgColor = item.itemStyle.color || '#fff';
    return {
      ...item,
      label: {
        color: bgColor,
        ...item.label,
      },
      name: item.name.toUpperCase(),
      children: item.children.map((child) => ({
        ...child,
        name: child.name.toUpperCase(),
        children: child.children.map((subChild) => ({
          ...subChild,
          name: subChild.name.toUpperCase(),
        })),
      })),
    };
  });

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: getTooltipContent,
    },
    series: {
      type: 'sunburst',
      data: modifiedData,
      radius: [0, '15%'],
      sort: undefined,
      emphasis: {
        itemStyle: {
          borderWidth: 1,
          shadowBlur: 3,
          shadowOffsetX: 0,
          shadowColor: '#000',
        },
        focus: 'self',
      },
      levels: [
        {},
        {
          r0: '84%',
          r: '85%',
          label: {
            rotate: 'horizontal',
            position: 'outside',
            silent: false,
            fontSize: '24px',
            fontFamily: 'unilever-shilling-medium',
            textShadowBlur: 10,
            textShadowColor: '#000',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#333',
            color: 'transparent',
            shadowBlur: 10,
            shadowColor: '#00a32e',
          },
        },
        {
          r0: '65%',
          r: '82%',
          label: {
            color: '#FDFFFD',
            fontWeight: 'bold',
            overflow: 'break',
            width: '110',
            fontSize: '14px',
            fontFamily: 'unilever-shilling-medium',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#333',
          },
        },
        {
          r0: '45%',
          r: '65%',
          itemStyle: {
            borderWidth: 1,
            borderColor: '#333',
          },
          label: {
            rotate: 'horizontal',
            fontSize: '10px',
            fontFamily: 'unilever-shilling-regular',
            formatter: function (params) {
              return customLabelFormatter(params);
            },
          },
        },
        {
          r0: '10%',
          r: '45%',
          itemStyle: {
            borderWidth: 0.5,
            borderColor: '#333',
          },
          label: {
            rotate: '45',
            fontSize: '8px',
            color: '#FDFFFD',
            fontFamily: 'unilever-shilling-regular',
            formatter: function (params) {
              const label = params.name;
              const maxLength = 15;
              if (label.length > maxLength) {
                return label.slice(0, maxLength) + '...';
              }
              return label;
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    let instance = chartRef.current.getEchartsInstance();
    fetchData();
    instance.on('click', (params) => {
      handleSegmentClick(params);
    });
  }, [selectedOption]);

  return (
    <>
      <div className="horizontal-user-profile">
        <Profile />
      </div>
      <div
        className={`parent-segment ${clickedSegment !== null ? 'active' : ''}`}
      >
        {marketTrends === false && (
          <>
            <div className="trends-country-selection">
              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="UK">UK</option>
                <option value="us">US</option>
              </select>
            </div>
            <div className="trends-country-selection categories">
              <select
                value={selectedCategory}
                onChange={handleDropdownCategory}
              >
                {/* <option value ='select'> --select--</option> */}
                <option value="Bouillons & Seasoning">
                  Bouillons & Seasoning
                </option>
                <option value="Meal Solutions">Meal Solutions</option>
                <option value="Mini Meals">Mini Meals</option>
                <option value="Mayonnaise">Mayonnaise</option>
                <option value="Verity Sauces">Verity Sauces</option>
              </select>
            </div>
            {showDropdownData && selectedCategory === 'Mini Meals' ? (
              <MiniMealsData
                smartSolutionData={smartSolutionData}
                healthierLivingData={healthierLivingData}
                smartSpendingData={smartSpendingData}
                indulgingExperiencesData={indulgingExperiencesData}
                cookingRenaissanceData={cookingRenaissanceData}
                consciousChoicesData={consciousChoicesData}
                anytimeAnywhereData={anytimeAnywhereData}
              />
            ) : (
              <><ReactECharts
                isAnimationActive={true}
                option={option}
                style={{ height: '600px' }}
                ref={chartRef}
                onEvents={{ click: handleSegmentClick }} /><SegmentPopup
                visible={popupVisible}
                data={popupData}
                modalClose={modalClose}
                selectedSegmentData={selectedSegmentData}
                marketTrends={marketTrends}
                setMarketTrends={setMarketTrends}
                smartSolutionData={smartSolutionData}
                healthierLivingData={healthierLivingData}
                smartSpendingData={smartSpendingData}
                indulgingExperiencesData={indulgingExperiencesData}
                cookingRenaissanceData={cookingRenaissanceData}
                consciousChoicesData={consciousChoicesData}
                anytimeAnywhereData={anytimeAnywhereData} /></>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default TrendsDial;
