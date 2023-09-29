import React from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import learningBgVideo from '../../../assets/videos/GOTFLbackgroundVideo.mp4';
import { userProfileIcon } from '../../../components/icons/icons.jsx';
import PopulationSegregationInfo from '../components/population-segregation/population-segregation.jsx';
import { Link } from 'react-router-dom';
function PopulationSegregation() {
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
            <div className="trends-detail-title">
              <div className="trends-horizontal-items-container">
                <h2 className="diaspora"><Link to='/trends-dial'>Diaspora</Link>/</h2>{' '}
                <h2 className="population-segregation-heading">
                  Population segregation in the UK
                </h2>
              </div>
            </div>
          </div>
          <PopulationSegregationInfo />
        </div>
      </div>
    </>
  );
}

export default PopulationSegregation;
