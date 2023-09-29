import React, { useState, useEffect } from 'react';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
function MarketTrendsHorizontalNav({
  handleBackMarketTrends,
  consumerTrendsCategory,
  selectedItemName,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [localActiveTab, setLocalActiveTab] = useState('tab1');
  useEffect(() => {
    if (location.pathname === '/consumer-trends-innovations') {
      setLocalActiveTab('tab2');
    } else {
      setLocalActiveTab('tab1');
    }
  }, [location.pathname]);

  const handleTabClick = (tab, route) => {
    setLocalActiveTab(tab);
    navigate(route, {
      state: {
        selectedItemName: selectedItemName,
        consumerTrendsCategory: consumerTrendsCategory,
      },
    });
  };

  return (
    <>
      <div className="horizontal-nav-container">
        <div className="horizontal-nav mt-20">
          <div className="trends-horizontal-items-container">
            <div className="trends-title" onClick={handleBackMarketTrends}>
              <img
                src={leftLineIcon}
                alt="left-arrow"
                onClick={() =>
                  handleTabClick('tab1', '/market-trend-performance')
                }
              />
              <span>{selectedItemName}</span>
            </div>
          </div>
          <div>
            <div className="toggle-button">
              <button
                className={localActiveTab === 'tab1' ? 'active ' : ''}
                onClick={() =>
                  handleTabClick('tab1', '/market-trend-performance')
                }
              >
                Search & Tik-Tok
              </button>
              <button
                className={localActiveTab === 'tab2' ? 'active ' : ''}
                onClick={() =>
                  handleTabClick('tab2', '/consumer-trends-innovations')
                }
              >
                Competitors Innovation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketTrendsHorizontalNav;
