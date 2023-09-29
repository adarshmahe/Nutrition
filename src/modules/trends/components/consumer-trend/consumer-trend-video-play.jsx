import React, { useEffect, useState } from 'react';
import {
  shareIcon,
  leftLineIcon,
} from '../../../../components/icons/icons.jsx';
import FavouriteButton from '../../../../components/favourite/favourite-button.jsx';
import ShareModal from '../../../../components/share-modal/share-modal.jsx';
import axios from 'axios';
import { apiURL } from '../../../../env-url';
import api from '@/util/api.jsx'

export default function ConsumerTrendVideoPlay({
  selectedVideo,
  navigateBackToCard,
  selectedCategory,
  selectedItemName,
  consumerTrendsCategory,
}) {
  const [showMessage, setShowMessage] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [mainVideoData, setMainVideoData] = useState(selectedVideo);
  const [mainVideoSrc, setMainVideoSrc] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [selectedCardURL, setSelectedCardURL] = useState('');

  const fetchData = () => {
    let brandcategory = encodeURIComponent(selectedCategory);
    let consumerTrendCategory = encodeURIComponent(selectedItemName);
    
    api
      .get(
        `${apiURL}/trends/tiktok/categories/${brandcategory}/videos?country=UK&consumerTrend=${consumerTrendCategory}&pageNumber=1&pageSize=25`
      )
      .then((response) => {
        setAllVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShare = (cardURL) => {
    setSelectedCardURL(cardURL);
    setShowMessage(!showMessage);
  };

  const playMainVideo = (video) => {
    setMainVideoData(video);
    setMainVideoSrc(video.videoUri);
    setPlayingVideo(video);
  };

  const similarVideos = allVideos.filter((video) => video !== playingVideo);
  const handleBackClick = () => {
    navigateBackToCard();
  };

  return (
    <>
      <div className="video-detail-wrapper mt-60">
        <div className="vido-player-container">
          <div className="flex mb-30">
            <img
              src={leftLineIcon}
              alt="left arrow"
              className="back-to-video-list"
              onClick={handleBackClick}
            />
            <p className="video-title ml-10">{mainVideoData.videoTitle}</p>
          </div>
          <div className="main-iframe-container">
            <iframe
              src={`https://www.tiktok.com/embed/${mainVideoData.videoId}`}
              title="Video Player"
              className="main-iframe"
              allowfullscreen
              scrolling="no"
              allow="encrypted-media"
            ></iframe>
          </div>
          <div className="flex mt-20 w-100">
            <div className="video-tags">
              {mainVideoData &&
                mainVideoData.hashTags &&
                mainVideoData.hashTags.slice(0, 5).map((tag, index) => {
                  return (
                    <>
                      <span key={index} className="hashtag-box">
                        {' '}
                        #{tag}
                      </span>
                    </>
                  );
                })}
            </div>
            <ul className="video-icon-wrapper">
              <li>
                <FavouriteButton
                  item={playingVideo}
                  id={playingVideo?.ownerId}
                  fetchData={fetchData}
                />
              </li>
              <li>
                <img
                  src={shareIcon}
                  alt="share link"
                  onClick={() =>
                    handleShare(
                      `https://www.tiktok.com/embed/${mainVideoData.videoId}`
                    )
                  }
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="similar-wrapper ml-20">
          <p className="similar-resources">Similar Resources</p>
          <div className="similar-videos-list">
            {similarVideos.map((video, index) => (
              <div
                className="cardwrapper"
                key={index}
                onClick={() => playMainVideo(video)}
              >
                <div className="card-container" tabIndex={0}>
                  <div className="card" tabIndex={0}>
                    <iframe
                      src={`https://www.tiktok.com/embed/${video.videoId}`}
                      title="Video Player"
                      className="iframe"
                      allowfullscreen
                      width="200px"
                      height="180px"
                      scrolling="no"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                  <div className="expandable">
                    <ul className="card-icon-wrapper">
                      <li>
                        <FavouriteButton
                          item={video}
                          id={video.ownerId}
                          fetchData={fetchData}
                        />
                      </li>
                      <li>
                        <img
                          src={shareIcon}
                          alt="share link"
                          onClick={() =>
                            handleShare(
                              `https://www.tiktok.com/embed/${video.videoId}`
                            )
                          }
                        />
                      </li>
                    </ul>
                    <div className="card-dscp similar-video-title mt-10">
                      {video.videoTitle}
                    </div>
                    <div className="card-tags mt-10 mb-10">
                      {' '}
                      {video &&
                        video.hashTags &&
                        video.hashTags.slice(0, 5).map((tag, index) => {
                          return (
                            <>
                              <span key={index} className="hashtag-box">
                                {' '}
                                #{tag}
                              </span>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showMessage ? <ShareModal cardURL={selectedCardURL} /> : null}
    </>
  );
}
