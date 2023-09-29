import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import MarketTrend from '../components/market-trend/market-trend.jsx';
import { useLocation } from 'react-router-dom';

function MarTrends() {
  const location = useLocation();
  let consumerTrendsCategory = location.state.consumerTrendsCategory;
  let selectedItemName = location.state.selectedItemName;
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <MarketTrend
            consumerTrendsCategory={consumerTrendsCategory}
            selectedItemName={selectedItemName}
          />
        </div>
      </div>
    </>
  );
}

export default MarTrends;
