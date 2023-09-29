import React from 'react';
import SearchTikTok from '../components/market-trend/search-tik-tok.jsx';

function MarTrends({ consumerTrendsCategory, selectedItemName, handleBackMarketTrends }) {
  return (
    <>
      <SearchTikTok
        consumerTrendsCategory={consumerTrendsCategory}
        handleBackMarketTrends={handleBackMarketTrends}
        selectedItemName={selectedItemName}
      />
    </>
  );
}

export default MarTrends;
