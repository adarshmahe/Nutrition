import React from 'react';
import {
  trendingup,
  leftLineIcon,
  trendingDown,
} from '../../../../components/icons/icons.jsx';
import { useNavigate } from 'react-router-dom';

const SegmentPopup = ({
  visible,
  data,
  modalClose,
  selectedSegmentData,
  marketTrends,
  smartSolutionData,
  healthierLivingData,
  smartSpendingData,
  indulgingExperiencesData,
  cookingRenaissanceData,
  consciousChoicesData,
  anytimeAnywhereData,
}) => {
  if (!visible) return null;
  const navigate = useNavigate();
  const handleMarketTrends = (itemName) => {
    navigate('/market-trend-performance', {
      state: {
        consumerTrendsCategory: selectedSegmentData[0].name,
        selectedItemName: itemName,
      },
    });
  };

  const mapDataBasedOnSegment = (segmentName) => {
    switch (segmentName) {
    case 'HEALTHIER LIVING':
      return healthierLivingData;
    case 'SMART SPENDING':
      return smartSpendingData;
    case 'INDULGING EXPERIENCES':
      return indulgingExperiencesData;
    case 'SMART SOLUTIONS':
      return smartSolutionData;
    case 'COOKING RENAISSANCE':
      return cookingRenaissanceData;
    case 'ANYTIME ANYWHERE':
      return anytimeAnywhereData;
    case 'CONSCIOUS CHOICES':
      return consciousChoicesData;
    default:
      return [];
    }
  };

  return (
    <>
      {' '}
      {marketTrends === false && data !== null && (
        <div className="segment-popup containerwrapper">
          <span className="close-trends-popup" onClick={modalClose}>
            <img src={leftLineIcon} className="back-arrow-icon" alt="back" />
            Back
          </span>
          <div className="segment-data">
            <div className="outer-details">
              <h3>{selectedSegmentData[0].name}</h3>
              <span>
                What is our customer
                <br />
                doing for a healhier living?
              </span>
            </div>
            <div className="trends-model">
              <div className="trends-tags">
                <h2>CAGR</h2>
                <span>10%</span>
                <div className="trending-status">
                  <img src={trendingup} className="trendingup" />
                </div>
                <p>2019-23</p>
              </div>
              <div className="trends-tags">
                <h2>YOY</h2>
                <span>10%</span>
                <div className="trending-status">
                  <img src={trendingup} className="trendingup" />
                </div>
                <p>2023</p>
              </div>
            </div>
          </div>
          <div className="trends-consumer">
            <h4>Emerging Food Solution Trends</h4>
            <ul className="sublist clickable">
              {selectedSegmentData[0].children.map((items, i) => (
                <li key={i}><a href={items.link}>{items.name}</a></li>
              ))}
            </ul>
          </div>
          <div className="trends-consumer">
            <h4>Consumer Trends</h4>
            <ul className="sublist clickable">
              {(mapDataBasedOnSegment(selectedSegmentData[0].name) || []).map(
                (item, i) => (
                  <li key={i} onClick={() => handleMarketTrends(item.name)}>
                    {item.name}
                    <ul className="percentage-box">
                      {item.cagr !== undefined && (
                        <li>
                          <span className="total-percentage">
                            {Math.floor(item.cagr)}%
                          </span>
                          <span className="percentage-icon">
                            {item.cagr > 0 ? (
                              <img
                                src={trendingup}
                                className="positive-icon"
                                alt="icon"
                              />
                            ) : (
                              <img
                                src={trendingDown}
                                className="negative-icon"
                                alt="icon"
                              />
                            )}{' '}
                          </span>
                          <span className="percetage-title">CAGR</span>
                        </li>
                      )}
                      {item.yoy !== undefined && (
                        <li>
                          <span className="total-percentage">
                            {Math.floor(item.yoy)}%
                          </span>
                          <span className="percentage-icon">
                            {item.yoy >= 0 ? (
                              <img
                                src={trendingup}
                                className="positive-icon"
                                alt="icon"
                              />
                            ) : (
                              <img
                                src={trendingDown}
                                className="negative-icon"
                                alt="icon"
                              />
                            )}{' '}
                          </span>
                          <span className="percetage-title">YOY</span>
                        </li>
                      )}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SegmentPopup;
