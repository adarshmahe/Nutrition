import React from 'react';
import video2 from '../../assets/videos/HomeVideo2.mp4';
const LandingVideoSecond = () => {
  return (
    <>
      <div className="video">
        <video autoPlay muted className="bg-video" loop>
          <source src={video2} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default LandingVideoSecond;
