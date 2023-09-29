import React, { useEffect, useState } from 'react';
import MyLearningPopup from './learningcard-modal/mylearning-popup.jsx';
import PropTypes from 'prop-types';
import {
  commentIcon,
  noImageUploaded,
  shareIcon,
  videoIcon,
} from '../../../../components/icons/icons.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import FavouriteButton from '../../../../components/favourite/favourite-button.jsx';
import ShareModal from '../../../../components/share-modal/share-modal.jsx';
import Loader from '../../../../components/loader/loader.jsx';
import chevronRight from '../../../../assets/images/svg/chevron-right-green.svg';
import { apiURL } from '../../../../env-url.js';
import api from '@/util/api.jsx';
import {getToken} from '@/util/api.jsx'

function AllLearningCard({
  filteredData,
  searchQuery,
  filterData,
  isSorted,
  isSortedLatest,
  favoriteData,
  isFunctionAdded,
  sortData,
  isLiked,
  IsMyLearning,
  fetchlearning,
  userName,
}) {
  const [enable, setEnable] = useState(false);
  const [idValue, setIdValue] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [openReadMorePopup, setOpenReadMorePopup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [openSliderIndex, setOpenSliderIndex] = useState(null);
  const [newToken, setToken] = useState('');
  const [selectedCardURL, setSelectedCardURL] = useState('');
  const [showShareIcons, setShowShareIcons] = useState(
    Array(data.length).fill(false) 
  );

  const favorite = favoriteData.flat();
  const fileprefix = `${apiURL}/gotfl/learnings/media?name=`;
  
  const getTokenFromInstance = async () => {
    let token = await getToken();
    setToken(token);
  };
  useEffect(() => {
    getTokenFromInstance();
  }, []);

  useEffect(() => {
    handleClick;
    fetchData();
  }, [page]);

  const closeMyLearning = () => {
    setEnable(false);
    setOpenReadMorePopup(false);
  };

  const handleClick = (e) => {
    setEnable(true);
    setIdValue(e.target.value);
    setOpenSliderIndex(e.target.value);
  };

  const handleReadMore = (id) => {
    setIdValue(id);
    setOpenReadMorePopup(!openReadMorePopup);
  };

  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/learnings`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const generateCardLink = (item) => {
    if (item.mediaLinks && item.mediaLinks.length > 0) {
      const firstMediaLink = item.mediaLinks[0]; 
  
      if (firstMediaLink.fileCategory === 'img' && firstMediaLink.fileURL) {
        return `${fileprefix}${firstMediaLink.fileURL}&accessToken=${newToken}&title=${item.title}&description=${item.description}`;
      } else if (firstMediaLink.fileURL.includes('tiktok.com')) {
        return firstMediaLink.fileURL;
      } else if (firstMediaLink.fileURL.includes('youtube.com')) {
        return firstMediaLink.fileURL;
      } else {
        const videoURL = firstMediaLink.fileURL.startsWith('gotfl')
          ? `${fileprefix}${firstMediaLink.fileURL}&accessToken=${newToken}&title=${item.title}&description=${item.description}`
          : `${firstMediaLink.fileURL}&accessToken=${newToken}&title=${item.title}&description=${item.description}`;
        return videoURL;
      }
    } else {
     
      return 'No media links available for sharing';
    }
  };
  
  const handleShare = (item, index) => {
    const cardLink = generateCardLink(item);
    if (cardLink) {
      setSelectedCardURL(cardLink);
      setShowShareIcons((prevState) => {
        const newState = [...prevState];
        newState[index] = true; 
        return newState;
      });
    }
  };

  const extractTikTokVideoID = (videoURL) => {
    const regex = /\/video\/(\d+)/;
    const match = videoURL.match(regex);
    return match ? match[1] : null;
  };

  return isLoading ? ( //Checkif if is loading
    <Loader />
  ) : (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={false}
        loader={<h4>Loading...</h4>}
      >
        <div className="containerwrapper">
          {searchQuery.length > 1 ? (
            <>
              {filteredData.map((item, i) => (
                <div className="cardwrapper" key={i}>
                  <div className="card-container" tabIndex={0}>
                    <div className="card" tabIndex={0}>
                      {item.mediaLinks.map((file, index) =>
                        file.fileCategory === 'img' ? (
                          <img
                            src={
                              fileprefix +
                              (file.fileURL
                                ? `${file.fileURL}&accessToken=${newToken}`
                                : noImageUploaded)
                            }
                            alt="mediaLinks"
                            onClick={() => handleReadMore(i)}
                            value={item.id}
                            id={item.ownerId}
                            key={index}
                          />
                        ) : (
                          <>
                            {file.fileURL.includes('tiktok.com') ? (
                              <iframe
                                title="Tiktok Video"
                                src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                  file.fileURL
                                )}`}
                                allowfullScreen
                                className="learning-videos"
                                allow="encrypted-media"
                              ></iframe>
                            ) : file.fileURL.includes('youtube.com') ? (
                              <iframe
                                title="YouTube Video"
                                src={file.fileURL}
                                className="learning-videos"
                              ></iframe>
                            ) : (
                              <div className="learning-videos">
                                <video
                                  src={
                                    file.fileURL.startsWith('gotfl')
                                      ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                      : `${file.fileURL}&accessToken=${newToken}`
                                  }
                                  alt="mediaLinks"
                                  onClick={() => handleReadMore(i)}
                                  value={item.id}
                                  id={item.ownerId}
                                  key={index}
                                ></video>
                                <div className="video-icon-container">
                                  <img
                                    className="video-icon"
                                    src={videoIcon}
                                    alt="Video Icon"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                    <div className="expandable">
                      <ul className="card-icon-wrapper">
                        <li>
                          <FavouriteButton
                            item={item}
                            id={item.ownerId}
                            fetchData={fetchData}
                            fetchlearning={fetchlearning}
                          />
                        </li>
                        <li>
                          <img src={commentIcon} alt="" />
                        </li>
                        <li>
                          <img src={shareIcon} alt="share link" />
                        </li>
                      </ul>
                      <div className="card-dscp mt-10">{item.description}</div>
                      <div className="card-btn mt-10 mb-10">
                        <button
                          onClick={handleClick}
                          value={i}
                          id={item.id}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              setEnable(enable);
                            }
                          }}
                          role="button"
                        >
                          Read More <img src={chevronRight} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isFunctionAdded && favorite.length > 0 ? (
            <>
              {favorite.map((item, i) => (
                <div className="cardwrapper" key={i}>
                  <div className="card-container" tabIndex={0}>
                    <div className="card" tabIndex={0}>
                      {item.mediaLinks.map((file, index) =>
                        file.fileCategory === 'img' ? (
                          <img
                            src={
                              fileprefix + file.fileURL
                                ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                : noImageUploaded
                            }
                            alt="mediaLinks"
                            onClick={() => handleReadMore(i)}
                            value={item.id}
                            id={item.ownerId}
                            key={index}
                          />
                        ) : (
                          <>
                            {file.fileURL.includes('tiktok.com') ? (
                              <iframe
                                title="Tiktok Video"
                                src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                  file.fileURL
                                )}`}
                                allowfullscreen
                                className="learning-videos"
                                allow="encrypted-media"
                              ></iframe>
                            ) : file.fileURL.includes('youtube.com') ? (
                              <iframe
                                title="YouTube Video"
                                src={file.fileURL}
                                className="learning-videos"
                              ></iframe>
                            ) : (
                              <div className="learning-videos">
                                <video
                                  src={
                                    file.fileURL.startsWith('gotfl')
                                      ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                      : `${file.fileURL}&accessToken=${newToken}`
                                  }
                                  alt="mediaLinks"
                                  onClick={() => handleReadMore(i)}
                                  value={item.id}
                                  id={item.ownerId}
                                  key={index}
                                ></video>
                                <div className="video-icon-container">
                                  <img
                                    className="video-icon"
                                    src={videoIcon}
                                    alt="Video Icon"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                    <div className="expandable">
                      <ul className="card-icon-wrapper">
                        <li>
                          <FavouriteButton
                            item={item}
                            id={item.ownerId}
                            fetchData={fetchData}
                            fetchlearning={fetchlearning}
                          />
                        </li>
                        <li>
                          <img src={commentIcon} alt="" />
                        </li>
                        <li>
                          <img src={shareIcon} alt="" />
                        </li>
                      </ul>
                      <div className="card-dscp mt-10">{item.description}</div>
                      <div className="card-btn mt-10 mb-10">
                        <button
                          onClick={handleClick}
                          value={i}
                          id={item.id}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              setEnable(enable);
                            }
                          }}
                          role="button"
                        >
                          Read More <img src={chevronRight} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isFunctionAdded && favorite.length > 0 ? (
            <>
              {favorite.map((item, i) => (
                <div className="cardwrapper" key={i}>
                  <div className="card-container" tabIndex={0}>
                    <div className="card" tabIndex={0}>
                      {item.mediaLinks.map((file, index) =>
                        file.fileCategory === 'img' ? (
                          <img
                            src={
                              fileprefix + file.fileURL
                                ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                : noImageUploaded
                            }
                            alt="mediaLinks"
                            onClick={() => handleReadMore(i)}
                            value={item.id}
                            id={item.ownerId}
                            key={index}
                          />
                        ) : (
                          <>
                            {file.fileURL.includes('tiktok.com') ? (
                              <iframe
                                title="Tiktok Video"
                                src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                  file.fileURL
                                )}`}
                                allowfullscreen
                                className="learning-videos"
                                allow="encrypted-media"
                              ></iframe>
                            ) : file.fileURL.includes('youtube.com') ? (
                              <iframe
                                title="YouTube Video"
                                src={file.fileURL}
                                className="learning-videos"
                              ></iframe>
                            ) : (
                              <div className="learning-videos">
                                <video
                                  src={
                                    file.fileURL.startsWith('gotfl')
                                      ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                      : `${file.fileURL}&accessToken=${newToken}`
                                  }
                                  alt="mediaLinks"
                                  onClick={() => handleReadMore(i)}
                                  value={item.id}
                                  id={item.ownerId}
                                  key={index}
                                ></video>
                                <div className="video-icon-container">
                                  <img
                                    className="video-icon"
                                    src={videoIcon}
                                    alt="Video Icon"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                    <div className="expandable">
                      <ul className="card-icon-wrapper">
                        <li>
                          <FavouriteButton
                            item={item}
                            id={item.ownerId}
                            fetchData={fetchData}
                            fetchlearning={fetchlearning}
                          />
                        </li>
                        <li>
                          <img src={commentIcon} alt="" />
                        </li>
                        <li>
                          <img src={shareIcon} alt="" />
                        </li>
                      </ul>
                      <div className="card-dscp mt-10">{item.description}</div>
                      <div className="card-btn mt-10 mb-10">
                        <button
                          onClick={handleClick}
                          value={i}
                          id={item.id}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              setEnable(enable);
                            }
                          }}
                          role="button"
                        >
                          Read More <img src={chevronRight} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : filterData.length > 0 ? (
            <>
              {filterData.map((item, i) => (
                <div className="cardwrapper" key={i}>
                  <div className="card-container" tabIndex={0}>
                    <div className="card" tabIndex={0}>
                      {item.mediaLinks.map((file, index) =>
                        file.fileCategory === 'img' ? (
                          <img
                            src={
                              fileprefix + file.fileURL
                                ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                : noImageUploaded
                            }
                            alt="mediaLinks"
                            onClick={() => handleReadMore(i)}
                            value={item.id}
                            id={item.ownerId}
                            key={index}
                          />
                        ) : (
                          <>
                            {file.fileURL.includes('tiktok.com') ? (
                              <iframe
                                title="Tiktok Video"
                                src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                  file.fileURL
                                )}`}
                                allowfullscreen
                                className="learning-videos"
                                allow="encrypted-media"
                              ></iframe>
                            ) : file.fileURL.includes('youtube.com') ? (
                              <iframe
                                title="YouTube Video"
                                src={file.fileURL}
                                className="learning-videos"
                              ></iframe>
                            ) : (
                              <div className="learning-videos">
                                <video
                                  src={
                                    file.fileURL.startsWith('gotfl')
                                      ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                      : `${file.fileURL}&accessToken=${newToken}`
                                  }
                                  alt="mediaLinks"
                                  onClick={() => handleReadMore(i)}
                                  value={item.id}
                                  id={item.ownerId}
                                  key={index}
                                ></video>
                                <div className="video-icon-container">
                                  <img
                                    className="video-icon"
                                    src={videoIcon}
                                    alt="Video Icon"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                    <div className="expandable">
                      <ul className="card-icon-wrapper">
                        <li>
                          <FavouriteButton
                            item={item}
                            id={item.ownerId}
                            fetchData={fetchData}
                            fetchlearning={fetchlearning}
                          />
                        </li>
                        <li>
                          <img src={commentIcon} alt="" />
                        </li>
                        <li>
                          <img src={shareIcon} alt="share link" />
                        </li>
                      </ul>
                      <div className="card-dscp mt-10">{item.description}</div>
                      <div className="card-btn mt-10 mb-10">
                        <button
                          onClick={handleClick}
                          value={i}
                          id={item.id}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              setEnable(enable);
                            }
                          }}
                          role="button"
                        >
                          Read More <img src={chevronRight} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isSorted || isSortedLatest || isLiked || IsMyLearning ? (
            <>
              {sortData.map((item, i) => (
                <div className="cardwrapper" key={i}>
                  <div className="card-container" tabIndex={0}>
                    <div className="card" tabIndex={0}>
                      {item.mediaLinks.map((file, index) =>
                        file.fileCategory === 'img' ? (
                          <img
                            src={
                              fileprefix + file.fileURL
                                ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                : noImageUploaded
                            }
                            alt="mediaLinks"
                            onClick={() => handleReadMore(i)}
                            value={item.id}
                            id={item.ownerId}
                            key={index}
                          />
                        ) : (
                          <>
                            {file.fileURL.includes('tiktok.com') ? (
                              <iframe
                                title="Tiktok Video"
                                src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                  file.fileURL
                                )}`}
                                allowfullscreen
                                className="learning-videos"
                                allow="encrypted-media"
                              ></iframe>
                            ) : file.fileURL.includes('youtube.com') ? (
                              <iframe
                                title="YouTube Video"
                                src={file.fileURL}
                                className="learning-videos"
                              ></iframe>
                            ) : (
                              <div className="learning-videos">
                                <video
                                  src={
                                    file.fileURL.startsWith('gotfl')
                                      ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                      : `${file.fileURL}&accessToken=${newToken}`
                                  }
                                  alt="mediaLinks"
                                  onClick={() => handleReadMore(i)}
                                  value={item.id}
                                  id={item.ownerId}
                                  key={index}
                                ></video>
                                <div className="video-icon-container">
                                  <img
                                    className="video-icon"
                                    src={videoIcon}
                                    alt="Video Icon"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </div>
                    <div className="expandable">
                      <ul className="card-icon-wrapper">
                        <li>
                          <FavouriteButton
                            item={item}
                            id={item.ownerId}
                            fetchData={fetchData}
                            fetchlearning={fetchlearning}
                          />
                        </li>
                        <li>
                          <img src={commentIcon} alt="" />
                        </li>
                        <li>
                          <img src={shareIcon} alt="" />
                        </li>
                      </ul>
                      <div className="card-dscp mt-10">{item.description}</div>
                      <div className="card-btn mt-10 mb-10">
                        <button
                          onClick={handleClick}
                          value={i}
                          id={item.id}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              setEnable(enable);
                            }
                          }}
                          role="button"
                        >
                          Read More <img src={chevronRight} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {data
                .slice(0)
                .reverse()
                .map((item, i) => (
                  <div className="cardwrapper" key={i}>
                    <div className="card-container" tabIndex={0}>
                      <div className="card" tabIndex={0}>
                        {item.mediaLinks.map((file, index) =>
                          file.fileCategory === 'img' ? (
                            <img
                              src={
                                fileprefix + file.fileURL
                                  ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                  : noImageUploaded
                              }
                              alt="mediaLinks"
                              onClick={() => handleReadMore(i)}
                              value={item.id}
                              id={item.ownerId}
                              key={index}
                            />
                          ) : (
                            <>
                              {file.fileURL.includes('tiktok.com') ? (
                                <iframe
                                  title="Tiktok Video"
                                  src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                                    file.fileURL
                                  )}`}
                                  allowfullscreen
                                  className="learning-videos"
                                  allow="encrypted-media"
                                ></iframe>
                              ) : file.fileURL.includes('youtube.com') ? (
                                <iframe
                                  title="YouTube Video"
                                  src={file.fileURL}
                                  className="learning-videos"
                                ></iframe>
                              ) : (
                                <div className="learning-videos">
                                  <video
                                    src={
                                      file.fileURL.startsWith('gotfl')
                                        ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                                        : `${file.fileURL}&accessToken=${newToken}`
                                    }
                                    alt="mediaLinks"
                                    onClick={() => handleReadMore(i)}
                                    value={item.id}
                                    id={item.ownerId}
                                    key={index}
                                  ></video>
                                  <div className="video-icon-container">
                                    <img
                                      className="video-icon"
                                      src={videoIcon}
                                      alt="Video Icon"
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          )
                        )}
                      </div>
                      <div className="expandable">
                        <ul className="card-icon-wrapper">
                          <li>
                            <FavouriteButton
                              item={item}
                              id={item.ownerId}
                              fetchData={fetchData}
                              fetchlearning={fetchlearning}
                            />
                          </li>
                          <li>
                            <img src={commentIcon} alt="" />
                          </li>
                          <li>
                          {item.mediaLinks && item.mediaLinks.length > 0 ? (
                            <img
                              src={shareIcon}
                              alt="share link"
                              onClick={() => handleShare(item, i)}
                            />
                          ) : null}
                          </li>
                        </ul>
                        <div className="card-dscp mt-10">
                          {item.description}
                        </div>
                        <div className="card-btn mt-10 mb-10">
                          <button
                            onClick={handleClick}
                            value={i}
                            id={item.ownerId}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                setEnable(enable);
                              }
                            }}
                            role="button"
                          >
                            Read More{' '}
                            <img
                              className="chevron-img"
                              src={chevronRight}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{' '}
            </>
          )}
          <div>
            {(enable || openReadMorePopup) && (
              <MyLearningPopup
                data={
                  sortData.length > 0
                    ? sortData
                    : filterData.length > 0
                      ? filterData
                      : data.slice(0).reverse()
                }
                handleClose={closeMyLearning}
                id={idValue}
                fetchData={fetchData}
                fetchlearning={fetchlearning}
                openIndex={openSliderIndex}
                handleSlider={() => setOpenSliderIndex(null)}
                fileprefix={fileprefix}
                userName={userName}
                newToken={newToken}
              />
            )}
          </div>
        </div>
      </InfiniteScroll>
      {showShareIcons.map((showIcon, index) => showIcon && (
            <ShareModal
              key={index}
              cardURL={selectedCardURL}
              onClose={() => setShowShareIcons((prevState) => {
                const newState = [...prevState];
                newState[index] = false; 
                return newState;
              })}
            />
          ))}
    </>
  );
}

AllLearningCard.propTypes = {
  handleClose: PropTypes.func, // Add the missing prop type validation
  description: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.any,
};

export default AllLearningCard;
