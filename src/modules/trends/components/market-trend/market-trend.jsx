import React, { useState } from 'react';
import MarketTrendChart from './market-trend-chart.jsx';
import {
  searchTikTok,
  competitorInnovation,
  leftLineIcon,
} from '../../../../components/icons/icons.jsx';
import MarTrends from '../../pages/market-trend-search-tik-tok.jsx';
import { consumerTrendDesc } from '../../utils/consumer-trend-desc.js';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from '../../../../components/profile/profile.jsx';

const MarketTrend = ({
  consumerTrendsCategory,
  selectedItemName,
}) => {
  const location = useLocation();
  let selectedName = location.state.selectedItemName;
  let consumerCategory = location.state.consumerTrendsCategory;

  const [showMarTrends, setShowMarTrends] = useState(false);

  const handleSearchTikTokClick = () => {
    setShowMarTrends(true);
  };

  const handleBackButtonClick = () => {
    setShowMarTrends(false);
  };

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/consumer-trends-innovations', {
      state: {
        selectedItemName: selectedItemName,
        consumerTrendsCategory: consumerTrendsCategory,
      },
    });
    setShowMarTrends(false);
  };
  const handleNavigationMain = () => {
    navigate('/trends-dial', {
      state: {
        selectedItemName: selectedItemName,
        consumerTrendsCategory: consumerTrendsCategory,
      },
    });
    setShowMarTrends(false);
  };

  const isActiveTab = (tabName) => {
    return selectedItemName === tabName ? 'active-tab' : '';
  };

  return (
    <>
      <div className="horizontal-user-profile">
        <Profile />
      </div>
      {showMarTrends === false && (
        <div className="trends-container">
          <>
            <div className="trends-detail-title">
              <h2 onClick={handleNavigationMain}>
                <img src={leftLineIcon} alt="backIcon" />
                {consumerTrendsCategory
                  ? consumerTrendsCategory
                  : consumerCategory}
                /{selectedItemName ? selectedItemName : selectedName}
              </h2>
            </div>
            <div className="trends-detail-wrapper">
              <div className="function-nutrition-desc">
                {consumerTrendDesc.map((data) =>
                  selectedItemName === data.title ? (
                    <p
                      className={`trend-desc ${isActiveTab(data.title)}`}
                      key={data.id}
                    >
                      {data.content}
                    </p>
                  ) : null
                )}
              </div>

              <div className="search-innovation-wrapper">
                <div className="search-tik-tok-group">
                  <div className="comp-inno">
                    <img
                      src={searchTikTok}
                      alt="search"
                      className="search-tik-tok-icon"
                    />
                  </div>
                  <button
                    className={`trends-search-button ${isActiveTab('TikTok')}`}
                    role="button"
                    onClick={handleSearchTikTokClick}
                  >
                    SEARCH & TIK-TOK
                  </button>
                </div>
                <div className="competitor-innovation-group">
                  <div className="comp-inno">
                    <img
                      src={competitorInnovation}
                      alt="competitor-innovation"
                      className="competitor-innovation-icon"
                    />
                  </div>
                  <button
                    className={`trends-search-button ${isActiveTab(
                      'Competitor Innovation'
                    )}`}
                    role="button"
                    onClick={handleNavigation}
                  >
                    COMPETITOR INNOVATION
                  </button>
                </div>
              </div>
            </div>
            <div className="two-graph">
              <MarketTrendChart selectedItemName={selectedItemName} />
            </div>
          </>
        </div>
      )}
      {showMarTrends && (
        <MarTrends
          consumerTrendsCategory={
            consumerTrendsCategory ? consumerTrendsCategory : consumerCategory
          }
          selectedItemName={selectedItemName ? selectedItemName : selectedName}
          handleBackMarketTrends={handleBackButtonClick}
        />
      )}
    </>
  );
};

export default MarketTrend;
