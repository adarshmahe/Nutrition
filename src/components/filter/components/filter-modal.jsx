import React, { useEffect, useRef, useState } from 'react';
// import data from '../../../modules/gotfl/components/learning-card/data.js';
import { searchGreenIcon, searchIcon } from '../../icons/icons.jsx';
import calenderIcon from '../../../assets/images/svg/calendar-icon.svg';
import api from '../../../util/api.jsx';

const FilterModal = ({
  filter,
  setFilter,
  handleNavFilterData,
  selectedTags,
  setSelectedTags,
  selectedMarkets,
  setSelectedMarkets,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  data,
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate
}) => {
  const [filterLabel, setFilterLabel] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [searchClickBrand, setSearchClickBrand] = useState(false);
  const [searchClickTags, setSearchClickTags] = useState(false);
  const [searchClickMarket, setSearchClickMarket] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const ref = useRef();
  const brandRef = useRef();
  const marketRef = useRef();
  const tagRef = useRef();
  const inputRef = useRef();

  const handleClickOutsideSearch = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchClick(false);
    }
    if (brandRef.current && !brandRef.current.contains(event.target)) {
      setSearchClickBrand(false);
    }
    if (marketRef.current && !marketRef.current.contains(event.target)) {
      setSearchClickMarket(false);
    }
    if (tagRef.current && !tagRef.current.contains(event.target)) {
      setSearchClickTags(false);
    }
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

  const handleSearchClickBrand = () => {
    setSearchClickBrand(!searchClickBrand);
  };

  const handleSearchClickTags = () => {
    setSearchClickTags(!searchClickTags);
  };

  const handleSearchClickMarket = () => {
    setSearchClickMarket(!searchClickMarket);
  };

  const fetchData = () => {
    api
      .get('/gotfl/learnings/labellings')
      .then((response) => {
        setFilterLabel((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, []);

  const CategoryData = filterLabel.filter((ele) => ele.classificationId === 1);
  const brandData = filterLabel.filter((ele) => ele.classificationId === 2);
  const marketData = filterLabel.filter((ele) => ele.classificationId === 3);
  const tagData = filterLabel.filter((ele) => ele.classificationId === 4);
  const [searchBrands, setSearchBrands] = useState(brandData);
  const [searchMarket, setSearchMarket] = useState(marketData);
  const [searchTags, setSearchTags] = useState(tagData);
  const [filtercategory, setFilterCategory] = useState(CategoryData);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prevSelectedCategory) => [
        ...prevSelectedCategory,
        value,
      ]);
    } else {
      setSelectedCategories((prevSelectedCategory) =>
        prevSelectedCategory.filter((category) => category !== value)
      );
    }
  };
  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };
  const handleMarketChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMarkets((prevSelectedMarket) => [
        ...prevSelectedMarket,
        value,
      ]);
    } else {
      setSelectedMarkets((prevSelectedMarket) =>
        prevSelectedMarket.filter((market) => market !== value)
      );
    }
  };
  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, value]);
    } else {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((tag) => tag !== value)
      );
    }
  };

  const handleCategorySearch = (e) => {
    const query = e.target.value;
    var updatedList = [...CategoryData];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilterCategory(updatedList);
  };
  const handleBrandSearch = (e) => {
    const query = e.target.value;
    var updatedList = [...brandData];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearchBrands(updatedList);
  };

  const handleMarketSearch = (e) => {
    const query = e.target.value;
    var updatedList = [...marketData];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearchMarket(updatedList);
  };

  const handleTagSearch = (e) => {
    const query = e.target.value;
    var updatedList = [...tagData];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearchTags(updatedList);
  };

  // Filter the data based on selected labels
  const filteredData = data.filter((item) => {
    const selectedCategoryNames = selectedCategories.map((category) =>
      category.toLowerCase()
    );
    const itemCategoryNames = item.learningLabel.map((label) =>
      label.name.toLowerCase()
    );
    const selectedBrandNames = selectedBrands.map((brand) =>
      brand.toLowerCase()
    );
    const itemBrandNames = item.learningLabel.map((label) =>
      label.name.toLowerCase()
    );
    const selectedMarketNames = selectedMarkets.map((market) =>
      market.toLowerCase()
    );
    const itemMarketNames = item.learningLabel.map((label) =>
      label.name.toLowerCase()
    );
    const itemCreatedDate = new Date(item.createdOn).getTime();
    const startTimestamp = selectedStartDate ? new Date(selectedStartDate).getTime() : 0;
    const endTimestamp = selectedEndDate ? new Date(selectedEndDate).getTime() : Infinity;
  
    return (
      (selectedTags.length === 0 || selectedTags.includes(item.tags)) &&
      (selectedMarketNames.length === 0 ||
        selectedMarketNames.some((market) =>
          itemMarketNames.includes(market)
        )) &&
      (selectedCategoryNames.length === 0 ||
        selectedCategoryNames.some((category) =>
          itemCategoryNames.includes(category)
        )) &&
      (selectedBrandNames.length === 0 ||
        selectedBrandNames.some((brand) => itemBrandNames.includes(brand))) &&
      (itemCreatedDate >= startTimestamp && itemCreatedDate <= endTimestamp)
    );
  });

  const isFutureStartDate = new Date(selectedStartDate) > new Date();
  const isStartDateAfterEndDate = new Date(selectedStartDate) > new Date(selectedEndDate);

  const handleFilterAppy = () => {
  if (!isFutureStartDate && !isStartDateAfterEndDate) {
    setStartDateError(false);
    setEndDateError(false);
    handleNavFilterData(filteredData);
    setFilter(!filter);
    fetchData();
  } else {
    if (isFutureStartDate) {
      setStartDateError(true);
    }
    if (isStartDateAfterEndDate) {
      setEndDateError(true);
    }
  }
};

