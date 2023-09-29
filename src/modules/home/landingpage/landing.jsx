import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import spinner from '../../../assets/images/Spinner.png';
import spinner1 from '../../../assets/images/Spinner2.png';
import ellipse from '../../../assets/images/Ellipse68.png';
import bgMusic from '../../../assets/sound/bgm.mp3';
import {
  ellipseIcon,
  soundIcon,
  soundOffIcon,
} from '../../../components/icons/icons.jsx';

const Landing = ({ userName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic');
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="main">
        <div className="welcome-wrapper">
          <div className="circle-container">
            <div className="spinner-wrapper">
              <div className="spinner-one">
                <img src={spinner} alt="Spinner" />
              </div>
              <div className="spinner-two">
                <img src={spinner1} alt="Spinner 2" />
              </div>
            </div>
            <div className="ellipse-wrapper">
              <div className="ellipse">
                <img src={ellipse} alt="Ellipse" />
              </div>

              <div className="circle-content">
                <div className="welcome-text">
                  Welcome <div className="username-text">{userName}</div>
                  <div>Sous-chef Genius</div>
                  <span className="subtitle">
                    Your one-stop AI platform designed to transform <br></br>
                    daily marketing insights work.
                  </span>{' '}
                </div>
                <Link to="/navbar" className="go-btn">
                  Let's Go
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-music">
        <div className="rotate-ellipse">
          <img src={ellipseIcon} alt="ellipse" />
        </div>
        <img
          src={isPlaying ? soundIcon : soundOffIcon}
          alt="music"
          className="sound-icon icon-size"
          onClick={toggleMusic}
        />
      </div>
      <audio id="bgMusic" loop>
        <source src={bgMusic} type="audio/mp3" />
      </audio>
    </>
  );
};
export default Landing;
