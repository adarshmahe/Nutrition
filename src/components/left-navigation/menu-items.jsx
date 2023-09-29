import {
  gotflIcon,
  gotflIconGreen,
  trendsIcon,
  trendsIconGreen,
  marketMediaPerformanceIcon,
  marketMediaPerformanceIconGreen,
  mixCraterIcon,
  mixCraterIconGreen,
  knowledgeHubIcon,
  knowledgeHubIconGreen,
  conceptAiIcon,
  conceptAiIconGreen,
  chartIcon,
  chartIconGreen,
} from '../icons/icons.jsx';

export const menuItems = [
  {
    id: 1,
    title: 'Get On The Front Line',
    url: '/frontlinetime',
    iconWhite: gotflIcon,
    iconGreen: gotflIconGreen,
    submenus: [
      {
        title: 'Frontline Time',
        url: '/frontlinetime',
        iconwhite: conceptAiIcon,
        iconGreen: conceptAiIconGreen,
      },
      {
        title: 'Consumer Theater',
        url: '/consumertheater',
        iconwhite: chartIcon,
        iconGreen: chartIconGreen,
      },
    ],
  },
  {
    id: 2,
    title: 'Trends',
    url: '/trends-dial',
    iconWhite: trendsIcon,
    iconGreen: trendsIconGreen,
    submenus: [
      {
        title: 'Trend Dial',
        url: '/trends-dial',
        iconwhite: conceptAiIcon,
        iconGreen: conceptAiIconGreen,
      },
      {
        title: 'Irresistible Top Dish',
        url: '/irresistibletopdish',
        iconwhite: chartIcon,
        iconGreen: chartIconGreen,
      },
    ],
  },
  {
    id: 3,
    title: 'Marketing & Media',
    url: '/marketingmedia',
    iconWhite: marketMediaPerformanceIcon,
    iconGreen: marketMediaPerformanceIconGreen,
    submenus: [
      {
        title: 'Market Trend & Performance',
        url: '/market-trend-performance',
        iconwhite: conceptAiIcon,
        iconGreen: conceptAiIconGreen,
      },
      {
        title: 'Knowledge Zone',
        url: '/knowledgezone',
        iconwhite: chartIcon,
        iconGreen: chartIconGreen,
      },
    ],
  },
  {
    id: 4,
    title: 'Mix Crafter',
    url: '/mixcrafter',
    iconWhite: mixCraterIcon,
    iconGreen: mixCraterIconGreen,
    submenus: [
      {
        title: 'Concept AI',
        url: '/conceptai',
        iconwhite: conceptAiIcon,
        iconGreen: conceptAiIconGreen,
      },
      {
        title: 'Pains & Gains',
        url: '/painsgains',
        iconwhite: chartIcon,
        iconGreen: chartIconGreen,
      },
    ],
  },
  {
    id: 5,
    title: 'Nutrition Hub',
    url: '/commercializing-sustainability',
    iconWhite: knowledgeHubIcon,
    iconGreen: knowledgeHubIconGreen,
    submenus: [
      {
        title: 'Commercializing Sustainability',
        url: '/commercializing-sustainability',
        iconwhite: conceptAiIcon,
        iconGreen: conceptAiIconGreen,
      },
      {
        title: 'Plant Based',
        url: '/plantbased',
        iconwhite: chartIcon,
        iconGreen: chartIconGreen,
      },
      {
        title: 'Knowledge Tree of Wisdom',
        url: '/knowledge-tree',
        iconwhite: knowledgeHubIcon,
        iconGreen: knowledgeHubIconGreen,
      },
    ],
  },
];
