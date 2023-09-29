import React, { useState } from 'react';
import {
  closeIcon,
  arrowLeft,
  arrowRight,
  leftLineIcon,
} from '../../../../components/icons/icons.jsx';
import image1 from '../../../../assets/images/Emerging-food-solution/feelgoodfood/Social Listening Analysis/image1.png';
import image2 from '../../../../assets/images/Emerging-food-solution/feelgoodfood/Social Listening Analysis/image2.png';
const IrrSocial = ({ handleSlidersocial, handleCloseSlidersocial }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    image1,
    image2,
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className=" modal-body mylearning-info-container emerging-slider">
        <div className="slider slider-container">
          <div className="back-button" tabIndex={0} onClick={handleSlidersocial}>
            {' '}
            <img src={leftLineIcon} alt="left icon" /> Back{' '}
          </div>
          <div className="slide">
            <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
          </div>

          {images.length > 1 && (
            <div className="slider-dots">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          )}
          <img
            className="prev-button"
            src={arrowLeft}
            onClick={goToPrevSlide}
            alt="left arrow"
          />
          <img
            className="next-button"
            src={arrowRight}
            onClick={goToNextSlide}
            alt="right arrow"
          />
          <div className="close-modal">
            <img
              src={closeIcon}
              alt="close-modal"
              onClick={handleCloseSlidersocial} // Use handleCloseSlider here
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleCloseSlidersocial();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrSocial;
