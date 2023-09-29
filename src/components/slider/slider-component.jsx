import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  closeIcon,
  arrowLeft,
  arrowRight,
  leftLineIcon,
} from '../icons/icons.jsx';

const SliderComponent = ({
  data,
  handleSlider,
  id,
  handleCloseSlider,
  fileprefix,
  newToken,
  extractTikTokVideoID
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const filedata = data[id].mediaLinks;

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === filedata.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? filedata.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    setCurrentSlide(0); // Reset the current slide index when data changes
  }, [data, id]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider">
      <div className="back-button" tabIndex={0} onClick={handleSlider}>
        {' '}
        <img src={leftLineIcon} alt="left icon" /> Back{' '}
      </div>
      <div className="slide">
        {data[id].mediaLinks.map((file, i) =>
          file.fileCategory === 'img' ? (
            <img
              key={i}
              src={fileprefix + `${file.fileURL}&accessToken=${newToken}`}
              alt={`Image ${i}`}
              style={{ display: i === currentSlide ? 'block' : 'none' }}
            />
          ) : file.fileURL.includes('tiktok.com') ? (
            <iframe
              title="Tiktok Video"
              src={`https://www.tiktok.com/embed/${extractTikTokVideoID(
                file.fileURL
              )}`}
              allowfullscreen
              className="learning-videos"
              allow="encrypted-media"
              scrolling="no"
              key={i}
            ></iframe>
          ) : file.fileURL.includes('youtube.com') ? (
            <iframe title="YouTube Video" src={file.fileURL}></iframe>
          ) : (
            <video
              controls
              autoPlay
              key={i}
              src={
                file.fileURL.startsWith('gotfl')
                  ? `${fileprefix}${file.fileURL}&accessToken=${newToken}`
                  : `${file.fileURL}&accessToken=${newToken}`
              }
              alt={`Video ${i}`}
              style={{ display: i === currentSlide ? 'block' : 'none' }}
            ></video>
          )
        )}
      </div>
      {filedata.length > 1 &&
        data[id].mediaLinks.every((file) => file.fileCategory === 'img') && (
        <div className="slider-dots">
          {data[id].mediaLinks.map((_, index) => (
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
          onClick={handleCloseSlider} // Use handleCloseSlider here
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleCloseSlider();
            }
          }}
        />
      </div>
    </div>
  );
};

SliderComponent.propTypes = {
  handleSlider: PropTypes.func, // Add the missing prop type validation
  id: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

export default SliderComponent;
