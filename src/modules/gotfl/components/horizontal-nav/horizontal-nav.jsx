import React, { useEffect, useState } from 'react';
import ShareLearning from '../share-my-learning/share-my-learning.jsx';
import LearningCard from '../learning-card/learning-card.jsx';
import MyLearningCard from '../my-learnings/mylearning-card.jsx';
import SearchNavbar from '../search-navbar/search-navbar.jsx';
import EventsFolio from '../../pages/events-folio/events-folio.jsx';
import api from '../../../../util/api.jsx';
import buttonSound from '../../../../assets/sound/woosh-2-6471.mp3';
import { apiURL } from '../../../../env-url.js';
import Profile from '../../../../components/profile/profile.jsx';

function HorizantalNav({ userName }) {
  const [createSharing, setCreateSharing] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isSortedLatest, setIsSortedLatest] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMyLearning, setIsMyLearning] = useState(false);
  const [favoriteData, setFavoriteData] = useState([]);
  const [isFunctionAdded, setIsFunctionAdded] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [data, setData] = useState([]);
  const [audio] = useState(new Audio(buttonSound));

  const handleOpen = () => {
    setCreateSharing(!createSharing);
  };

  const handleFilterData = (data) => {
    setFilteredData(data); // Receive the filtered data from the child
  };

  const handleNavFilterData = (data) => {
    setFilterData(data);
  };

  const handleFavoriteData = (data) => {
    setFavoriteData(data);
  };

  const fetchlearning = () => {
    api
      .get(`${apiURL}/gotfl/learnings`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchlearning();
  }, [isFunctionAdded]);

  return (
    <div className="horizontal-nav-container">
      <div className="horizontal-user-profile">
        <Profile/>
      </div>
      <div className="horizontal-nav mt-20">
        <ul className="horizontal-items-container" role="list">
          <li
            className={activeTab === 'tab1' ? 'active ' : ''}
            onClick={() => {
              setActiveTab('tab1');
              audio.play();
            }}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setActiveTab('tab1');
                audio.play();
              }
            }}
            role="menuitem"
          >
            All Learnings
          </li>
          <li
            className={activeTab === 'tab2' ? 'active ' : ''}
            onClick={() => {
              setActiveTab('tab2');
              audio.play();
            }}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setActiveTab('tab2');
                audio.play();
              }
            }}
            role="menuitem"
          >
            My Learning
          </li>
          <li
            className={activeTab === 'tab3' ? 'active  ' : ''}
            onClick={() => {
              setActiveTab('tab3');
              audio.play();
            }}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setActiveTab('tab3');
                audio.play();
              }
            }}
            role="menuitem"
          >
            Event Calender
          </li>
        </ul>
        <div>
          <button
            className="share-learning-button btn px-16"
            onClick={() => {
              handleOpen();
              audio.play();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setActiveTab('tab3');
                audio.play();
              }
            }}
            role="button"
          >
            Share my learning
          </button>
        </div>
      </div>
      <div>
        <SearchNavbar
          handleFilterData={handleFilterData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleNavFilterData={handleNavFilterData}
          sortData={sortData}
          setSortData={setSortData}
          isSorted={isSorted}
          setIsSorted={setIsSorted}
          isSortedLatest={isSortedLatest}
          setIsSortedLatest={setIsSortedLatest}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          isMyLearning={isMyLearning}
          setIsMyLearning={setIsMyLearning}
          handleFavoriteData={handleFavoriteData}
          isFunctionAdded={isFunctionAdded}
          setIsFunctionAdded={setIsFunctionAdded}
          data={data}
        />
      </div>
      {activeTab === 'tab1' && (
        <LearningCard
          filteredData={filteredData}
          searchQuery={searchQuery}
          filterData={filterData}
          sortData={sortData}
          isSorted={isSorted}
          isSortedLatest={isSortedLatest}
          favoriteData={favoriteData}
          isFunctionAdded={isFunctionAdded}
          isLiked={isLiked}
          isMyLearning={isMyLearning}
          data={data}
          setData={setData}
          fetchlearning={fetchlearning}
          userName={userName}
        />
      )}
      {activeTab === 'tab2' && <MyLearningCard />}
      {activeTab === 'tab3' && <EventsFolio />}
      {createSharing && <ShareLearning handleOpen={handleOpen} />}
    </div>
  );
}

export default HorizantalNav;
