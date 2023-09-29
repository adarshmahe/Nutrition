import React from 'react';
import BrandFilter from '../../../../../../components/brand-filter/brand-filter.jsx';
import SubcategoryFilter from '../../../../../../components/subcategory-filter/subcategory-filter.jsx';
import MarketFilter from '../../../../../../components/market-filter/market-filter.jsx';
import DateFilter from '../../../../../../components/date-filter/date-filter.jsx';

function ConsumerFilters({handleFilteredData, consumerTrendsCategory}) {
  return (
    <div className="consumer-filter-container">
      <div className='consumer-filters'>
        <BrandFilter handleFilteredData={handleFilteredData} consumerTrendsCategory={consumerTrendsCategory}/>
        <SubcategoryFilter handleFilteredData={handleFilteredData} consumerTrendsCategory={consumerTrendsCategory}/>
        <MarketFilter handleFilteredData={handleFilteredData} consumerTrendsCategory={consumerTrendsCategory}/>
        <DateFilter handleFilteredData={handleFilteredData} consumerTrendsCategory={consumerTrendsCategory}/>
      </div>
    </div>
  );
}
export default ConsumerFilters;
