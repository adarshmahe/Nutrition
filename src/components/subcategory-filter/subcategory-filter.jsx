import React, { useEffect, useRef, useState } from 'react';
import { chevronDownIcon } from '../icons/icons.jsx';
import FilterModal from '../brand-filter/filterModal.jsx';
import api from '@/util/api.jsx';
import { apiURL } from '../../env-url.js';

function SubcategoryFilter({ handleFilteredData, consumerTrendsCategory }) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const ref = useRef(null);
  const [filteredResults, setFilteredResults] = useState([]);

  let consumerTrend = encodeURIComponent(consumerTrendsCategory);
  const fetchData = () => {
    api
      .get(
        `${apiURL}/trends/mintel/subcategory?country=uk&consumerTrend=${consumerTrend}`,
      )
      .then((response) => {
        setFilteredResults((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  console.log(filteredResults,'ssssss');
  const handleButtonClick = () => {
    setIsSortOpen(!isSortOpen);
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    fetchData();
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
    
  }, []);

  return (
    <div ref={ref}>
      <div className="consumer-filter-container">
        <button
          className={'subcategory-filter' + (isSortOpen ? ' active' : '')}
          onClick={handleButtonClick}
          role='button'
        >
          <span>Subcategory</span>
          {isSortOpen ? (
            <img
              className="up-arrow-filter"
              src={chevronDownIcon}
              alt="arrow"
            />
          ) : (
            <img className="arrow-sort" src={chevronDownIcon} alt="arrow" />
          )}
        </button>
        {isSortOpen && (
          <FilterModal isOpen={isSortOpen} 
            onApply={handleButtonClick} 
            data={filteredResults}
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
export default SubcategoryFilter;
