import React, { useState } from 'react';
import Irresistible from '../../../../assets/images/Emerging-food-solution/feelgoodfood/feelgoodfood.jpg';
import FoodSliderComponent from './food-slider.jsx';
import FoodServiceComponent from './irr-food-service.jsx';
import IrrSocial from './irr-social.jsx';
import { useNavigate } from 'react-router-dom';
import {leftLineIcon} from '../../../../components/icons/icons.jsx';
function FeelGoodFood() {
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
        <h2><img style={{cursor: 'pointer'}} src={leftLineIcon} onClick={handleNavigationMain} alt="left icon" /> Feel good food</h2>
      </div>
      <div className="flex-container">
        <div className="emerging-description">
          <div>
            Personally positive food choices that are delicious and naturally
            promote balance in mood, body and spirit. To champion Boldly
            Healthier foods that are delicious and truly enhance your own sense
            of wellbeing. UFS’ Why: Core Operator benefit: To satisfy their
            diners’ appetite for dishes and foods that make them feel good and
            yet are fabulously tasty. Core Consumer motivation: “You are what
            you eat. I am learning that what I eat and when can have a huge
            impact on how I feel and perform, yet when I eat out I also want to
            indulge!”
          </div>
        </div>

        <div className="emerging-image">
          <div>
            <img src={Irresistible} alt="feelgoodfood" />
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

export default FeelGoodFood;
