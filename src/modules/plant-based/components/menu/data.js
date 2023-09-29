import MenuIcon1 from '../../../../assets/images/plant-based/menu-icon-1.svg';
import MenuIcon2 from '../../../../assets/images/plant-based/menu-icon-2.svg';
import MenuIcon3 from '../../../../assets/images/plant-based/menu-icon-3.svg';
import MenuIcon4 from '../../../../assets/images/plant-based/menu-icon-4.svg';
import MenuIcon5 from '../../../../assets/images/plant-based/menu-icon-5.svg';

export const menuList = [
  {
    title: 'Eating Habits',
    desc: 'Find out which plant-based diets and product categories are most popular',
    icon: MenuIcon1,
    index: '0',
    options: [
      {
        subTitle: 'Eating Patterns',
        subDesc: 'Which plant-based diets are most popular?',
        subUrl: '0-0'
      },
      {
        subTitle: 'Category Engagement',
        subDesc: 'Which plant-based product categories are consumed most?',
        subUrl: '0-1'
      },
      {
        subTitle: 'Plant Forward',
        subDesc: 'Is plant-based on the rise?',
        subUrl: '0-2'
      }
    ]
  },
  {
    title: 'Category Drivers',
    desc: 'Learn more about the purchase drivers for plant-based foods & how brands perform against these drivers  ',
    icon: MenuIcon2,
    index: '1',
    options: [
      {
        subTitle: 'Eating Patterns',
        subDesc: 'What are the most important drivers for consumers when choosing plant-based products?',
        subUrl: '1-0'
      },
      {
        subTitle: 'Market Performance',
        subDesc: 'How well is the plant-based category performing on these different category drivers?',
        subUrl: '1-1'
      }
    ]
  },
  {
    title: 'PAINS & GAINS',
    desc: 'Understand the reasons why consumers (do/ don’t) buy plant-based foods',
    icon: MenuIcon3,
    index: '2',
    options: [
      {
        subTitle: 'Plant-Based Triggers & Gains',
        subDesc: '',
        subUrl: '2-0'
      },
      {
        subTitle: 'Plant-Based Barriers & Pain Points',
        subDesc: '',
        subUrl: '2-1'
      }
    ]
  },
  {
    title: 'Needstates & Occasions',
    desc: 'Identify the key moments and needstates for plant-based foods to tap into',
    icon: MenuIcon4,
    index: '3',
    options: [
    ]
  },
  {
    title: 'Trends',
    desc: 'Explore the latest consumer & market trends in plant-based foods',
    icon: MenuIcon5,
    index: '4',
  },
];