import * as echarts from 'echarts';

export const options  = {
  legend: {
    data: ['Vegetarian', 'Light Flexitarian', 'Omnivore', 'Vegan', 'Heavy Flexitarian', 'Carnivore'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
      color: '#00A32E'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  xAxis: {
    type: 'category',
    data: ['UK', 'NL', 'GE'],
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
  series: [
    {
      name: 'Vegetarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#00A32E',
      barWidth: 60,
      data: [30, 30, 30, 33, 39, 33, 30]
    },
    {
      name: 'Light Flexitarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FFC000',
      data: [20, 32, 10, 34, 90, 30, 20]
    },
    {
      name: 'Omnivore',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FE544F',
      data: [32, 30, 31, 34, 30, 30, 30]
    },
    {
      name: 'Vegan',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#00A889',
      data: [30, 32, 1, 34, 30, 30, 20]
    },
    {
      name: 'Heavy Flexitarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FE7C7D',
      data: [32, 32, 31, 33, 39, 33, 32]
    },
    {
      name: 'Carnivore',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#7705BC',
      data: [32, 32, 31, 34, 30, 30, 30]
    }
  ]
};

export const optionsFor1  = {
  legend: {
    data: ['Vegetarian', 'Light Flexitarian', 'Omnivore', 'Vegan', 'Heavy Flexitarian', 'Carnivore'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
      color: '#00A32E'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  xAxis: {
    type: 'category',
    data: ['18-29', '30-39', '40-49', '50-59', '60-69'],
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
  series: [
    {
      name: 'Vegetarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#00A32E',
      data: [30, 30, 30, 33, 39, 33, 30]
    },
    {
      name: 'Light Flexitarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FFC000',
      data: [20, 32, 10, 34, 90, 30, 20]
    },
    {
      name: 'Omnivore',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FE544F',
      data: [32, 30, 31, 34, 30, 30, 30]
    },
    {
      name: 'Vegan',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#00A889',
      data: [30, 32, 1, 34, 30, 30, 20]
    },
    {
      name: 'Heavy Flexitarian',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#FE7C7D',
      data: [32, 32, 31, 33, 39, 33, 32]
    },
    {
      name: 'Carnivore',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      color: '#7705BC',
      data: [32, 32, 31, 34, 30, 30, 30]
    }
  ]
};

export const options2 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Total Animal Meat Consumption', 'Total Plant-Based Food Consumption'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['UK', 'NL', 'GE'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Total Animal Meat Consumption',
      type: 'bar',
      color: '#00A32E',
      data: [
        23.2, 25.6, 76.7
      ]
    },
    {
      name: 'Total Plant-Based Food Consumption',
      type: 'bar',
      color: '#FFC000',
      data: [
        26.4, 28.7, 70.7
      ]
    }
  ]
};

export const options22 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Total Animal Meat Consumption', 'Total Plant-Based Food Consumption'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    orient: 'vertical',
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['18-29', '30-39', '40-49', '50-59', '60-69'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Total Animal Meat Consumption',
      type: 'bar',
      color: '#00A32E',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Total Plant-Based Food Consumption',
      type: 'bar',
      color: '#FFC000',
      data: [
        28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    }
  ]
};

export const options23 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Meat subs', 'Other Plant Based Pro', 'Vegetable Items', 'Pluses or grains ba...'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['UK', 'NL', 'GE'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Meat subs',
      type: 'bar',
      color: '#00A32E',
      data: [
        23.2, 25.6, 76.7
      ]
    },
    {
      name: 'Other Plant Based Pro',
      type: 'bar',
      color: '#FF7C7D',
      data: [
        26.4, 28.7, 70.7
      ]
    },
    {
      name: 'Vegetable Items',
      type: 'bar',
      color: '#FFBF00',
      data: [
        26.4, 28.7, 70.7
      ]
    },
    {
      name: 'Pluses or grains ba...',
      type: 'bar',
      color: '#7705BB',
      data: [
        26.4, 28.7, 70.7
      ]
    }
  ]
};

export const options24 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Meat subs', 'Other Plant Based Pro', 'Vegetable Items', 'Pluses or grains ba...'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['18-29', '30-39', '40-49', '50-59', '60-69'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Meat subs',
      type: 'bar',
      color: '#00A32E',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Other Plant Based Pro',
      type: 'bar',
      color: '#FF7C7D',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Vegetable Items',
      type: 'bar',
      color: '#FFBF00',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Pluses or grains ba...',
      type: 'bar',
      color: '#7705BB',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    }
  ]
};

