import React, { useEffect, useRef, useState } from 'react';
import { closeIcon, searchIcon } from '../icons/icons.jsx';
import api from '../../util/api.jsx';
import buttonSound from '../../assets/sound/woosh-2-6471.mp3';
import { apiURL } from '../../env-url.js';

const Search = ({ handleFilterData, searchQuery, setSearchQuery }) => {
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState([]);
  const ref = useRef();
  const [audio] = useState(new Audio(buttonSound));

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

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query.trim() !== '') {
      const filteredResults = data.filter(
        (item) =>
          item.description.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query)
      );
      handleFilterData(filteredResults);
    } else {
      handleFilterData(data);
    }
    setShowInput(true);
  };

  const searchOnchange = (e) => {
    const newQuery = e.target.value.toLowerCase();

    const filteredResults = data.filter(
      (item) =>
        item.description.toLowerCase().includes(newQuery) ||
        item.title.toLowerCase().includes(newQuery) ||
        item.tags.toLowerCase().includes(newQuery)
    );

    if (newQuery.trim() !== '') {
      handleFilterData(filteredResults);
      setSearchQuery(newQuery);
    } else {
      handleFilterData(data);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetchData();
    const checkIfClickedOutside = (e) => {
      if (showInput && ref.current && !ref.current.contains(e.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  return (
    <>
      <div className="search-main-container">
        <div className="search-section" ref={ref}>
          {showInput && (
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={searchOnchange}
              placeholder="Search..."
              tabIndex={0}
            />
          )}

          {searchQuery == '' ? (
            <img
              src={searchIcon}
              alt="search"
              onClick={() => {
                handleSearch();
                audio.play();
              }}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                  audio.play();
                }
              }}
            />
          ) : (
            <img
              src={closeIcon}
              alt="search"
              onClick={() => {
                setSearchQuery('');
                audio.play();
              }}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setSearchQuery('');
                  audio.play();
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
