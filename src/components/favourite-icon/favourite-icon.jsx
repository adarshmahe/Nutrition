import React from 'react';
import { favoriteGreenIcon, favoriteIcon } from '../icons/icons.jsx';

const FavouriteIcon = ({ handleFavoriteData, isFunctionAdded,
  setIsFunctionAdded,data }) => {
  const favoriteData = data.filter(item => {
    if (item.learningFavorite?.length > 0) {
      return item;
    }
  });

  const handleFavorite = () => {
    handleFavoriteData(favoriteData);
    setIsFunctionAdded(!isFunctionAdded);
  };

  return (
    <>
      <div className="fav-container">
        <button
          className="fav-icon"
          onClick={handleFavorite}
        >
          {!isFunctionAdded ? (
            <img src={favoriteIcon} alt="hearticon" />
          ) : (
            <img src={favoriteGreenIcon} alt="hearticon" />
          )}
        </button>
      </div>
    </>
  );
};

export default FavouriteIcon;
