import React, { useEffect, useRef, useState } from 'react';
import FilterModal from '../../components/filter/components/filter-modal.jsx';
import { filters } from '../icons/icons.jsx';

const Filter = ({ handleNavFilterData, data }) => {
  const ref = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isFilterOpen && ref.current && !ref.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isFilterOpen]);

  const closeFilter = () => {
    setIsFilterOpen(isFilterOpen);
  };

  return (
    <>
      <div ref={ref}>
        <div>
          <button
            className={'filter-icon-btn ' + (isFilterOpen ? 'active' : '')}
            onClick={() =>
              setIsFilterOpen((prevIsModalOpen) => !prevIsModalOpen)
            }
          >
            <span>Filter</span>
            <img src={filters} alt="arrow" />
          </button>
        </div>

        {isFilterOpen && (
          <div className="filter-dropdown">
            <FilterModal
              closeFilter={closeFilter}
              handleNavFilterData={handleNavFilterData}
              filter={isFilterOpen}
              setFilter={setIsFilterOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedMarkets={selectedMarkets}
              setSelectedMarkets={setSelectedMarkets}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              data={data}
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedEndDate={setSelectedEndDate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
