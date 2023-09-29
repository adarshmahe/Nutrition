import React, { useState } from 'react';
import PlantBased from '../plant-based/plant-based.jsx';
import FoodWaste from '../food-waste/food-waste.jsx';
import Agriculture from '../regen-agriculture/agriculture.jsx';
import SustainabilitySearch from './sustainability-search.jsx';
import PrincipleItem from '../five-principles/principle-item.jsx';
import { principleData } from '../../util/content.js';
import { plantData } from '../../util/plant.js';
import { foodData } from '../../util/food-waste.js';
import { agricultureData } from '../../util/agriculture.js';
import Profile from '../../../../../components/profile/profile.jsx';

function SustainabilityNav() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [filteredPrincipleData, setFilteredPrincipleData] = useState([]); // New state for filtered principles
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlantData, setFilteredPlantData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [filteredAgricultureData, setFilteredAgricultureData] = useState([]);

  const handleFilterData = (data) => {
    if (activeTab === 'tab1') {
      setFilteredPrincipleData(data);
    } else if (activeTab === 'tab2') {
      setFilteredPlantData(data);
    } else if (activeTab === 'tab3') {
      setFilteredFoodData(data);
    } else if (activeTab === 'tab4') {
      setFilteredAgricultureData(data);
    }
  };
  
  return (
    <div className="horizontal-nav-container">
      <div className="horizontal-user-profile">
        <Profile/>
      </div>
      <h2>Commercializing Sustainability</h2>
      <div className="horizontal-nav mt-20">
        <ul className="horizontal-items-container sustainability-item">
          <li
            className={activeTab === 'tab1' ? 'active ' : ''}
            onClick={() => setActiveTab('tab1')}
          >
            5 Principles
          </li>
          <li
            className={activeTab === 'tab2' ? 'active ' : ''}
            onClick={() => setActiveTab('tab2')}
          >
            Plant Based
          </li>
          <li
            className={activeTab === 'tab3' ? 'active  ' : ''}
            onClick={() => setActiveTab('tab3')}
          >
            Food waste
          </li>
          <li
            className={activeTab === 'tab4' ? 'active  ' : ''}
            onClick={() => setActiveTab('tab4')}
          >
            regen agriculture
          </li>
        </ul>
        <div>
          <SustainabilitySearch
            handleFilterData={handleFilterData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            principleData={principleData}
            plantData={plantData}
            foodData={foodData}
            agricultureData={agricultureData}
          />
        </div>
      </div>

      {activeTab === 'tab1' && (
        <PrincipleItem filteredPrincipleData={filteredPrincipleData} />
      )}
      {activeTab === 'tab2' && (<PlantBased filteredPlantData={filteredPlantData}/>)}
      {activeTab === 'tab3' && (<FoodWaste filteredFoodData={filteredFoodData}/>)}
      {activeTab === 'tab4' && (<Agriculture filteredAgricultureData={filteredAgricultureData}/>)}
    </div>
  );
}

export default SustainabilityNav;
