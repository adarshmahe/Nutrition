import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import TopDishes from '../components/search-analysis/top-dishes.jsx';
import { useLocation } from 'react-router-dom';

function ConsumerBarChart() {
  const location = useLocation();
  let selectedItemName = location.state.selectedItemName;
  let consumerTrendsCategory = location.state.consumerTrendsCategory;
  let category = location.state.category;
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <TopDishes
            selectedItemName={selectedItemName}
            consumerTrendsCategory={consumerTrendsCategory}
            category={category}
          />
        </div>
      </div>
    </>
  );
}

export default ConsumerBarChart;
