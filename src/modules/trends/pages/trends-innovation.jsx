import React, { useState } from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import MarketTrendHorizontalNav from '../components/market-trend-horizontal-nav/market-trend-horizontal-nav.jsx';
import TrendsInnovation from '../components/competitor-innovation/trends-innovation.jsx';
import ConsumerFilters from '../components/competitor-innovation/consumer-trends/consumer-filter/consumer-filter.jsx';
import Profile from '../../../components/profile/profile.jsx';
import { useLocation } from 'react-router-dom';

function ConsumerTrendsInnovation() {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilteredData = (data) => {
    setFilteredData(data);
  };
  const location = useLocation();
  let selectedItemName = location.state.selectedItemName;
  let consumerTrendsCategory = location.state.consumerTrendsCategory;
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <div className="horizontal-user-profile">
            <Profile />
          </div>
          <MarketTrendHorizontalNav
            consumerTrendsCategory={consumerTrendsCategory}
            selectedItemName={selectedItemName}
          />
          <ConsumerFilters
            handleFilteredData={handleFilteredData}
            consumerTrendsCategory={selectedItemName}
          />
          <TrendsInnovation
            filteredData={filteredData}
            consumerTrendsCategory={selectedItemName}
          />
        </div>
      </div>
    </>
  );
}

export default ConsumerTrendsInnovation;
