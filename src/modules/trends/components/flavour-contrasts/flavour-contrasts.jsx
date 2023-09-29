import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Irresistible from '../../../../assets/images/Emerging-food-solution/flavourcontrasts/sensoryboom.jpg';
import FoodSliderComponent from './food-slider.jsx';
import FoodServiceComponent from './irr-food-service.jsx';
import IrrSocial from './irr-social.jsx';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
function FlavourContrasts() {
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
        <h2><img style={{cursor: 'pointer'}} src={leftLineIcon} onClick={handleNavigationMain} alt="left icon" /> flavour contrasts </h2>
      </div>
      <div className="flex-container">
        <div className="emerging-description">
          <div>
            Dining experiences that spark maximal sensory engagement and deep
            satisfaction UFS’ Why:To demonstrate our commitment to making food
            OOH exciting and engaging. Core Operator benefit: The inspiration to
            create new taste and texture experiences that really entertain and
            get people talking. Core Consumer motivation:“Dining at home I have
            really missed how gripping and entertaining food can be. It’s a
            show!”
          </div>
        </div>

        <div className="emerging-image">
          <div>
            <img src={Irresistible} alt="Irresistible" />
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

export default FlavourContrasts;
