import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo/logo.jsx';
import Landing from './landingpage/landing.jsx';
import LandingVideo from '../../components/landing-bg-video/landing-bg-video.jsx';

const Home = ({userName}) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(!showComponent);
      // setShow(!show);
    }, 1000);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <LandingVideo />
        <div className="appear">
          {showComponent && (
            <div className="landing-header">
              <Logo />
            </div>
          )}
          {showComponent && <Landing userName={userName}/>}
        </div>
      </div>
    </>
  );
};

export default Home;
