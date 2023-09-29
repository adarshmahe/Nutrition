import React, { useState } from 'react';
import {
  closeIcon,
  searchIcon,
} from '../../../../../components/icons/icons.jsx';

const SustainabilitySearch = ({
  handleFilterData,
  searchQuery,
  setSearchQuery,
  principleData,
  plantData,
  foodData,
  agricultureData,
  activeTab,
}) => {
  const [showInput, setShowInput] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    let filteredResults = [];

    switch (activeTab) {
    case 'tab1':
      filteredResults = filterData(principleData, query);
      break;
    case 'tab2':
      filteredResults = filterData(plantData, query);
      break;
    case 'tab3':
      filteredResults = filterData(foodData, query);
      break;
    case 'tab4':
      filteredResults = filterData(agricultureData, query);
      break;
    default:
      // Default behavior: reset filtered data
      handleFilterData([]);
      break;
    }

    handleFilterData(filteredResults);
    setShowInput(true);
  };

  const filterData = (data, query) => {
    
    if (!data || !query) {
      return []; // Return an empty array if data or query is undefined
    }
  
    const filteredResults = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) // Simplified filtering logic for testing
    );
    return filteredResults;
  };
  
  const searchOnChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    if (inputValue.trim() !== '') {
      handleSearch();
    } else {
      // If the input value is empty, reset the filtered data
      handleFilterData([]);
    }
  };

  return (
    <>
      <div className="search-main-container">
        <div className="search-section" >
          {showInput && (
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={searchOnChange}
              placeholder="Search..."
            />
          )}
          {searchQuery === '' ? (
            <img src={searchIcon} alt="search" onClick={handleSearch} />
          ) : (
            <img
              src={closeIcon}
              alt="search"
              onClick={() => {setSearchQuery('');
                handleFilterData([]);
                setShowInput(false);
              }}
              
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SustainabilitySearch;