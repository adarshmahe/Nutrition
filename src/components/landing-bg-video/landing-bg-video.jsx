import React from 'react';
import video from '../../assets/videos/background-video.mp4';
const LandingVideo = () => {
  return (
    <>
      <div className="video-container">
        <video autoPlay muted className="bg-video" loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default LandingVideo;
