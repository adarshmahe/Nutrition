import React, { useEffect, useState } from 'react';
import {
  noImageUploaded,
  shareIcon,
} from '../../../../../components/icons/icons.jsx';
import FavouriteButton from '../../../../../components/favourite/favourite-button.jsx';
import api from '../..//../../../util/api.jsx'
import { apiURL } from '../../../../../env-url.js';
import ConsumerInnovationPopup from './consumer-trend-popup.jsx';
import Loader from '../../../../../components/loader/loader.jsx';
import ShareModal from '../../../../../components/share-modal/share-modal.jsx';

function ConsumerTrendsCard({ filteredData, consumerTrendsCategory }) {
  const [showMessage, setShowMessage] = useState(false);
  const [trends, setTrends] = useState([]);
  const [selectedCardURL, setSelectedCardURL] = useState('');
  const [openModals, setOpenModals] = useState({});
  const [idValue, setIdValue] = useState('');
  const [openReadMorePopup, setOpenReadMorePopup] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    let consumerTrend = encodeURIComponent(consumerTrendsCategory);
    
    api
      .get(
        `${apiURL}/trends/mintel/consumerTrendDetails?country=UK&consumentTrend=${consumerTrend}`,
      )
      .then((response) => {
        setTrends(response.data);
        setLoading(false);
        const initialOpenModals = {};
        response.data.forEach((item) => {
          initialOpenModals[item.recordId] = false;
        });
        setOpenModals(initialOpenModals);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShare = (cardURL, cardId) => {
    setSelectedCardURL(cardURL);
    setOpenModals((prevState) => ({
      ...prevState,
      [cardId]: true,
    }));
    setShowMessage(!showMessage);
  };

  const handleReadMore = (id) => {
    setIdValue(id);
    setOpenReadMorePopup(!openReadMorePopup);
  };

  const closeConsumerInnovation = () => {
    setOpenReadMorePopup(false);
  };

  return isLoading ? ( //Checkif if is loading
    <Loader />
  ) : (
    <>
      <div className="containerwrapper-innovation mt-10">
        {filteredData && filteredData.length > 0
          ? filteredData.map((item, i) => (
            <div className="cardwrapper" key={i}>
              <div className="card-container" tabIndex={0}>
                <div className="card" tabIndex={0}>
                  <img src={item.imageLink} alt="mediaLinks" />
                </div>
                <div className="expandable">
                  <ul className="card-icon-wrapper">
                    <li>
                      <FavouriteButton item={item} id={item.recordId} />
                    </li>
                    <li>
                      <img
                        src={shareIcon}
                        alt="share link"
                        onClick={() =>
                          handleShare(item.imageLink, item.recordId)
                        }
                      />
                    </li>
                  </ul>
                  <div className="card-Items">
                    <div className="consumer">
                      <span className="consumer-title">Nestle :</span>{' '}
                      {item.product}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">Date :</span>{' '}
                      {item.updatedTimestamp}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">category:</span>{' '}
                      {item.subCategory}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">Brand:</span>{' '}
                      {item.brand}
                    </div>
                  </div>
                  <div className="card-dscp mt-10 mb-10">
                    {item.productDescription}
                  </div>
                </div>
              </div>
            </div>
          ))
          : trends.map((item, i) => (
            <div className="cardwrapper" key={i}>
              <div className="card-container" tabIndex={0}>
                <div className="card" tabIndex={0}>
                  <img
                    src={item.imageLink ? item.imageLink : noImageUploaded}
                    alt="mediaLinks"
                    onClick={() => handleReadMore(i)}
                  />
                </div>
                <div className="expandable">
                  <ul className="card-icon-wrapper">
                    <li>
                      <FavouriteButton item={item} id={item.recordId} />
                    </li>
                    <li>
                      <img
                        src={shareIcon}
                        alt="share link"
                        onClick={() =>
                          handleShare(item.imageLink, item.recordId)
                        }
                      />
                    </li>
                  </ul>
                  <div className="card-Items">
                    <div className="consumer">
                      <span className="consumer-title">Nestle :</span>{' '}
                      {item.product}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">Date :</span>{' '}
                      {item.updatedTimestamp}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">category:</span>{' '}
                      {item.subCategory}
                    </div>
                    <div className="consumer">
                      <span className="consumer-title">Brand:</span>{' '}
                      {item.brand}
                    </div>
                  </div>
                  <div className="expandable">
                    <div className="card-dscp mt-10 mb-10">
                      {item.productDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {openReadMorePopup && (
          <ConsumerInnovationPopup
            data={trends}
            handleClose={closeConsumerInnovation}
            id={idValue}
            fetchData={fetchData}
            consumerTrendsCategory={consumerTrendsCategory}
          />
        )}
      </div>
      {showMessage ? <ShareModal cardURL={selectedCardURL} /> : null}
    </>
  );
}

export default ConsumerTrendsCard;
