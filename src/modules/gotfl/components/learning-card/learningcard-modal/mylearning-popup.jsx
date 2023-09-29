import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SliderComponent from '../../../../../components/slider/slider-component.jsx';
import {
  closeIcon,
  commentIcon,
  favoriteIcon,
  leftLineIcon,
  modalLeftArrow,
  modalRightArrow,
  noImageUploaded,
  // noImageUploaded,
  sendIcon,
  shareIcon,
  videoIcon,
} from '../../../../../components/icons/icons.jsx';
import FavouriteButton from '../../../../../components/favourite/favourite-button.jsx';
import ShareModal from '../../../../../components/share-modal/share-modal.jsx';
import api from '../../../../../util/api.jsx';
import { apiURL } from '../../../../../env-url.js';

const MyLearningPopup = ({
  data,
  handleClose,
  id,
  fetchData,
  fileprefix,
  newToken,
  fetchlearning,
}) => {
  const [showSlider, setShowSlider] = useState(true);
  const [showCommentBox, setShowCommentBox] = useState(true);
  const [comment, setComment] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [openIndex, setOpenIndex] = useState(parseInt(id));
  const [sharedMediaLinkURL, setSharedMediaLinkURL] = useState('');
  const [commentsData, setCommentsData] = useState({});
  const [showShareIcons, setShowShareIcons] = useState(
    Array(data.length).fill(false)
  );

  const handleNextSlide = () => {
    setOpenIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevSlide = () => {
    setOpenIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const ownerID = data[0].ownerId;
  const handleModal = () => {
    setShowSlider(!showSlider);
  };

  const handleComments = () => {
    setShowCommentBox(!showCommentBox);
    if (!showCommentBox) {
      getAllComments(data[openIndex].id);
    }
  };

  const handleBack = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  function getIdAndBrandName(data) {
    const itemsData = data.map((item, index) => {
      if (index === openIndex) {
        const brandLabel = item.learningLabel.find(
          (label) => label.classificationId === 2
        );
        if (brandLabel) {
          return brandLabel.name;
        }
        return 'Brand name not found';
      }
    });
    return itemsData;
  }

  function getIdAndCategoryName(data) {
    const itemsData = data.map((item, index) => {
      if (index === openIndex) {
        const brandLabel = item.learningLabel.find(
          (label) => label.classificationId === 1
        );
        if (brandLabel) {
          return brandLabel.name;
        }
        return 'Brand name not found';
      }
    });
    return itemsData;
  }

  const brand = getIdAndBrandName(data);
  const category = getIdAndCategoryName(data);

  function getIdAndMarketName(data) {
    const itemsData = data.map((item, index) => {
      if (index === openIndex) {
        const marketLabel = item.learningLabel.find(
          (label) => label.classificationId === 3
        );
        if (marketLabel) {
          return marketLabel.name;
        }
        return 'Brand name not found';
      }
    });
    return itemsData;
  }

  const market = getIdAndMarketName(data);

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      let obj = {
        learningId: data[openIndex].id,
        userId: ownerID,
        comment: comment,
        isActive: true,
      };
      api
        .post(`${apiURL}/gotfl/learnings/${data[openIndex].id}/comments`, obj)
        .then((res) => {
          if (res.status === 200) {
            getAllComments(data[openIndex].id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setComment('');
    }
  };

  function getAllComments(learningId) {
    api
      .get(`${apiURL}/gotfl/learnings/${learningId}/comments`)
      .then((res) => {
        if (res.status === 200) {
          setCommentsData((prevCommentsData) => ({
            ...prevCommentsData,
            [learningId]: res.data,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllComments(data[openIndex].id);
  }, [openIndex]);

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
      setSharedMediaLinkURL(cardLink);
      setShowShareIcons((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleSlider = () => {
    setShowSlider(!showSlider);
    setOpenIndex(parseInt(id));
  };

  const handleCloseSlider = () => {
    setShowSlider(true);
    setOpenIndex(openIndex); // Reset openIndex to the original value
  };

  const extractTikTokVideoID = (videoURL) => {
    const regex = /\/video\/(\d+)/;
    const match = videoURL.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="slider-modal">
        <div className="slide-modal">
          <div className=" modal-body mylearning-info-container modal-size">
            {showSlider && (
              <>
                {data.map((item, i) =>
                  i === openIndex ? (
                    <div className="mylearning-info" key={i}>
                      <div className="close-modal" onClick={handleClose}>
                        <img src={closeIcon} alt="close" />
                      </div>
                      <div className="left-info">
                        <div className="info-img" onClick={handleModal}>
                          <div className="slider">
                            <div className="slide">
                              {item.mediaLinks &&
                                item.mediaLinks.length > 0 &&
                                item.mediaLinks.map((file, index) =>
                                  file.fileCategory === 'img' ? (
                                    index === 0 ? (
                                      <img
                                        src={
                                          fileprefix +
                                          (file.fileURL
                                            ? `${file.fileURL}&accessToken=${newToken}`
                                            : noImageUploaded)
                                        }
                                        alt="mediaLinks"
                                        key={index}
                                      />
                                    ) : null
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
                                          scrolling="no"
                                          value={item.id}
                                          id={item.ownerId}
                                          key={index}
                                        ></iframe>
                                      ) : file.fileURL.includes(
                                        'youtube.com'
                                      ) ? (
                                          <iframe
                                            title="YouTube Video"
                                            src={file.fileURL}
                                            className="learning-videos"
                                            value={item.id}
                                            id={item.ownerId}
                                            key={index}
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
                          </div>
                        </div>
                        <div className="action-items">
                          <div className="favourites">
                            <FavouriteButton
                              item={item}
                              id={item.ownerId}
                              fetchData={fetchData}
                              fetchlearning={fetchlearning}
                            />
                          </div>
                          <img
                            src={commentIcon}
                            alt=""
                            className="ml-12"
                            onClick={handleComments}
                          />
                          {item.mediaLinks && item.mediaLinks.length > 0 ? (
                            <img
                              src={shareIcon}
                              alt="share link"
                              onClick={() => handleShare(item, i)}
                            />
                          ) : null}
                        </div>
                        <ul className="learning-card-category">
                          <li>
                            <span className="info-title"> Category:</span>{' '}
                            <span className="item-text">{category}</span>
                          </li>
                          <li>
                            <span className="info-title">Brand: </span>
                            <span className="item-text">{brand}</span>
                          </li>
                          <li>
                            <span className="info-title">Market: </span>
                            <span className="item-text">{market}</span>
                          </li>
                        </ul>
                      </div>
                      {showCommentBox ? (
                        <div className="right-info">
                          <div className="info-title ">Posted by:</div>
                          <div className="username">{item.ownerId}</div>
                          <div className="info-learning mt-30">
                            <div className="info-title">Post Title:</div>
                            <div className="item-dscp"> {item.title} </div>
                          </div>
                          <div className="info-learning mt-30">
                            <div className="info-title">Learning:</div>
                            <div className="item-dscp">
                              {' '}
                              {item.description}{' '}
                            </div>
                          </div>
                          <div className="learning-tags mt-30">
                            <div className="info-title mb-10">
                              Learning Tags:{' '}
                            </div>
                            <div className="mb-10">
                              {item.tags.split(',').map((tag, index) => (
                                <span className="tags" key={index}>
                                  {' '}
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="right-info">
                          <div className="comment-top-section mb-10">
                            <div className="add-comment">
                              <a href="#" onClick={handleBack}>
                                <img src={leftLineIcon} alt="left icon" />
                              </a>
                              <p className="comment-text"> Add Comment </p>{' '}
                            </div>
                          </div>
                          <div className="comment-box">
                            <input
                              type="text"
                              placeholder="Share your view"
                              onChange={handleChange}
                              value={comment}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  handleSubmit();
                                }
                              }}
                            />
                            <div className="send-icon">
                              <img
                                src={sendIcon}
                                alt=""
                                onClick={() => handleSubmit(item.id)}
                              />
                            </div>
                          </div>
                          <div className="comments">
                            <span>
                              {commentsData[data[openIndex].id]?.length || 0}{' '}
                              &nbsp;comments
                            </span>
                            {commentsData[data[openIndex].id]?.length > 0 &&
                              commentsData[data[openIndex].id].map(
                                (item, index) => (
                                  <div className="comment-section" key={index}>
                                    <div className="circle-user-icon">
                                      <span> {''} </span>
                                    </div>
                                    <div className="comment">
                                      <div className="user-name">
                                        {item.commentBy}
                                      </div>
                                      <div className="comment-list">
                                        <div className="list">
                                          {item.comment}
                                        </div>
                                        {/* <div className="like-comment">
                                        {''}
                                        <img
                                          src={favoriteIcon}
                                          alt="favorite"
                                        />
                                      </div> */}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ''
                  )
                )}
              </>
            )}
            <div className="next-modal-button">
              <img
                src={modalRightArrow}
                onClick={handlePrevSlide}
                alt="left arrow"
              />
            </div>
            <div className="prev-modal-button">
              <img
                src={modalLeftArrow}
                onClick={handleNextSlide}
                alt="left arrow"
              />
            </div>
            <div className="total-modal-slides">
              {openIndex + 1}/{data.length}
            </div>
            {!showSlider && (
              <SliderComponent
                extractTikTokVideoID={extractTikTokVideoID}
                id={openIndex}
                data={data}
                fileprefix={fileprefix}
                handleSlider={handleSlider}
                handleCloseSlider={handleCloseSlider}
                newToken={newToken}
              />
            )}
          </div>
          {showShareIcons.map(
            (showIcon, index) =>
              showIcon && (
                <ShareModal
                  key={index}
                  cardURL={sharedMediaLinkURL}
                  onClose={() =>
                    setShowShareIcons((prevState) => {
                      const newState = [...prevState];
                      newState[index] = false;
                      return newState;
                    })
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

MyLearningPopup.propTypes = {
  handleClose: PropTypes.func,
  handleSlider: PropTypes.func, // Add the missing prop type validation
  enable: PropTypes.bool,
  setEnable: PropTypes.bool,
  id: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

export default MyLearningPopup;
