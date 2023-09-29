import React, { useEffect, useState } from 'react';
import {
  shareIcon,
  favoriteIcon,
} from '../../../../components/icons/icons.jsx';
import FavouriteButton from '../../../../components/favourite/favourite-button.jsx';
import ShareModal from '../../../../components/share-modal/share-modal.jsx';
import axios from 'axios';
import { apiURL } from '../../../../env-url';
import ConsumerTrendVideoPlay from './consumer-trend-video-play.jsx';
import Loader from '../../../../components/loader/loader.jsx';
import api from '../../../../util/api.jsx'


export default function ConsumerTrendCard({
  selectedCategory,
  consumerTrendsCategory,
  selectedItemName,
  object,
}) {
  const [showMessage, setShowMessage] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [activeTag, setActiveTag] = useState('Dishesh');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [redirectToVideoPage, setRedirectToVideoPage] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [videoUrlToShare, setVideoUrlToShare] = useState('');

  let subcategory = object;
  const fetchData = () => {
    if (subcategory) {
      let brandcategory = encodeURIComponent(selectedCategory);
      let consumerTrendCategory = encodeURIComponent(selectedItemName);
      
      api
        .get(
          `${apiURL}/trends/tiktok/categories/${brandcategory}/subcategories/${subcategory}/videos?country=UK&consumerTrend=${consumerTrendCategory}`,
        )
        .then((response) => {
          setAllVideos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      let brandcategory = encodeURIComponent(selectedCategory);
      let consumerTrendCategory = encodeURIComponent(selectedItemName);
      
      api
        .get(
          `${apiURL}/trends/tiktok/categories/${brandcategory}/videos?country=UK&consumerTrend=${consumerTrendCategory}`,
        )
        .then((response) => {
          setAllVideos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const handleShare = (event, videoUrl) => {
    // Step 2: Updated handleShare function
    event.stopPropagation();
    setShowMessage(!showMessage);
    setRedirectToVideoPage(false);
    setVideoUrlToShare(videoUrl); 
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };
  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setRedirectToVideoPage(true);
    setShowMessage(false);
  };
  const navigateBackToCard = () => {
    setSelectedVideo(null);
    setRedirectToVideoPage(false);
  };

  if (redirectToVideoPage) {
    return (
      <ConsumerTrendVideoPlay
        selectedVideo={selectedVideo}
        navigateBackToCard={navigateBackToCard}
        selectedCategory={selectedCategory}
        consumerTrendsCategory={consumerTrendsCategory}
        selectedItemName={selectedItemName}
      />
    );
  }
  return isLoading ? ( //Check if is loading
    <Loader />
  ) : (
    <>
      <div className="containerwrapper-video mt-60">
        {allVideos.map((item, i) => (
          <>
            <div
              className={`cardwrapper${
                selectedVideo === item ? ' active' : ''
              }`}
              key={i}
              onClick={() => handleCardClick(item)}
            >
              <div className="card-container" tabIndex={0}>
                <div className="card iframe-container" tabIndex={0}>
                  <iframe
                    src={`https://www.tiktok.com/embed/${item.videoId}`}
                    title="Video Player"
                    className="iframe"
                    allowfullscreen
                    scrolling="no"
                    allow="encrypted-media"
                  ></iframe>
                </div>

                <div className="expandable">
                  <ul className="card-icon-wrapper">
                    <li>
                      <FavouriteButton item={item} id={item.ownerId} />
                    </li>
                    <li>
                      <img
                        src={shareIcon}
                        alt="share link"
                        onClick={(event) =>
                          handleShare(
                            event,
                            `https://www.tiktok.com/embed/${item.videoId}`
                          )
                        } 
                      />
                    </li>
                  </ul>
                  <div className="card-dscp mt-10">{item.videoTitle}</div>
                  <div className="hashtags mt-10">
                    {item.hashTags.slice(0, 5).map((tag, index) => (
                      <div key={index} className="hashtag-box">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="card-video-title mt-10 ml-20">{item.videoTitle}</p>
            </div>
          </>
        ))}
      </div>
      {showMessage ? <ShareModal cardURL={videoUrlToShare} /> : null}
    </>
  );
}
