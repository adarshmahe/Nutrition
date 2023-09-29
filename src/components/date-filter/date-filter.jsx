import React, { useEffect, useRef, useState } from 'react';
import { chevronDownIcon } from '../icons/icons.jsx';
import FilterModal from '../brand-filter/filterModal.jsx';
import api from '@/util/api.jsx'
import { apiURL } from '../../env-url.js';

function DateFilter({ handleFilteredData }) {
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const ref = useRef(null);

  const handleButtonClick = () => {
    setIsDateClicked(!isDateClicked);
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsDateClicked(false);
    }
  };

  const fetchData = () => {
    api
      .get(
        `${apiURL}/trends/mintel/consumerTrendDetails?country=uk&consumentTrend=Affordable Meals at Home `,
      )
      .then((response) => {
        setFilteredResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const extractedData = filteredResults.map((item) => ({
    updatedTimestamp: item.updatedTimestamp,
    datePublished: item.datePublished,
  }));

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
          className={'date-filter' + (isDateClicked ? ' active' : '')}
          onClick={handleButtonClick}
          role="button"
        >
          <span>Date</span>
          {isDateClicked ? (
            <img
              className="up-arrow-filter"
              src={chevronDownIcon}
              alt="arrow"
            />
          ) : (
            <img className="arrow-sort" src={chevronDownIcon} alt="arrow" />
          )}
        </button>
        {isDateClicked && (
          <FilterModal
            isOpen={isDateClicked}
            isDateClicked={isDateClicked}
            onApply={handleButtonClick}
            handleFilteredData={handleFilteredData}
            data={extractedData}
          />
        )}
      </div>
    </div>
  );
}
export default DateFilter;
