import React, { useEffect, useRef, useState } from 'react';
import { chevronDownIcon } from '../icons/icons.jsx';
import FilterModal from './filterModal.jsx';
import api from '../../util/api.jsx';
import { apiURL } from '../../env-url.js';

function BrandFilter({ handleFilteredData, consumerTrendsCategory }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const ref = useRef(null);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  let consumerTrend = encodeURIComponent(consumerTrendsCategory);
  const fetchBrands = () => {
    
    api
      .get(
        `${apiURL}/trends/mintel/brands?country=uk&consumerTrend=${consumerTrend}`,
      )
      .then((response) => {
        setFilteredBrands((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const handleButtonClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    fetchBrands();
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <div className="consumer-filter-container">
        <button
          className={'brand-filter' + (isFilterOpen ? ' active' : '')}
          onClick={handleButtonClick}
          role="button"
        >
          <span>Brand</span>
          {isFilterOpen ? (
            <img
              className="up-arrow-filter"
              src={chevronDownIcon}
              alt="arrow"
            />
          ) : (
            <img className="arrow-filter" src={chevronDownIcon} alt="arrow" />
          )}
        </button>
      </div>
      {isFilterOpen && (
        <FilterModal
          onClose={handleButtonClick}
          isOpen={isFilterOpen}
          onApply={handleButtonClick}
          data={filteredBrands}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          handleFilteredData={handleFilteredData}
          consumerTrendsCategory ={consumerTrendsCategory }
        />
      )}
    </div>
  );
}

export default BrandFilter;
