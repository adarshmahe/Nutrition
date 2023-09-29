import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import MarketTrendHorizontalNav from '../components/market-trend-horizontal-nav/market-trend-horizontal-nav.jsx';
import ConsumerTrendVideoPlay from '../components/consumer-trend/consumer-trend-video-play.jsx';
function ConsumerTrendVideo() {
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <MarketTrendHorizontalNav />
          <ConsumerTrendVideoPlay />
        </div>
      </div>
    </>
  );
}

export default ConsumerTrendVideo;
