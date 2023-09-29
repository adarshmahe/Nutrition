import React, { useEffect, useRef, useState } from 'react';
import { chevronDownIcon } from '../icons/icons.jsx';
import api from '../../util/api.jsx';
import { apiURL } from '../../env-url.js';

const Sort = ({
  isSorted,
  setIsSorted,
  isSortedLatest,
  setIsSortedLatest,
  isLiked,
  setIsLiked,
  sortData,
  setSortData,
}) => {
  const ref = useRef(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/learnings`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

  const sortItemsOldestToLatest = () => {
    if (isSortedLatest) {
      setSortData([]);
    } else {
      const sortedData = data
        .slice()
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      setSortData(sortedData);
    }
    setIsSortedLatest((prevState) => !prevState);
  };

  const sortItemsLatestToOldest = () => {
    if (isSorted) {
      setSortData([]);
    } else {
      const sortedData = data
        .slice()
        .sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
      setSortData(sortedData);
    }
    setIsSorted((prevState) => !prevState);
  };

  const sortMostLiked = () => {
    if (isLiked) {
      setSortData(sortData);
    } else {
      const sortedData = sortData.map((item) => item.learningFavorite).flat();
      setSortData(sortedData);
    }
    setIsLiked((prevState) => !prevState);
  };

  const handleButtonClick = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <>
      <div ref={ref}>
        <div className="sort-container">
          <button
            className={'btn-sort ' + (isSortOpen ? 'active' : '')}
            onClick={handleButtonClick}
          >
            <span>Sort</span>
            {isSortOpen ? (
              <img
                className="up-arrow-sort"
                src={chevronDownIcon}
                alt="arrow"
              />
            ) : (
              <img className="arrow-sort" src={chevronDownIcon} alt="arrow" />
            )}
          </button>
        </div>
        {isSortOpen && (
          <ul className="sort-radio-items">
            <li>
              <label>
                {' '}
                <input
                  type="checkbox"
                  onChange={sortItemsLatestToOldest}
                  checked={isSorted}
                />
                Oldest
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={sortItemsOldestToLatest}
                  checked={isSortedLatest}
                />
                Latest
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" onChange={sortMostLiked} />
                Most Liked
              </label>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sort;
