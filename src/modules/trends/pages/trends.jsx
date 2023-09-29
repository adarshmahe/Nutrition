import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos//GOTFLbackgroundVideo.mp4';
import TrendsDial from '../components/trends-dial/trends-dial.jsx';

function Trends() {
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <TrendsDial />
        </div>
      </div>
    </>
  );
}

export default Trends;
