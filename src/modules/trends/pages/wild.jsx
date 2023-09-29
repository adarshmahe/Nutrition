import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import { userProfileIcon } from '../../../components/icons/icons.jsx';
import WildPure from '../components/wild-pure/wild-pure.jsx';


function Wild() {
  return (
    <>
      <LeftSidebarCollapsible />
      <div className="sidebar-right-layout">
        <video autoPlay muted className="learning-bg-video" loop>
          <source src={learningBgVideo} type="video/mp4" />
        </video>
        <div className="my-learning-container">
          <div className="horizontal-nav-container">
            <div className="horizontal-user-profile">
              <img src={userProfileIcon} alt="userProfile" />
            </div>
          </div>
         <WildPure/> 
        </div>
      </div>
    </>
  );
}

export default Wild;
