import React, { useEffect, useRef, useState } from 'react';
import { chevronDownIcon } from '../icons/icons.jsx';
import FilterModal from '../brand-filter/filterModal.jsx';
import api from '@/util/api.jsx';
import { apiURL } from '../../env-url.js';

function MarketFilter({ handleFilteredData, consumerTrendsCategory }) {
  const [isMarketFilter, setIsMarketFilter] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const ref = useRef(null);
  const [filteredMarket, setFilteredMarket] = useState([]);

  let consumerTrend = encodeURIComponent(consumerTrendsCategory);
  const fetchMarketData = () => {
    api
      .get(
        `${apiURL}/trends/mintel/market?country=uk&consumerTrend=${consumerTrend} `,
      )
      .then((response) => {
        setFilteredMarket((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleButtonClick = () => {
    setIsMarketFilter(!isMarketFilter);
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsMarketFilter(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <div className="consumer-filter-container">
        <button
          className={'market-filter' + (isMarketFilter ? ' active' : '')}
          onClick={handleButtonClick}
        >
          <span>Market</span>
          {isMarketFilter ? (
            <img
              className="up-arrow-filter"
              src={chevronDownIcon}
              alt="arrow"
            />
          ) : (
            <img className="arrow-sort" src={chevronDownIcon} alt="arrow" />
          )}
        </button>
        {isMarketFilter && (
          <FilterModal
            isOpen={isMarketFilter}
            onApply={handleButtonClick}
            data={filteredMarket}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            handleFilteredData={handleFilteredData}
            consumerTrendsCategory={consumerTrendsCategory}
          />
        )}
      </div>
    </div>
  );
}
export default MarketFilter;
