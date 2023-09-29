import React, { useEffect, useState } from 'react';
import { noImageUploaded } from '../../../../components/icons/icons.jsx';
import { apiURL } from '../../../../env-url';
import api from '../../../../util/api.jsx';
import Dish from '../../../../assets/images/trends-categories/dish.png';
import Cuisine from '../../../../assets/images/trends-categories/cuisine.png';
import Brand from '../../../../assets/images/trends-categories/brands.PNG';
import Ingredient from '../../../../assets/images/trends-categories/Ingridient.png';
import Occasion from '../../../../assets/images/trends-categories/Occasion.png';
import Diet from '../../../../assets/images/trends-categories/diets.PNG';
import Retail from '../../../../assets/images/trends-categories/Retail.png';
import Audience from '../../../../assets/images/trends-categories/Audience.jpg';
import Category from '../../../../assets/images/trends-categories/categories.PNG';
import CookingMethod from '../../../../assets/images/trends-categories/cookingmethod.PNG';
import HealthBenefit from '../../../../assets/images/trends-categories/healthbenefits.PNG';
import HealthCondition from '../../../../assets/images/trends-categories/healthcondition.PNG';
import Claim from '../../../../assets/images/trends-categories/Claim.png';
import MarketTrendsHorizontalNav from '../market-trend-horizontal-nav/market-trend-horizontal-nav.jsx';
import Loader from '../../../../components/loader/loader.jsx';
import TopDishes from '../search-analysis/top-dishes.jsx';
import { useNavigate } from 'react-router-dom';

const SearchTikTok = ({ consumerTrendsCategory, handleBackMarketTrends, selectedItemName }) => {
  const [tikTokCategories, setTikTokCategories] = useState([]);
  const [additionalCategories, setAdditionalCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [openBarchart, setOpenBarChart] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const navigate = useNavigate();

  const categoryImages = {
    Audience,
    Brand,
    Category,
    Claim,
    CookingMethod,
    Cuisine,
    Diet,
    Dish,
    HealthBenefit,
    HealthCondition,
    Ingredient,
    Occasion,
    Retail,
  };

  const fetchData = () => {
    let consumerTrend = encodeURIComponent(selectedItemName);
    api
      .get(
        `${apiURL}/trends/search/categories/associated?country=uk&consumerTrend=${consumerTrend}`
      )
      .then((response) => {
        setLoading(false);
        const rankedCategories = response.data;
        const top5Categories = rankedCategories.slice(0, 5);
        const remainingCategories = rankedCategories.slice(5); // Get categories excluding the top 5

        setTikTokCategories(top5Categories);
        if (rankedCategories.length <= 5) {
          setShowSeeMore(false);
        } else {
          setAdditionalCategories(remainingCategories);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBarChart = (item) => {
    setCategory(item);
    setOpenBarChart(true);
    navigate('/trends-category', {
      state: {
        selectedItemName: selectedItemName,
        consumerTrendsCategory: consumerTrendsCategory,
        category:item
      },
    });

  };

  const handleBackToCategory = () => {
    setOpenBarChart(false);
  };

  const handleSeeMoreClick = () => {
    setShowSeeMore(false);
  };

  return (
    <div className="search-wrapper">
      {!category && (
        <div className="search-tick-tock">
          {' '}
          <MarketTrendsHorizontalNav
            handleBackMarketTrends={handleBackMarketTrends}
            consumerTrendsCategory={consumerTrendsCategory}
            selectedItemName={selectedItemName}
          />
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        !category && (
          <>
            <h3 className="mt-30">
              Top 5 Most Associated Categories with this trend
            </h3>
            <div className="search-main-wrapper">
              {tikTokCategories.map((tikTokCategory, i) => (
                <div className="search-cardwrapper" key={i}>
                  <div className="search-card-container" tabIndex={0}>
                    <div className="search-card" tabIndex={0}>
                      {tikTokCategory && (
                        <>
                          <img
                            src={
                              categoryImages[tikTokCategory.categoryName] ||
                              noImageUploaded
                            }
                            alt=""
                            onClick={() =>
                              handleBarChart(tikTokCategory.categoryName)
                            }
                          />
                          <p className="card-title title-block">
                            {tikTokCategory.categoryName}
                          </p>
                          <div className="search-overlay">
                            <p className="card-title-1">
                              {tikTokCategory.categoryName}
                            </p>
                            <p className="desc mt-10">
                              Find out more on how {tikTokCategory.categoryName}{' '}
                              are associated with this trend.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {showSeeMore && (
                <div className="search-cardwrapper">
                  <div className="search-card-container" tabIndex={0}>
                    <div
                      className="search-card see-more"
                      onClick={handleSeeMoreClick}
                    >
                      <img src={noImageUploaded} alt="" />
                      <p className="card-title title-block">See More</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Render additional categories if showSeeMore is false */}
              {!showSeeMore &&
                additionalCategories.map((tikTokCategory, i) => (
                  <div className="search-cardwrapper" key={i}>
                    <div className="search-card-container" tabIndex={0}>
                      <div className="search-card" tabIndex={0}>
                        {tikTokCategory && (
                          <>
                            <img
                              src={
                                categoryImages[tikTokCategory.categoryName] ||
                                noImageUploaded
                              }
                              alt=""
                              onClick={() =>
                                handleBarChart(tikTokCategory.categoryName)
                              }
                            />
                            <p className="card-title title-block">
                              {tikTokCategory.categoryName}
                            </p>
                            <div className="search-overlay">
                              <p className="card-title-1">
                                {tikTokCategory.categoryName}
                              </p>
                              <p className="desc mt-10">
                                Find out more on how{' '}
                                {tikTokCategory.categoryName} are associated
                                with this trend.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )
      )}

      {openBarchart && (
        <TopDishes
          category={category}
          handleBackToCategory={handleBackToCategory}
          consumerTrendsCategory={consumerTrendsCategory}
          selectedItemName={selectedItemName}
        />
      )}
    </div>
  );
};

export default SearchTikTok;
