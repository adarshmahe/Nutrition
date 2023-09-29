import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/svg/Logo.svg';
const Logo = () => {
  return (
    <>
      <div className="logo">
        <Link to="/navbar">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default Logo;
