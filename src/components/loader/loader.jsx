import React from 'react';
import Spinner from '../../assets/images/loader2_1.gif';
const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <img src={Spinner} alt="loader" />
      </div>
    </>
  );
};

export default Loader;
