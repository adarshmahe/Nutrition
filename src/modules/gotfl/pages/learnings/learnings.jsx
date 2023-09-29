import React from 'react';
import LeftSidebarCollapsible from '../../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../../assets/videos/GOTFLbackgroundVideo.mp4';
import HorizantalNav from '../../components/horizontal-nav/horizontal-nav.jsx';
//import TodaysEvent from '../../components/todays-event/todays-event.jsx';

function Learnings({ userName }) {
  return (
    <>
      <LeftSidebarCollapsible />
      {/* <TodaysEvent /> */}
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <HorizantalNav userName={userName} />
        </div>
      </div>
    </>
  );
}
export default Learnings;
