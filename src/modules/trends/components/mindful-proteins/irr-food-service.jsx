import React, { useState } from 'react';
import {
  closeIcon,
  arrowLeft,
  arrowRight,
  leftLineIcon,
} from '../../../../components/icons/icons.jsx';
import image1 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image1.png';
import image2 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image2.png';
import image3 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image3.png';
import image4 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image4.png';
import image5 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image5.png';
import image6 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image6.png';
import image7 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image7.png';
import image8 from '../../../../assets/images/Emerging-food-solution/mindfulprotein/Food Service Trend Scape/image8.png';
const FoodServiceComponent = ({ handleSliderservice, handleCloseSliderservice }) => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

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
          <div className="back-button" tabIndex={0} onClick={handleSliderservice}>
            {' '}
            <img src={leftLineIcon} alt="left icon" /> Back{' '}
          </div>
          <div className="slide">
            <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
          </div>
          {images.length > 1 &&
            <div className="slider-dots">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          }
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
              onClick={handleCloseSliderservice} // Use handleCloseSlider here
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleCloseSliderservice();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodServiceComponent;
