import React from 'react';
import ConsumerTrendsCard from './consumer-trends/consumer-trends.jsx';

function TrendsInnovation({filteredData,consumerTrendsCategory}) {
 
  return (
    <>
      <ConsumerTrendsCard filteredData={filteredData} consumerTrendsCategory={consumerTrendsCategory}/>
    </>
  );
}
export default TrendsInnovation;
