import React from 'react';

const InstagramVideo = ({ videoUrl }) => {
  return (
    <div className="instagram-video">
    <video controls width="260px" height="260px">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
};

export default InstagramVideo;
