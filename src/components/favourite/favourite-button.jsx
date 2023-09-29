import React, { useState, useEffect } from 'react';
import { favoriteGreenIcon, favoriteIcon } from '../icons/icons.jsx';
import api from '../../util/api.jsx';
import { apiURL } from '../../env-url.js';

const FavouriteButton = ({ item, id, fetchData, fetchlearning }) => {
  let ownerId = id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFavorite = () => {
    
    let obj = {};
    if (item.learningFavorite.length > 0 && item.learningFavorite[0].isFavorite) {
      obj = {
        id: item.learningFavorite[0].id,
        userId: ownerId,
        learningId: item.id,
        isFavorite: false,
      };
      setSuccessMessage('Removed from your favorites');
      setShowSuccess(true);
    } else {
      obj = { userId: ownerId, learningId: item.id, isFavorite: true };
      setSuccessMessage('Added to your favorites');
      setShowSuccess(true);
    }

    api
      .post(`${apiURL}/gotfl/learnings/${item.id}/favorites`, obj)
      .then((res) => {
        if (res.status === 200) {
          fetchData();
          fetchlearning();
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setShowSuccess(false); 
  }, [id]);

  return (
    <>
      <div className="fav-container">
        <div className="backdrop"></div>
        <button className="fav-icon" onClick={handleFavorite}>
          {item &&
          item.learningFavorite?.length > 0 &&
          item.learningFavorite[0].isFavorite ? (
            <img src={favoriteGreenIcon} alt="hearticon" />
          ) : (
            <div>
              <img src={favoriteIcon} alt="hearticon" />
            </div>
          )}
        </button>
      </div>
      {showSuccess && (
        <div className="message-container">
          <div className="success-message">
            <div className="add-fav">{successMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteButton;
