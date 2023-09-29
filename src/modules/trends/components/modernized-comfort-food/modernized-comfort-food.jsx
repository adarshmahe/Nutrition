import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modernizedcomfortfood from '../../../../assets/images/Emerging-food-solution/modernizedcomfortfood/modernizedcomfortfood.jpg';
import FoodSliderComponent from './food-slider.jsx';
import FoodServiceComponent from './irr-food-service.jsx';
import IrrSocial from './irr-social.jsx';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
function ModernizedComfortFood() {
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
        <h2><img style={{cursor: 'pointer'}} src={leftLineIcon} onClick={handleNavigationMain} />modernized comfort food</h2>
      </div>
      <div className="flex-container">
        <div className="emerging-description">
          <div>
            Dishes and techniques that cherish and revalue some of our most
            humble yet nourishing food traditions and stories UFS’ Why: To
            celebrate the deep and iconic role of timeless dishes and
            ingredients in food culture all around the world. Core Operator
            benefit: To show my cultural roots and culinary talent through
            incredible creations from the humblest of ingredients. Core
            motivation: ”I am looking for comforting foods that give me a sense
            of fulfilment and nourishment and connects to my story.”
          </div>
        </div>

        <div className="emerging-image">
          <div>
            <img src={Modernizedcomfortfood} alt="emerging-image" />
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

export default ModernizedComfortFood;