export const options25 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Less often', 'A few times per year', 'Once or twice a month', 'Several times a week'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['UK', 'NL', 'GE'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Less often',
      type: 'bar',
      color: '#00A32E',
      data: [
        23.2, 25.6, 76.7
      ]
    },
    {
      name: 'A few times per year',
      type: 'bar',
      color: '#FF7C7D',
      data: [
        26.4, 28.7, 70.7
      ]
    },
    {
      name: 'Once or twice a month',
      type: 'bar',
      color: '#FFBF00',
      data: [
        26.4, 28.7, 70.7
      ]
    },
    {
      name: 'Several times a week',
      type: 'bar',
      color: '#7705BB',
      data: [
        26.4, 28.7, 70.7
      ]
    }
  ]
};

export const options26 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Less often', 'A  few times  per year', 'Once or twice a month', 'Several times a week'],
    icon: 'circle',
    bottom: '0',
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: 'rgba(255,255,255, 0.6)',
      fontSize: '12px'
    }
  },
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['18-29', '30-39', '40-49', '50-59', '60-69'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Less often',
      type: 'bar',
      color: '#00A32E',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'A  few times  per year',
      type: 'bar',
      color: '#FF7C7D',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Once or twice a month',
      type: 'bar',
      color: '#FFBF00',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Several times a week',
      type: 'bar',
      color: '#7705BB',
      data: [
        25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    }
  ]
};

export const options3 = {
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#00A32E'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
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
    {
      data: [15, 20, 22, 28, 35, 47, 20],
      type: 'line',
      symbol: 'none',
      color: '#FF544F',
    },
    {
      data: [12, 40, 24, 28, 15, 47, 40],
      type: 'line',
      symbol: 'none',
      color: '#FFBF00',
    },
    {
      data: [20, 23, 24, 18, 15, 17, 60],
      type: 'line',
      symbol: 'none',
      color: '#7705BB',
    }
  ]
};

export const options4 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
      color: '#00A32E'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  xAxis: {
    type: 'category',
    data: ['Brand expertise', 'Health/nutrition', 'Taste', 'Convenience', 'Environment & Ethics'],
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
  series: {
    type: 'bar',
    data: [{
      value: 10,
      itemStyle: {
        color: '#7705BC'
      }
    }, {
      value: 20,
      itemStyle: {
        color: '#00A32E'
      }
    }, {
      value: 30,
      itemStyle: {
        color: '#FFC000'
      }
    }, {
      value: 40,
      itemStyle: {
        color: '#00A889'
      }
    }, {
      value: 50,
      itemStyle: {
        color: '#FF7C7D'
      }
    }]
  }
};

export const options5 = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Brand expertise', 'Health', 'Taste', 'Convenience', 'Ethics'],
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
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['The veg butcher', 'Vivera', 'THIS', 'Quorn', 'Linda McCartney’s', 'Store’s own label'],
    axisPointer: {
      type: 'shadow'
    },
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
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#00A32E'
    },
    splitLine: {
      lineStyle: {
        color: '#00A32E',
        width: 0.5
      }
    }
  },
  series: [
    {
      name: 'Brand expertise',
      type: 'bar',
      color: '#00A32E',
      data: [
        25.6, 76.7, 35.6, 11.2, 33.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Health',
      type: 'bar',
      color: '#FF7C7D',
      data: [
        28.7, 70.7, 25.6, 22.2, 18, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Taste',
      type: 'bar',
      color: '#00A889',
      data: [
        28.7, 70.7, 35.6, 52.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Convenience',
      type: 'bar',
      color: '#FFC000',
      data: [
        28.7, 70.7, 45.6, 42.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Ethics',
      type: 'bar',
      color: '#7705BC',
      data: [
        28.7, 70.7, 75.6, 22.2, 48.7, 18.8, 6.0, 2.3
      ]
    }
  ]
};

export const options6 = {
  grid: {
    top: '3%',
    left: '0',
    right: '0',
    bottom: '0%',
    containLabel: true
  },
  yAxis: {
    type: 'category',
    data: ['L', 'H', 'N', 'P', 'I', 'T', 'N', 'L'],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      fontSize: 16
    }
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [
    {
      data: [10, 20,30,40,50,60,70,80],
      type: 'bar',
      label: {
        show: true,
        position: 'insideRight',
        formatter: '{c}%',
        offset: [-10,0],
        color: '#fff'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
          offset: 0,
          color: 'rgba(0,45,27,0.7)'
        }, {
          offset: 1,
          color: 'rgba(0,174,0,0.7)'
        }])
      }
    }
  ]
};