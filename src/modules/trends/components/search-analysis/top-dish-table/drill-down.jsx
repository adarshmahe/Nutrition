import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  arrowUp,
  arrowDown,
  Filter,
  searchIcon,
  closeIcon,
} from '../../../../../components/icons/icons.jsx';
import api from '../../../../../util/api.jsx';
import { apiURL } from '../../../../../env-url.js';
import DrillFilterModal from './drill-down-fillter-model.jsx';
import Loader from '../../../../../components/loader/loader.jsx';
import Tooltip from '../../../../../components/tooltip/tooltip.jsx';
import TopDishes from '../top-dishes.jsx';
function Drill({
  category,
  object,
  consumerTrendsCategory,
  showDrillDown,
  selectedItemName,
  setShowbarchart,
  showbarchart,
}) {
  const [transactions, setTransactions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setNewSearch] = useState('');
  const [buttons, setButtons] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortStatus, setSortstatus] = useState(true);
  const [sortStatusVol, setSortstatusVol] = useState(true);
  const [sortStatusCarg, setSortstatusCarg] = useState(true);
  const [sortStatusyoy, setSortstatusyoy] = useState(true);
  const [associateBack, setAssociatedBack] = useState('');

  const navigate = useNavigate();
  const handleApply = () => {
    if (selectedOptions.length < 1) {
      setFilteredResults(transactions);
    } else {
      const query = selectedOptions;
      let updatedList = [...transactions];
      updatedList = updatedList.filter((item) => {
        return (
          item.accociatedCategories
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) !== -1
        );
      });
      setFilteredResults(updatedList);
      setNewSearch(true);
    }
  };

  const handleButtonClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const fetchSubcategories = () => {
    api
      .get(
        `${apiURL}/trends/search/categories/${encodeURIComponent(
          category
        )}?country=uk&consumerTrend=${encodeURIComponent(
          selectedItemName
        )}&numberOfObjects=30`
      )
      .then((response) => {
        setButtons((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchData = () => {
    api
      .get(
        `${apiURL}/trends/search/categories/${encodeURIComponent(
          category
        )}/subcategories/${encodeURIComponent(
          object
        )}/keywords?country=UK&consumerTrend=${encodeURIComponent(
          selectedItemName
        )}`
      )
      .then((response) => {
        setTransactions((prevData) => [...prevData, ...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchSubcategories();
  }, []);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = transactions.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      setLoading(false);
    } else {
      setFilteredResults(transactions);
    }
  };

  const handleSearch = () => {
    setShowInput(true);
  };

  function onHeaderClick(e) {
    if (sortStatus) {
      let type = e.target.textContent.toLowerCase();
      const sorted = [...transactions].sort((a, b) =>
        a[type] > b[type] ? 1 : -1
      );
      setTransactions(sorted);
      setSortstatus(!sortStatus);
    } else {
      let type = e.target.textContent.toLowerCase();
      const sorted = [...transactions].sort((a, b) =>
        b[type] > a[type] ? 1 : -1
      );
      setTransactions(sorted);
      setSortstatus(!sortStatus);
    }
  }

  function onHeaderClickVolume() {
    if (sortStatusVol) {
      let sorted = [...transactions].sort((a, b) => a.volume - b.volume);
      setTransactions(sorted);
      setSortstatusVol(!sortStatusVol);
    } else {
      let sorted = [...transactions].sort((a, b) => b.volume - a.volume);
      setTransactions(sorted);
      setSortstatusVol(!sortStatusVol);
    }
  }
  function onHeaderClickCarg() {
    if (sortStatusCarg) {
      const sorted = [...transactions].sort((a, b) => a.cagr - b.cagr);
      setTransactions(sorted);
      setSortstatusCarg(!sortStatusCarg);
    } else {
      const sorted = [...transactions].sort((a, b) => b.cagr - a.cagr);
      setTransactions(sorted);
      setSortstatusCarg(!sortStatusCarg);
    }
  }
  function onHeaderClickYoy() {
    if (sortStatusyoy) {
      const sorted = [...transactions].sort((a, b) => a.yoy - b.yoy);
      setTransactions(sorted);
      setSortstatusyoy(!sortStatusyoy);
    } else {
      const sorted = [...transactions].sort((a, b) => b.yoy - a.yoy);
      setTransactions(sorted);
      setSortstatusyoy(!sortStatusyoy);
    }
  }
  
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
    if (e.target.value) {
      api
        .get(
          `${apiURL}/trends/search/categories/${encodeURIComponent(
            category
          )}/subcategories/${encodeURIComponent(
            e.target.value
          )}/keywords?country=UK&consumerTrend=${encodeURIComponent(
            selectedItemName
          )}`
        )
        .then((response) => {
          setFilteredResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      setFilteredResults(transactions);
    }
  };

  const onAssociateBack = (e) => {
    setAssociatedBack(e);
    setShowbarchart(true);
  };

  return isLoading ? ( //Check if is loading
    <Loader />
  ) : (
    <>
      {showDrillDown && showbarchart == false && (
        <>
          <div className="drill-button-container">
            {buttons.map(({ objectName }) => (
              <button
                className={`tags ${search === objectName ? 'active-dish' : ''}`}
                value={objectName}
                key={objectName}
                onClick={(e) => handleSearchChange(e)}
              >
                {objectName}
              </button>
            ))}
          </div>

          <div className="drill-container">
            <div className="horizontal-nav">
              <div className="drill-title"></div>
              <div className="drill-sort">
                <div className="search-section">
                  {showInput && (
                    <input
                      className="search-input"
                      type="text"
                      value={searchInput}
                      onChange={(e) => searchItems(e.target.value)}
                      placeholder="Search..."
                    />
                  )}
                  {searchInput === '' ? (
                    <img src={searchIcon} alt="search" onClick={handleSearch} />
                  ) : (
                    <img
                      src={closeIcon}
                      alt="search"
                      onClick={() => {
                        setSearchInput('');
                        setShowInput(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="fixTableHead">
              <table>
                <tr>
                  <th onClick={onHeaderClick} width="25%">
                    Column Header
                    {sortStatus ? (
                      <img src={arrowUp} alt="up-arrow" />
                    ) : (
                      <img src={arrowDown} alt="up-arrow" />
                    )}
                  </th>
                  <th onClick={onHeaderClickVolume} width="15%">
                    Volume (over 4 years){' '}
                    <Tooltip text="2019-2023">
                      <button>i</button>
                    </Tooltip>
                    {sortStatusVol ? (
                      <img src={arrowUp} alt="up-arrow" />
                    ) : (
                      <img src={arrowDown} alt="up-arrow" />
                    )}
                  </th>
                  <th onClick={onHeaderClickCarg} width="8.3%">
                    CAGR
                    {sortStatusCarg ? (
                      <img src={arrowUp} alt="up-arrow" />
                    ) : (
                      <img src={arrowDown} alt="up-arrow" />
                    )}
                  </th>
                  <th onClick={onHeaderClickYoy} width="8.3%">
                    YOY
                    {sortStatusyoy ? (
                      <img src={arrowUp} alt="up-arrow" />
                    ) : (
                      <img src={arrowDown} alt="up-arrow" />
                    )}
                  </th>
                  <th width="25%">
                    Associated categories
                    <img
                      src={Filter}
                      alt="up-arrow"
                      onClick={handleButtonClick}
                    />
                    {isFilterOpen && (
                      <DrillFilterModal
                        onClose={handleButtonClick}
                        isOpen={isFilterOpen}
                        onApply={handleApply}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        brandcategory={category}
                        object={object}
                        consumerTrendsCategory={consumerTrendsCategory}
                      />
                    )}
                  </th>
                  <th width="20%">Sub categories</th>
                </tr>
                {searchInput.length > 1 || search
                  ? filteredResults.map((item, key) => {
                      return isLoading ? ( //Check if is loading
                        <Loader />
                      ) : (
                        <tr key={key}>
                          <td>{item.keywordName}</td>
                          <td>{item.volume}</td>
                          <td>{item && item.cagr ? item.cagr + ' %' : '-'}</td>
                          <td>{item && item.yoy ? item.yoy + ' %' : '-'}</td>
                          <td>
                            {item.accociatedCategories.map(
                              (associate, index) => (
                                <span
                                  onClick={() => onAssociateBack(associate)}
                                  className="category-box"
                                  key={index}
                                >
                                  #{associate}
                                </span>
                              )
                            )}
                          </td>
                          <td>
                            {item.subCategories.map((e, index) => (
                              <span className="sub-box" key={index}>
                                {e}
                              </span>
                            ))}
                          </td>
                        </tr>
                      );
                    })
                  : transactions.map((item, key) => {
                      return isLoading ? ( //Check if is loading
                        <Loader />
                      ) : (
                        <tr key={key}>
                          <td>{item.keywordName}</td>
                          <td>{item.volume}</td>
                          <td>{item && item.cagr ? item.cagr + ' %' : '-'}</td>
                          <td>{item && item.yoy ? item.yoy + ' %' : '-'}</td>
                          <td>
                            {item.accociatedCategories.map(
                              (associate, index) => (
                                <span
                                  onClick={() => onAssociateBack(associate)}
                                  className="category-box"
                                  key={index}
                                >
                                  #{associate}
                                </span>
                              )
                            )}
                          </td>
                          <td>
                            {item.subCategories.map((e, index) => (
                              <span className="sub-box" key={index}>
                                {e}
                              </span>
                            ))}
                          </td>
                        </tr>
                      );
                    })}
              </table>
            </div>
          </div>
        </>
      )}
      {showbarchart && (
        <TopDishes
          selectedItemName={selectedItemName}
          consumerTrendsCategory={consumerTrendsCategory}
          category={associateBack}
        />
      )}
    </>
  );
}

export default Drill;
