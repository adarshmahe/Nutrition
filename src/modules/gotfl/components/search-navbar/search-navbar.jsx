import React, { useState } from 'react';
import Filter from '../../../../components/filter/filter.jsx';
import Search from '../../../../components/search/search.jsx';
import Sort from '../../../../components/sort/sort.jsx';
import FavouriteIcon from '../../../../components/favourite-icon/favourite-icon.jsx';
import buttonSound from '../../../../assets/sound/woosh-2-6471.mp3';

const SearchNavbar = ({
  handleFilterData,
  setSortData,
  sortData,
  searchQuery,
  setSearchQuery,
  handleNavFilterData,
  isSorted,
  setIsSorted,
  isSortedLatest,
  setIsSortedLatest,
  setIsMyLearning,
  isLiked,
  isMyLearning,
  setIsLiked,
  handleFavoriteData,
  isFunctionAdded,
  setIsFunctionAdded,
  data
}) => {
  const [active, setActive] = useState('one');
  const [audio] = useState(new Audio(buttonSound));

  return (
    <>
      <div className="search-nav ">
        <div className="favourite-filter-container">
          <div
            id="search-nav-favourite-container"
            className={active === 'one' ? 'active ' : ''}
            onClick={() => {setActive('one'); audio.play();}}
          >
            {active && (
              <FavouriteIcon
                handleFavoriteData={handleFavoriteData}
                isFunctionAdded={isFunctionAdded}
                setIsFunctionAdded={setIsFunctionAdded}
                data={data}
              />
            )}
          </div>
          <div
            id="search-nav-filter-container"
            onClick={() => {setActive('two'); audio.play();}}
          >
            {active && <Filter handleNavFilterData={handleNavFilterData} data={data}/>}
          </div>{' '}
        </div>
        <div className="search-sort-container">
          <div className="search-nav-search-container">
            <Search
              handleFilterData={handleFilterData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div
            id="search-nav-sort-container"
            onClick={() => {setActive('three'); audio.play();}}
          >
            {active && (
              <Sort
                setSortData={setSortData}
                sortData={sortData}
                isSorted={isSorted}
                setIsSorted={setIsSorted}
                isSortedLatest={isSortedLatest}
                setIsSortedLatest={setIsSortedLatest}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                isMyLearning={isMyLearning}
                setIsMyLearning={setIsMyLearning}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNavbar;
