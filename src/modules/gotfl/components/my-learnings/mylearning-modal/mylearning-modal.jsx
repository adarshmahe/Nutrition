import React, { useState } from 'react';
import {
  download,
  edit,
  deleteIcon,
  closeIcon,
  noImageUploaded,
  videoIcon,
} from '../../../../../components/icons/icons.jsx';
import PropTypes from 'prop-types';
import ConfirmationModal from '../../../../../components/confirmation-modal/confirmation-modal.jsx';
import Updatelearning from '../updatelearning.jsx';
import SliderComponent from '../../../../../components/slider/slider-component.jsx';

const MyLearningModal = ({
  handleClose,
  id,
  card,
  handleDeleteCard,
  handleConfirmDeleteCard,
  setCards,
  fileprefix,
  newToken,
  extractTikTokVideoID,
}) => {
  const [displaySlide, setDisplaySlide] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [openIndex, setOpenIndex] = useState('');

  // const handleModals = () => {
  //   setDisplaySlide(!displaySlide);
  // };

  const handleEditCard = (cards) => {
    setEditingCard(cards);
  };

  // const handleCloseSlider = () => {
  //   setDisplaySlide(!displaySlide);
  //   setOpenIndex(openIndex);
  // };

  const handleDeleteConfirmation = (cardId) => {
    setShowConfirmationModal(true);
    setItemToDelete(cardId);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    setDisplaySlide(!displaySlide);
    try {
      await handleDeleteCard(itemToDelete);
      setShowConfirmationModal(false);
      setItemToDelete(null);
      handleConfirmDeleteCard(itemToDelete);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  function getIdAndBrandName(data) {
    const itemsData = data.map((item) => {
      if (item.id == id) {
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
    const itemsData = data.map((item) => {
      if (item.id == id) {
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

  const brand = getIdAndBrandName(card);
  const category = getIdAndCategoryName(card);

  function getIdAndMarketName(data) {
    const itemsData = data.map((item) => {
      if (item.id == id) {
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

  const market = getIdAndMarketName(card);

  const handleUpdateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };
  const handleSlider = (index) => {
    setOpenIndex(index);
    setDisplaySlide(false); // Show the SliderComponent
  };

  return (
    <>
      <div className="modal">
        <div className="modal-backdrop"></div>
        <div className=" modal-body mylearning-info-container">
          <div className="mylearning-info">
            {displaySlide && (
              <>
                {card.map((item, i) =>
                  item.id == id ? (
                    <div className="mylearning-info" key={i}>
                      <div className="close-modal" onClick={handleClose}>
                        <img src={closeIcon} alt="close" />
                      </div>
                      <div className="left-info">
                        <div
                          className="info-img"
                          onClick={() => handleSlider(i)}
                        >
                          {/* <SliderComponent id={id} data={data} /> */}
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
                                            ? `${
                                              file.fileURL
                                            }&accessToken=${`${newToken}`}`
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
                                        ></iframe>
                                      ) : file.fileURL.includes(
                                        'youtube.com'
                                      ) ? (
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
                          <img src={download} alt="download" />
                          <img
                            src={edit}
                            alt="edit"
                            onClick={() => handleEditCard(item.id)}
                          />
                          <img
                            src={deleteIcon}
                            alt="deleteIcon"
                            onClick={() => handleDeleteConfirmation(item.id)}
                          />
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
                      <div className="right-info">
                        <div className="info-title ">Posted by:</div>
                        <div className="username">{item.brand}</div>
                        <div className="info-learning mt-30">
                          <div className="info-title">Post Title:</div>
                          <div className="item-dscp"> {item.title} </div>
                        </div>
                        <div className="info-learning mt-30">
                          <div className="info-title">Learning:</div>
                          <div className="item-dscp"> {item.description} </div>
                        </div>
                        <div className="learning-tags mt-30">
                          <div className="info-title mb-10">
                            Learning Tags:{' '}
                          </div>
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
                    ''
                  )
                )}
              </>
            )}
            {!displaySlide && (
              <SliderComponent
                id={openIndex}
                data={card}
                newToken={newToken}
                fileprefix={fileprefix}
                handleCloseSlider={() => setDisplaySlide(true)} // Update the display state when closing the slider
                handleSlider={(index) => handleSlider(index)} // Pass the handleSlider function
              />
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showConfirmationModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      {editingCard && (
        <Updatelearning
          editingCard={editingCard}
          handleOpen={() => {
            setEditingCard();
          }}
          onUpdate={() => handleUpdateCard}
        />
      )}
    </>
  );
};

MyLearningModal.propTypes = {
  handleClose: PropTypes.func,
  handleEditCard: PropTypes.func,
  id: PropTypes.any,
  card: PropTypes.any.isRequired,
  showLearning: PropTypes.bool,
  setShowLearning: PropTypes.bool,
};

export default MyLearningModal;
