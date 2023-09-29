import React, { useState } from 'react';
import Irresistible from '../../../../assets/images/Emerging-food-solution/Irresistible/irresisitblevegetables.jpg';
import FoodSliderComponent from './food-slider.jsx';
import FoodServiceComponent from './irr-food-service.jsx';
import IrrSocial from './irr-social.jsx';
import { useNavigate } from 'react-router-dom';
import { leftLineIcon } from '../../../../components/icons/icons.jsx';
function Emergingfood() {
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
        <h2><img style={{cursor: 'pointer'}} src={leftLineIcon} onClick={handleNavigationMain} alt="left icon" /> Irresistible Vegetable</h2>
      </div>
      <div className="flex-container">
        <div className="emerging-description">
          <div>
            Plant-forward experiences that are decadent, moreish, indulgent and
            that don’t compromise on experience. UFS’ Why: ‘Boldly Healthy’
            meets sustainability; championing chefs to make plant-forward the
            norm by showing that there is no need to compromise Core Operator
            benefit: To show that true culinary skill can transform any
            ingredient into its indulgent best Core Consumer motivation:
            “Inspire me to explore plant-forward/ plant-based without any
            compromise on flavour or enjoyment”
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

export default Emergingfood;
