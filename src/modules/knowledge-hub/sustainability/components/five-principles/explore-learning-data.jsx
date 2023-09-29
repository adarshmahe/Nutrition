import React, { useEffect, useState } from 'react';
import {
  closeIcon,
  leftLineIcon,
} from '../../../../../components/icons/icons.jsx';
import InstagramVideo from './insta-video.jsx';

export default function ExploreLearning({
  showExploreLearning,
  setShowExploreLearnig,
  exploreLearningData,
  setSelectedItemId,
  activeTab,
}) {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const openPopup = (mediaSrc, mediaType) => {
    setSelectedMedia(mediaSrc || '');
    setIsPopupVisible(true);
    setIsVideoPlaying(mediaType === 'video');
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedMedia(null);
    setIsPopupVisible(false);
  };

  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setLocalActiveTab(tab);
  };

  return (
    <div>
      <div
        className={`explore-learning ${showExploreLearning ? 'active' : ''}`}
      >
        <div className="inspired-nav-container">
          <div
            className="inspired-left-icon"
            onClick={() => {
              setSelectedItemId(null);
              setShowExploreLearnig(!showExploreLearning);
            }}
          >
            <img src={leftLineIcon} alt="left" />
          </div>
          <div className="inspired-nav-btn">
            <div
              className={localActiveTab === 'explore' ? 'active' : ''}
              onClick={() => handleTabClick('explore')}
            >
              <button>Explore Learnings</button>
            </div>
            <div
              className={localActiveTab === 'inspired' ? 'active' : ''}
              onClick={() => handleTabClick('inspired')}
            >
              <button>Get Inspired</button>
            </div>
          </div>
        </div>
        <div className="explore-inspire-container containerwrapper mt-30">
          {localActiveTab === 'explore' && (
            <div className="explore-learning-content ">
              {exploreLearningData.exploreLearning.map((item) => (
                <div key={item.id} className="explore-learning-item">
                  <div className="principle-data">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <div className="principle-img">
                    {item.type === 'image' && (
                      <img
                        src={item.source}
                        alt="image"
                        onClick={() => openPopup(item.source, 'image')}
                      />
                    )}
                    {item.type === 'video' && (
                      <video
                        loop
                        //autoPlay
                        muted
                        onClick={() => openPopup(item.source, 'video')}
                      >
                        <source src={item.source} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  {/* Add any additional rendering for Explore Learning items */}
                </div>
              ))}
            </div>
          )}
          {localActiveTab === 'inspired' && (
            <div className="inspired-content">
              {exploreLearningData.inspiredData.map((item) => (
                <div key={item.id} className="explore-learning-item">
                  <div className="principle-data">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <div className="principle-img">
                    {item.type === 'image' && (
                      <img
                        src={item.source}
                        alt="image"
                        onClick={() => openPopup(item.source, 'image')}
                      />
                    )}
                    {item.type === 'video' && (
                      <a href={item.source} target='_blank'>
                        {item.id === '2' ? (
                          <img
                            src={item.src}
                            alt="image"
                            //onClick={() => openPopup(item.source, 'video')}
                          />
                        ) : (
                          <img
                          src={item.src}
                          alt="image"
                        />
                        )}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isPopupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="close-popup">
            <img src={closeIcon} alt="close" />
          </div>
          <div className="popup-content">
            <img src={selectedMedia} alt="media" />
          </div>
        </div>
      )}
      {isVideoPlaying && <InstagramVideo videoUrl={selectedMedia} />}
    </div>
  );
}
