import React, { useState } from 'react';
import { foodData } from '../../util/food-waste.js';
import ExploreLearning from '../five-principles/explore-learning-data.jsx';

export default function FoodWaste({ filteredFoodData }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showExploreLearning, setShowExploreLearnig] = useState(false);
  const [exploreLearningData, setExploreLearning] = useState({});
  const [activeTab, setActiveTab] = useState('explore');

  const handleInspired = (item, tab) => {
    setShowExploreLearnig(!showExploreLearning);
    setExploreLearning(item);
    setActiveTab(tab);
  };

  return (
    <div className="principle">
      {!showExploreLearning &&
        (filteredFoodData.length > 0
          ? filteredFoodData.map((item) => {
            return (
              <div key={item.id} className='principle-list'>
                {selectedItemId != item.id ? (
                  <div className="principle-container front">
                    <div className="principle-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="principle-data">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                ) : null}

                <div className="principle-container back">
                  <div className="principle-data">
                    <h2>{item.bold}</h2>
                    <p>{item.detail}</p>
                    <div className="mt-20">
                      <button
                        className="principle-btn"
                        onClick={() => handleInspired(item, 'explore')}
                      >
                        Explore Learnings
                      </button>
                      <button
                        className="principle-btn ml-20"
                        onClick={() => handleInspired(item, 'inspired')}
                      >
                        Get inspired
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : foodData.map((item) => {
            return (
              <div key={item.id} className="principle-list">
                {selectedItemId != item.id ? (
                  <div className="principle-container front">
                    <div className="principle-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="principle-data">
                      <div className="circle-container">
                        {item.id}
                      </div>
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                ) : null}

                <div className="principle-container back">
                  <div className="principle-data">
                    <h2>{item.bold}</h2>
                    <p>{item.detail}</p>
                    <div className="mt-20">
                      <button
                        className="principle-btn"
                        onClick={() => handleInspired(item, 'explore')}
                      >
                        Explore Learnings
                      </button>
                      <button
                        className="principle-btn ml-20"
                        onClick={() => handleInspired(item, 'inspired')}
                      >
                        Get inspired
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }))}
      {showExploreLearning && (
        <ExploreLearning
          showExploreLearning={showExploreLearning}
          exploreLearningData={exploreLearningData}
          activeTab={activeTab}
          setShowExploreLearnig={setShowExploreLearnig}
          setSelectedItemId={setSelectedItemId}
        />
      )}
    </div>
  );
}
