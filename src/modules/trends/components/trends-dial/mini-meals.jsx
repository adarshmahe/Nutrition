import React from 'react';
import ReactECharts from 'echarts-for-react';

const MiniMealsData = ({
  smartSolutionData,
  healthierLivingData,
  smartSpendingData,
  indulgingExperiencesData,
  cookingRenaissanceData,
  consciousChoicesData,
  anytimeAnywhereData,
}) => {

  const getTooltipContent = (params) => {
    const name = params.name;
    return name;
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
      name: '5%',
      value: 5,
      macro: 'HEALTHIER LIVING',
      itemStyle: {
        color: '#04763F',
      },
      children: [
        {
          name: 'HEALTHIER LIVING',
          value: 5,
          macro: 'HEALTHIER LIVING',
          itemStyle: {
            color: '#04763F',
          },

          children: [
            {
              name: 'IRRESISTIBILE VEGETABLES',
              value: 1.67,
              link: '/emerging-food',
              macro: 'HEALTHIER LIVING',
              itemStyle: {
                color: '#024826',
              },
              children: (
                healthierLivingData !== 'undefined' && healthierLivingData
              ).map((category) => ({
                name: category.name,
                value: 1,
                macro: 'HEALTHIER LIVING',
                itemStyle: {
                  color: '#047940',
                },
              })),
            },
            {
              name: 'FEEL GOOD FOOD',
              value: 1.67,
              link: '/feel-good-food',
              macro: 'HEALTHIER LIVING',
              itemStyle: {
                color: '#024826',
              },
            },
            {
              name: 'MINDFUL PROTEINS',
              value: 1.67,
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
      name: '12%',
      value: 12,
      macro: 'SMART SPENDING',
      itemStyle: {
        color: '#F6DF00',
      },
      children: [
        {
          name: 'SMART SPENDING',
          value: 12,
          macro: 'SMART SPENDING',
          itemStyle: {
            color: '#F6DF00',
          },
          children: [
            {
              name: 'Low waste Menus',
              value: 12,
              link: '/low-waste-menus',
              macro: 'SMART SPENDING',
              itemStyle: {
                color: '#948600',
              },
              children: (
                smartSpendingData !== 'undefined' && smartSpendingData
              ).map((category) => ({
                name: category.name,
                value: 6,
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
      name: '16',
      value: 16,
      macro: 'INDULGING EXPERIENCES',
      itemStyle: {
        color: '#E38008',
      },
      children: [
        {
          name: 'INDULGING EXPERIENCES',
          value: 16,
          macro: 'INDULGING EXPERIENCES',
          itemStyle: {
            color: '#E38008',
          },
          children: [
            {
              name: 'Wild & Pure',
              value: 8,
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
                value: 5.4,
                macro: 'INDULGING EXPERIENCES',
                itemStyle: {
                  color: '#E38008',
                },
              })),
            },

            {
              name: 'Flavor Contrasts',
              value: 8,
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
      name: '19%',
      value: 19,
      macro: 'SMART SOLUTIONS',
      itemStyle: {
        color: '#004771',
      },
      children: [
        {
          name: 'SMART SOLUTIONS',
          value: 19,
          macro: 'SMART SOLUTIONS',
          itemStyle: {
            color: '#004771',
          },
          children: [
            {
              name: '',
              value: 19,
              macro: 'SMART SOLUTIONS',
              itemStyle: {
                color: '#002B45',
              },
              children: (
                smartSolutionData !== 'undefined' && smartSolutionData
              ).map((category) => ({
                name: category.name,
                value: 9.5,
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
      name: '9%',
      value: 9,
      macro: 'COOKING RENAISSANCE',
      itemStyle: {
        color: '#006090',
      },
      children: [
        {
          name: 'COOKING RENAISSANCE',
          value: 9,
          macro: 'COOKING RENAISSANCE',
          itemStyle: {
            color: '#006090',
          },
          children: [
            {
              name: 'Modernized Comfort Food',
              value: 4.5,
              link: '/modernized-comfort-food',
              macro: 'COOKING RENAISSANCE',
              itemStyle: {
                color: '#003B5A',
              },
              children: (
                cookingRenaissanceData !== 'undefined' && cookingRenaissanceData
              ).map((category) => ({
                name: category.name,
                value: 4.5,
                macro: 'COOKING RENAISSANCE',
                itemStyle: {
                  color: '#006090',
                },
              })),
            },
            {
              name: 'Joyful Sharing',
              value: 4.5,
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
      name: '29%',
      value: 29,
      macro: 'ANYTIME ANYWHERE',
      itemStyle: {
        color: '#F8BC02',
      },
      children: [
        {
          name: 'ANYTIME ANYWHERE',
          value: 29,
          macro: 'ANYTIME ANYWHERE',
          itemStyle: {
            color: '#F8BC02',
          },
          children: [
            {
              name: '',
              value: 29,
              macro: 'ANYTIME ANYWHERE',
              itemStyle: {
                color: '#967100',
              },
              children: (
                anytimeAnywhereData !== 'undefined' && anytimeAnywhereData
              ).map((category) => ({
                name: category.name,
                value: 14.5,
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
      name: '1%',
      value: 10,
      macro: 'CONSCIOUS CHOICES',
      itemStyle: {
        color: '#047940',
      },
      children: [
        {
          name: 'CONSCIOUS CHOICES',
          value: 10,
          macro: 'CONSCIOUS CHOICES',
          itemStyle: {
            color: '#047940',
          },
          children: [
            {
              name: '',
              value: 10,
              macro: 'CONSCIOUS CHOICES',
              itemStyle: {
                color: '#024826',
              },
              children: (
                consciousChoicesData !== 'undefined' && consciousChoicesData
              ).map((category) => ({
                name: category.name,
                value: 3.4,
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
      name: '9%',
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

  return (
    <ReactECharts
      isAnimationActive={true}
      option={option}
      style={{ height: '600px' }}
    />
  );
};

export default MiniMealsData;