return (
  <div className="filtermodal-container">
    <div className="filter-time">Time Period</div>
    <div className="flex">
      <div className="start-date">
        Start date
        <input
          type="date"
          style={{
            backgroundImage: `url(${calenderIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 3px center',
            borderColor: startDateError ? 'red' : '',
          }}
          value={selectedStartDate}
          onChange={(e) => {
            const newStartDate = e.target.value;
            if (!isFutureStartDate && !isStartDateAfterEndDate) {
              setStartDateError(false);
              
            }
            setSelectedStartDate(newStartDate);
          }}
          max={selectedEndDate || ''}
        />
        {startDateError && (
          <div className="error-message">Start date cannot be in the future.</div>
        )}
        {endDateError && (
          <div className="error-message">Start date cannot be after the end date.</div>
        )}
      </div>
      <div className="end-date">
        End date
        <input
          type="date"
          style={{
            backgroundImage: `url(${calenderIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 3px center',
            borderColor: endDateError ? 'red' : '',
          }}
          value={selectedEndDate}
          onChange={(e) => {
            const newEndDate = e.target.value;
            if (newEndDate >= selectedStartDate) {
              setEndDateError(false);
            }
            setSelectedEndDate(newEndDate);
          }}
        />
        {endDateError && (
          <div className="error-message">End date cannot be before the start date.</div>
        )}
      </div>
    </div>

      <div className="flex">
        <div className="fillter-category">
          {!searchClick ? (
            <div
              onClick={handleSearchClick}
              className="category-main"
              ref={ref}
            >
              <span>Category</span>
              <img src={searchGreenIcon} alt="search" />
            </div>
          ) : (
            <div className="category-input" ref={ref}>
              <input
                className="input-search"
                onChange={handleCategorySearch}
                ref={inputRef}
              />
              <img src={searchIcon} alt="" onClick={handleSearchClick} />
            </div>
          )}
          <div className="category-wrapper">
            {filtercategory.length > 0
              ? filtercategory.map((item, index) => (
                <div className="category-item" key={index}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleCategoryChange}
                      value={item.name}
                      checked={selectedCategories.includes(item.name)}
                    />
                    {item.name}
                  </label>
                </div>
              ))
              : CategoryData.map((item, index) => (
                <>
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={handleCategoryChange}
                      value={item.name}
                      checked={selectedCategories.includes(item.name)}
                    />
                    {item.name}
                  </label>
                </>
              ))}
          </div>
        </div>

        <div className="fillter-category">
          <div>
            {!searchClickBrand ? (
              <div onClick={handleSearchClickBrand} className="category-main">
                <span>Brand</span>
                <img src={searchGreenIcon} alt="" />
              </div>
            ) : (
              <div className="category-input" ref={brandRef}>
                <input className="input-search" onChange={handleBrandSearch} />
                <img src={searchIcon} alt="" onClick={handleSearchClickBrand} />
              </div>
            )}

            <div className="category-wrapper">
              {searchBrands.length > 0
                ? searchBrands.map((item, index) => (
                  <div className="category-item" key={index}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={handleBrandChange}
                        value={item.name}
                        checked={selectedBrands.includes(item.name)}
                      />
                      {item.name}
                    </label>
                  </div>
                ))
                : brandData.map((item, index) => (
                  <>
                    <label key={index}>
                      <input
                        type="checkbox"
                        onChange={handleBrandChange}
                        value={item.name}
                        checked={selectedBrands.includes(item.name)}
                      />
                      {item.name}
                    </label>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="fillter-category">
          {!searchClickTags ? (
            <div onClick={handleSearchClickTags} className="category-main">
              <span>Tags</span>
              <img src={searchGreenIcon} alt="" />
            </div>
          ) : (
            <div className="category-input" ref={tagRef}>
              <input className="input-search" onChange={handleTagSearch} />
              <img
                onClick={handleSearchClickTags}
                src={searchIcon}
                alt="search icon"
              />
            </div>
          )}
          <div className="category-wrapper">
            {searchTags.length > 0
              ? searchTags.map((item, index) => (
                <div className="category-item" key={index}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleTagChange}
                      value={item.name}
                      checked={selectedTags.includes(item.name)}
                    />
                    {item.name}
                  </label>
                </div>
              ))
              : tagData.map((item, index) => (
                <>
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={handleTagChange}
                      value={item.name}
                      checked={selectedTags.includes(item.name)}
                    />
                    {item.name}
                  </label>
                </>
              ))}
          </div>
        </div>

        <div className="fillter-category">
          {!searchClickMarket ? (
            <div onClick={handleSearchClickMarket} className="category-main">
              <span>Market</span>
              <img src={searchGreenIcon} alt="" />
            </div>
          ) : (
            <div className="category-input" ref={marketRef}>
              <input className="input-search" onChange={handleMarketSearch} />
              <img src={searchIcon} alt="" onClick={handleSearchClickMarket} />
            </div>
          )}
          <div className="category-wrapper">
            {searchMarket.length > 0
              ? searchMarket.map((item, index) => (
                <div className="category-item" key={index}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleMarketChange}
                      value={item.name}
                      checked={selectedMarkets.includes(item.name)}
                    />
                    {item.name}
                  </label>
                </div>
              ))
              : marketData.map((item, index) => (
                <>
                  <div className="category-item" key={index}>
                    <label key={index}>
                      <input
                        type="checkbox"
                        onChange={handleMarketChange}
                        value={item.name}
                        checked={selectedMarkets.includes(item.name)}
                      />
                      {item.name}
                    </label>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>

      <button className="btn-filter" onClick={handleFilterAppy}>
        Apply
      </button>
    </div>
  );
};

export default FilterModal;
