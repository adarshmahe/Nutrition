import React, { useState, useEffect } from 'react';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
import ConsumerTrendCard from '../consumer-trend/consumer-trend-card.jsx';
import { useNavigate } from 'react-router-dom';

function TrendsHorizontalNav({
  consumerTrendsCategory,
  selectedItemName,
  selectedCategory,
  showTickTock,
  setShowTickTock,
  object,
}) {
  const [activeTab, setActiveTab] = useState('tab2');
  const [activeNav, setActiveNav] = useState('tab3');

  useEffect(() => {
    if (location.pathname === '/consumer-trends-innovations') {
      setActiveTab('tab2');
    } else {
      setActiveTab('tab1');
      setActiveNav('tab3');
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/consumer-trends-innovations', {
      state: {
        consumerTrendsCategory: consumerTrendsCategory,
        selectedItemName: selectedItemName,
      },
    });
  };
  const handleBack = () => {
    // setShowDrillDown(!showDrillDown);
    navigate('/market-trend-performance', {
      state: {
        consumerTrendsCategory: consumerTrendsCategory,
        selectedItemName: selectedItemName,
      },
    });
  };
  return (
    <div className="horizontal-nav-container">
      <div className="horizontal-nav mt-20">
        <div className="trends-horizontal-items-container">
          <div className="trends-title">
            <img src={leftLineIcon} alt="left-arrow" onClick={handleBack} />
            <span>{selectedItemName}</span>
          </div>
        </div>
        <div>
          <div className="toggle-button">
            <button
              className={activeTab === 'tab1' ? 'active ' : ''}
              onClick={() => {
                setActiveTab('tab1');
                setActiveNav('tab4'); // Set tab4 as active when switching tabs
                setShowTickTock(true);
              }}
            >
              Search & Tik-Tok
            </button>
            <button
              className={activeTab === 'tab2' ? 'active ' : ''}
              role="button"
              onClick={handleNavigation}
            >
              COMPETITOR INNOVATION
            </button>
          </div>
        </div>
      </div>
      <div className="trends-subnavigation">
        <div
          className={activeNav === 'tab3' ? 'active' : ''}
          onClick={() => {
            setActiveNav('tab3');
            setActiveTab('tab1');
            setShowTickTock(true); // Show Tik-Tok content when Tik-Tok Resource tab is clicked
          }}
          role="button"
        >
          <span className="tik-tok-resouce">Search Analysis</span>
        </div>
        <div
          className={activeNav === 'tab4' ? 'active' : ''}
          onClick={() => {
            setActiveNav('tab4');
            setActiveTab('tab1');
            setShowTickTock(false); // Hide Tik-Tok content when Search Analysis tab is clicked
          }}
          role="button"
        >
          <span className="search-analysis">Tik-Tok Resource</span>
        </div>
      </div>
      {(activeNav === 'tab4' || activeNav === 'tab1' || !showTickTock) && (
        // Display ConsumerTrendCard only when tab4 is active
        <ConsumerTrendCard
          consumerTrendsCategory={consumerTrendsCategory}
          selectedItemName={selectedItemName}
          selectedCategory={selectedCategory}
          setShowTickTock={setShowTickTock}
          object={object}
        />
      )}
    </div>
  );
}

export default TrendsHorizontalNav;
