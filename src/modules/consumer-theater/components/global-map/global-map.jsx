import React, { useState, useEffect, memo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import globalJson from './world.map.js';
import style from './global-map.module.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchCountries } from '../../api/request.js';

echarts.registerMap('world', globalJson);
echarts.use(
  [MapChart, GeoComponent, CanvasRenderer]
);

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30,
      color: '#00FF00'
    }}
    spin
  />
);

let echartsInstance = null;
let animateIng = false;
const maxCount = globalJson.features.length;
const countryList = globalJson.features.map((item, index) => {
  return {
    name: item.properties.name,
    value: index
  };
});

const initScatterData = {
  rippleEffect: {
    scale: 3
  },
  symbolSize: 10,
  label: {
    show: false
  },
  emphasis: {
    scale: 1.5,
  }
};

const defaultOptions = {
  geo: {
    name: '世界地图',
    map: 'world',
    roam: true,
    top: '20%',
    scaleLimit: {
      min: 1,
      max: 2,
    },
    label: {
      color: '#FFF'
    },
    itemStyle: {
      borderWidth: 0,
    },
    emphasis: {
      label: {
        show: false,
        color: '#FFF'
      },
      itemStyle: {
        areaColor: '#015B32'
      }
    },
  },
  dataRange: {
    min: 0,
    max: maxCount,
    color: ['#024828', '#1A6934'],
    left: -100
  },
  series: [
    {
      type: 'map',
      map: 'world',
      geoIndex: 0,
      scaleLimit: {
        min: 1,
        max: 2,
      },
      selectedMode: false,
      select: {
        disabled: true
      },
      emphasis: {
        disabled: true
      },
      data: countryList,
    },
  ]
};

function initScatter({name, value, region, country}) {
  return {
    name,
    type: 'effectScatter',
    coordinateSystem: 'geo',
    geoIndex: 0,
    data: [
      {
        name,
        value,
        region,
        country,
        visualMap: false
      }
    ],
    symbolSize: 10,
    showEffectOn: 'render',
    rippleEffect: {
      scale: 3
    },
    itemStyle: {
      color: '#00FF17',
      shadowBlur: 6,
      shadowColor: '#00FF17'
    },
    label: {
      color: '#FFF',
      position: 'top',
      formatter (params) {
        return params.data.name;
      }
    },
    emphasis: {
      scale: 1.5,
      label: {
        show: true
      }
    }
  };
}

let GlobalMap = memo(function GlobalMap({toggleSideVideo}) {

  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(defaultOptions);

  useEffect(() => {
    setLoading(true);
    fetchCountries()
      .then(res => {
        const countries = res.data?.map(item => (
          {
            ...item,
            name: item.country,
            value: [item.longitude, item.latitude]
          }
        ));
        setOption({
          ...defaultOptions,
          series: [
            ...defaultOptions.series,
            ...countries.map(initScatter)
          ]
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleHandler = (data) => {
    animateIng = true;
    setTimeout(() => {
      animateIng = false;
      echartsInstance.setOption({
        geo: {
          roam: true
        }
      });
    }, 600);
    toggleSideVideo && toggleSideVideo(data);
  };

  const onChartReadyCallback = (ecInstance) => {
    echartsInstance = ecInstance;
    echartsInstance.getZr().on('click', (params) => {
      if (!params.target) {
        if (animateIng) return;
        toggleHandler(null);
        const series = option.series.map(item => {
          if (item.type === 'map') {
            return item;
          } else {
            return initScatterData;
          }
        });
        echartsInstance.setOption({
          geo: {
            roam: false,
            zoom: 1,
            center: [0, 14]
          },
          series
        });
      }
    });
  };

  const onChartClick = (e) => {
    if (animateIng) return;
    if (e.componentSubType === 'effectScatter') {
      toggleHandler(e.data);
      const name = e.data.name;
      const series = option.series.map(item => {
        if (item.type === 'map') return item;
        if (item.name === name) {
          return {
            rippleEffect: {
              scale: 3
            },
            symbolSize: 20,
            label: {
              show: true
            },
            emphasis: {
              scale: 1,
            }
          };
        } else {
          return initScatterData;
        }
      });
      echartsInstance.setOption({
        geo: {
          roam: false,
          zoom: 1.6,
          center: [e.data.value[0], e.data.value[1]]
        },
        series
      });
    } else {
      toggleHandler(null);
      const series = option.series.map(item => {
        if (item.type === 'map') {
          return item;
        } else {
          return initScatterData;
        }
      });
      echartsInstance.setOption({
        geo: {
          roam: false,
          zoom: 1,
          center: [0, 14]
        },
        series
      });
    }
  };

  return (
    <div className={style.myEchartsMap}>
      {loading && <Spin indicator={antIcon}>
        <ReactECharts
          echarts={echarts}
          option={option}
          onChartReady={onChartReadyCallback}
          onEvents={{
            'click': onChartClick
          }}
        />
      </Spin>}
      {!loading && <ReactECharts
        echarts={echarts}
        option={option}
        onChartReady={onChartReadyCallback}
        onEvents={{
          'click': onChartClick
        }}
      />}
    </div>
  );
});

export default GlobalMap;