import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Irresistible from '../../../../assets/images/Emerging-food-solution/joyfulsharing/joyfulsharing.jpg';
import FoodSliderComponent from './food-slider.jsx';
import FoodServiceComponent from './irr-food-service.jsx';
import IrrSocial from './irr-social.jsx';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
function JoyfulSharing() {
  const [showSlider, setShowSlider] = useState(true);
  const [showSliderservice, setShowSliderservice] = useState(true);
  const [showSlidersocial, setShowSlidersocial] = useState(true);
  const handleSlider = () => {
    setShowSlider(!showSlider);
  };
  const handleSliderservice = () => {
    setShowSliderservice(!showSliderservice);
  };
  const handleSlidersocial = () => {
    setShowSlidersocial(!showSlidersocial);
  };
  const handleModal = () => {
    setShowSlider(!showSlider);
  };
  const handleModalService = () => {
    setShowSliderservice(!showSliderservice);
  };
  const handleModalSocial = () => {
    setShowSlidersocial(!showSlidersocial);
  };
  const handleCloseSlider = () => {
    setShowSlider(true);
  };
  const handleCloseSliderservice = () => {
    setShowSliderservice(!showSliderservice);
  };
  const handleCloseSlidersocial = () => {
    setShowSlidersocial(!showSlidersocial);
  };

  const navigate = useNavigate();
  const handleNavigationMain = () => {
    navigate('/trends-dial');
  };
  return (
    <>
      <div className="trends-detail-title">
        <h2><img style={{cursor: 'pointer'}} src={leftLineIcon} onClick={handleNavigationMain} alt="left icon" /> joyful sharing</h2>
      </div>
      <div className="flex-container">
        <div className="emerging-description">
          <div>
            Food that is a simple celebration of life and being together…diverse
            and tasty, playful, fun and highly inclusive. UFS’ Why: To celebrate
            and elevate the essential role OOH plays in bringing people and
            communities together. Core Operator benefit: Finding exciting new
            ways to heighten the essential joy and experience of sharing food.
            Core Consumer motivation:“I want food to be a reminder to make time
            to laugh together, smile and enjoy the simple things in life.”
          </div>
        </div>

        <div className="emerging-image">
          <div>
            <img src={Irresistible} alt="emerging-image" />
          </div>
        </div>
      </div>
      {!showSlider && (
        <FoodSliderComponent
          handleCloseSlider={handleCloseSlider}
          handleSlider={handleSlider}
        />
      )}
      {!showSliderservice && (
        <FoodServiceComponent
          handleCloseSliderservice={handleCloseSliderservice}
          handleSliderservice={handleSliderservice}
        />
      )}
      {!showSlidersocial && (
        <IrrSocial
          handleCloseSlidersocial={handleCloseSlidersocial}
          handleSlidersocial={handleSlidersocial}
        />
      )}
      
      <ul className="emerging-links">
        <li onClick={handleModal}>Trends Deep Dive</li>
        <li onClick={handleModalService}>Food Service Trend Scape</li>
        <li onClick={handleModalSocial}>Social Listening Analysis</li>
        <li style={{cursor: 'not-allowed'}}>Future Menu 2023</li>
      </ul>
    </>
  );
}

export default JoyfulSharing;
