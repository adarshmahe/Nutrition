import React, { useEffect, useState } from 'react';
import {
  download,
  edit,
  deleteIcon,
  noImageUploaded,
  videoIcon,
} from '../../../../components/icons/icons.jsx';
import PropTypes from 'prop-types';
import MyLearningModal from './mylearning-modal/mylearning-modal.jsx';
import api from '../../../../util/api.jsx';
import ConfirmationModal from '../../../../components/confirmation-modal/confirmation-modal.jsx';
import Updatelearning from './updatelearning.jsx';
import Loader from '../../../../components/loader/loader.jsx';
import chevronRight from '../../../../assets/images/svg/chevron-right-green.svg';
import { apiURL } from '../../../../env-url.js';
import { getToken } from '../../../../util/api.jsx';
import fileDownload from 'js-file-download';

const MyLearningCard = () => {
  const [showLearning, setShowLearning] = useState(false);
  const [idValue, setIdValue] = useState('');
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [newToken, setToken] = useState('');

  const fileprefix = `${apiURL}/gotfl/learnings/media?name=`;
  

  const getTokenFromInstance = async () => {
    let token = await getToken();
    setToken(token);
  };
  useEffect(() => {
    getTokenFromInstance();
  }, []);

  const closeMyLearning = () => {
    setShowLearning(!showLearning);
  };

  const handleClick = (e) => {
    setIdValue(e.target.value);
    setShowLearning(true);
  };

  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/learnings/mine`)
      .then((response) => {
        setCards((prevData) => [...prevData, ...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEditCard = (cards) => {
    setEditingCard(cards);
  };

  const handleDownload = async (card) => {
    api.get({
      url: `${apiURL}/gotfl/learnings/${card}/download`,
      responseType: 'blob', // important
    }).then((res) => {
      fileDownload(res.data,"MyLearnings");
    });
  };

  const handleUpdateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await api.delete(`${apiURL}/gotfl/learnings/${cardId}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleDeleteConfirmation = (cardId) => {
    setShowConfirmationModal(true);
    setItemToDelete(cardId);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteCard(itemToDelete);
      setShowConfirmationModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleConfirmDeleteCard = () => {
    setShowLearning(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleClick;
    handleEditCard;
  }, []);

  const extractTikTokVideoID = (videoURL) => {
    const regex = /\/video\/(\d+)/;
    const match = videoURL.match(regex);
    return match ? match[1] : null;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="containerwrapper">
      {cards.map((item, i) => (
        <div className="cardwrapper" key={i}>
          <div className="card-container" tabIndex={0}>
            <div className="card" tabIndex={0}>
              {item.mediaLinks &&
                item.mediaLinks.length > 0 &&
                item.mediaLinks.map((file, index) =>
                  file.fileCategory === 'img' ? (
                    <img
                      src={
                        fileprefix +
                        (file.fileURL
                          ? `${file.fileURL}&accessToken=${`${newToken}`}`
                          : noImageUploaded)
                      }
                      alt="mediaLinks"
                      key={index}
                    />
                  ) : (
                    <>
                      {file.fileURL.includes('tiktok.com') ? (
                        <iframe
                          title="Tiktok Video"
                          src={`https://www.tiktok.com/embed/${extractTikTokVideoID(file.fileURL)}`}
                          allowfullscreen
                          className="learning-videos"
                          allow="encrypted-media"
                          scrolling="no"
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
                )}{' '}
            </div>
            <div className="expandable">
              <ul className="card-icon-wrapper">
                <li onClick={() => handleDownload(item.id)}>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <img src={download} alt="download" />
                  </a>
                </li>
                <li onClick={() => handleEditCard(item.id)}>
                  <img src={edit} alt="edit" />
                </li>
                <li onClick={() => handleDeleteConfirmation(item.id)}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </li>
              </ul>

              <div className="card-dscp mt-10">{item.description}</div>

              <div className="card-btn mt-10 mb-10">
                <button
                  onClick={handleClick}
                  value={item.id}
                  id={item.id}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setShowLearning(showLearning);
                    }
                  }}
                  role="button"
                >
                  Read More{' '}
                  <img src={chevronRight} className="chevron-img" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <ConfirmationModal
        show={showConfirmationModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <div>
        {showLearning && (
          <MyLearningModal
            card={cards}
            setCards={setCards}
            id={idValue}
            handleClose={closeMyLearning}
            handleDeleteCard={handleDeleteCard}
            handleConfirmDeleteCard={handleConfirmDeleteCard}
            fileprefix={fileprefix}
            newToken={newToken}
            extractTikTokVideoID={extractTikTokVideoID}
          />
        )}

        {editingCard && (
          <Updatelearning
            editingCard={editingCard}
            handleOpen={() => {
              setEditingCard();
            }}
            onUpdate={() => handleUpdateCard}
          />
        )}
      </div>
    </div>
  );
};
MyLearningCard.propTypes = {
  handleClose: PropTypes.func, // Add the missing prop type validation
  description: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  card: PropTypes.any,
  handleEditCard: PropTypes.func,
  data: PropTypes.string,
};
export default MyLearningCard;
