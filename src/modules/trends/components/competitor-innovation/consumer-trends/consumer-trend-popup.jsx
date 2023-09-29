import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  closeIcon,
  modalLeftArrow,
  modalRightArrow,
  noImageUploaded,
  // noImageUploaded,
  shareIcon,
} from '../../../../../components/icons/icons.jsx';
import FavouriteButton from '../../../../../components/favourite/favourite-button.jsx';
import ShareModal from '../../../../../components/share-modal/share-modal.jsx';

const ConsumerInnovationPopup = ({ data, handleClose, id, fetchData }) => {
  const [showSlider, setShowSlider] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [openIndex, setOpenIndex] = useState(parseInt(id)); // Track the open index

  const handleNextSlide = () => {
    setOpenIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevSlide = () => {
    setOpenIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleshare = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="slider-modal">
        <div className="slide-modal">
          <div className=" modal-body mylearning-info-container">
            <>
              {data.map((item, i) =>
                i === openIndex ? (
                  <div className="mylearning-info" key={i}>
                    <div className="close-modal" onClick={handleClose}>
                      <img src={closeIcon} alt="close" />
                    </div>
                    <div className="left-info">
                      <div className="info-img">
                        <div className="slider">
                          <div className="slide">
                            <img
                              src={
                                item.imageLink
                                  ? item.imageLink
                                  : noImageUploaded
                              }
                              alt="mediaLinks"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="action-items">
                        <div className="favourites">
                          <FavouriteButton
                            item={item}
                            id={item.id}
                            fetchData={fetchData}
                          />
                        </div>
                        <img
                          src={shareIcon}
                          alt="share link"
                          className="ml-12"
                          onClick={handleshare}
                        />
                      </div>
                      <ul className="learning-card-category">
                        <li>
                          <span className="info-title"> Category:</span>{' '}
                          <span className="item-text">{item.category}</span>
                        </li>
                        <li>
                          <span className="info-title">Brand: </span>
                          <span className="item-text">{item.brand}</span>
                        </li>
                        <li>
                          <span className="info-title">Country: </span>
                          <span className="item-text">{item.country}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="right-info">
                      <div className="info-title ">SubCategory:</div>
                      <div className="username ">{item.subCategory}</div>
                      <div className="info-learning mt-30">
                        <div className="info-title">Product:</div>
                        <div className="item-dscp"> {item.product} </div>
                      </div>
                      <div className="info-learning mt-30">
                        <div className="info-title">Product:</div>
                        <div className="item-dscp">
                          {' '}
                          {item.productDescription}{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )
              )}
            </>
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
          </div>
          {showMessage ? <ShareModal /> : null}
        </div>
      </div>
    </div>
  );
};

ConsumerInnovationPopup.propTypes = {
  handleClose: PropTypes.func,
  enable: PropTypes.bool,
  setEnable: PropTypes.bool,
  id: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

export default ConsumerInnovationPopup;
