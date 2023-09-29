import React, { useState, useEffect } from 'react';
import api from '@/util/api.jsx';
import { apiURL } from '../../../../../env-url.js';

function DrillFilterModal({
  isOpen,
  onApply,
  selectedOptions,
  setSelectedOptions,
  brandcategory,
  object,
  consumerTrendsCategory,
}) {
  const [Associated, setAssociated] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    let consumerTrend = encodeURIComponent(consumerTrendsCategory);

    api
      .get(
        `${apiURL}/trends/search/categories/${encodeURIComponent(
          brandcategory
        )}/subcategories/${encodeURIComponent(
          object
        )}/keywords?country=uk&consumerTrend=${encodeURIComponent(
          consumerTrendsCategory
        )}`
      )
      .then((response) => {
        setAssociated((prevData) => [...prevData, ...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item !== optionValue)
      );
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  return isLoading ? ( //Checkif if is loading
    <h4>Loading...</h4>
  ) : (
    <div className={`filter-modal drill ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        {Associated.map((option) => (
          <label key={option.accociatedCategories}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.accociatedCategories)}
              onChange={() => handleCheckboxChange(option.accociatedCategories)}
            />
            {option.accociatedCategories}
          </label>
        ))}
        <button
          className="btn-filter drill-btn"
          onClick={onApply}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onApply();
            }
          }}
          role="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default DrillFilterModal;
