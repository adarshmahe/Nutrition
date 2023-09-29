import React, { useEffect, useRef, useState } from 'react';
import { searchGreenIcon, closeIcon } from '../icons/icons.jsx';
import api from '@/util/api.jsx'
import { apiURL } from '../../env-url.js';
import calenderIcon from '../../assets/images/svg/calendar-icon.svg';

function FilterModal({
  isOpen,
  onApply,
  data,
  handleFilteredData,
  isDateClicked,
  consumerTrendsCategory, 
  selectedOptions,
  setSelectedOptions
}) {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [innovationData, setInnovationData] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const inputRef = useRef();

  let consumerTrend = encodeURIComponent(consumerTrendsCategory);
  const fetchData = () => {
    
    api
      .get(
        `${apiURL}/trends/mintel/consumerTrendDetails?country=uk&consumentTrend=${consumerTrend}`,
      )
      .then((response) => {
        setInnovationData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query || '');
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions((prevSelectedBrands) => [
        ...prevSelectedBrands,
        value,
      ]);
    } else {
      setSelectedOptions((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedOptions([]);
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDataBrand = innovationData.filter((item) => {
    return (
      selectedOptions.length === 0 ||
      selectedOptions.includes(item.brand) ||
      selectedOptions.includes(item.subCategory) ||
      (item.datePublished && item.updatedTimestamp && (
        selectedOptions.includes(item.datePublished) ||
        selectedOptions.includes(item.updatedTimestamp)
      ))
    );
  });

  const filteredList = data.filter(function (item) {
    return item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleFilterAppy = () => {
    handleFilteredData(filteredDataBrand);
    onApply();
  };

  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchClick = () => {
    setSearchClick(!searchClick);
    focusInputField();
  };

  return (
    <>
      <div className={`filter-modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          {isDateClicked && (
            <div className="flex">
              <div className="start-date">
                Start date
                <input
                  type="date"
                  style={{
                    backgroundImage: `url(${calenderIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 3px center',
                  }}
                />
              </div>
              <div className="end-date">
                End date
                <input
                  type="date"
                  style={{
                    backgroundImage: `url(${calenderIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 3px center',
                  }}
                />
              </div>
            </div>
          )}
          <div className="search">
            <div className="search-input">
              <input
                className="input-search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                ref={inputRef} // Add ref to input for focusing
              />
              {searchQuery === '' ? (
                <img
                  src={searchGreenIcon}
                  className="search-icon"
                  alt="search"
                  onClick={handleSearchClick} // Toggle search click state
                />
              ) : (
                <img
                  src={closeIcon}
                  className="search-icon"
                  alt="clear"
                  onClick={handleSearchClick} // Toggle search click state
                />
              )}
            </div>
          </div>

          <div className="search-label-wrapper">
            {filteredList.map((option, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.name)}
                  onChange={handleBrandChange}
                  value={option.name}
                />
                {option.name}
              </label>
            ))}
          </div>
          <button
            className="btn-filter"
            onClick={handleFilterAppy}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFilterAppy(); // You missed invoking the function here
              }
            }}
            role="button"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterModal;
