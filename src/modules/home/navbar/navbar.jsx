import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../components/logo/logo.jsx';
import Profile from '../../../components/profile/profile.jsx';
import Modal from './modal/modal.jsx';
import LandingVideoSecond from '../../../components/landing-bg-video-second/landing-bg-video-second.jsx';
import {
  ellipseIcon,
  gotflIcon,
  knowledgeHubIcon,
  marketMediaPerformanceIcon,
  mixCraterIcon,
  soundIcon,
  soundOffIcon,
  trendsIcon,
} from '../../../components/icons/icons.jsx';
import buttonSound from '../../../assets/sound/woosh-2-6471.mp3';
import bgMusic from '../../../assets/sound/bgm.mp3';

const Navbar = () => {
  const Trends = [
    { id: 1, title: 'Trends', path: '' },
    { id: 2, title: 'Trends Dial', path: '/trends-dial' },
    { id: 3, title: 'Irresistible Dish ', path: '' },
  ];
  const FrontLine = [
    { id: 1, title: 'Get On The Front Line', path: '' },
    { id: 2, title: 'Frontline Time', path: '/frontlinetime' },
    { id: 3, title: 'Consumer Theatre', path: '/consumertheater' },
  ];

  const Crafter = [
    { id: 1, title: 'Mix Crafter', path: '' },
    { id: 2, title: 'Concept AI ', path: '/conceptai' },
    { id: 3, title: 'Pains & Gains', path: '' },
  ];

  const Market = [
    { id: 1, title: 'Market & Media Performance', path: '' },
    { id: 2, title: 'market&media', path: '' },
    { id: 3, title: 'media ', path: '' },
  ];

  const KnowledgeHub = [
    { id: 1, title: 'Knowledge Hub', path: '' },
    { id: 2, title: 'Plant Based', path: '/plantbased' },
    {
      id: 3,
      title: 'Commercializing Sustainability',
      path: '/commercializing-sustainability',
    },
    { id: 4, title: 'Nutrition Tree of Wisdom', path: '/knowledge-tree' },
  ];

  const mainNavigationRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const togglePopup = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const [audio] = useState(new Audio(buttonSound));
  const [backgroundAudio] = useState(new Audio(bgMusic));
  useEffect(() => {
    if (open) {
      lastFocusedElementRef.current = document.activeElement;
      mainNavigationRef.current.setAttribute('aria-hidden', 'true');
    } else {
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
      mainNavigationRef.current.removeAttribute('aria-hidden');
    }
  }, [open]);

  const toggleBackgroundMusic = () => {
    if (isMusicPlaying) {
      backgroundAudio.pause();
    } else {
      backgroundAudio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      <div className="main-nav">
        <LandingVideoSecond />
        <div className="landing-header">
          <Logo />
          <Profile />
        </div>
        <nav ref={mainNavigationRef}>
          <div className="main-navigation">
            <ul className="navigation-content">
              <li>
                <div
                  className="main-navigation-content"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                    setData(FrontLine);
                    audio.play();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpen(!open);
                      setData(FrontLine);
                      audio.play();
                    }
                  }}
                >
                  <img src={gotflIcon} alt="frontline" className="frontline" />
                  <span onClick={togglePopup} className="main-navigation-text">
                    Get On The Front Line
                  </span>
                </div>
              </li>
              <li>
                <div
                  className="main-navigation-content"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                    setData(Trends);
                    audio.play();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpen(!open);
                      setData(Trends);
                      audio.play();
                    }
                  }}
                >
                  <img src={trendsIcon} alt="trends" className="trends" />
                  <span className="main-navigation-text" onClick={togglePopup}>
                    {' '}
                    Trends <br /> &nbsp;
                  </span>
                </div>
              </li>
              <li>
                <div
                  className="main-navigation-content"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                    setData(Market);
                    audio.play();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpen(!open);
                      setData(Market);
                      audio.play();
                    }
                  }}
                >
                  <img src={marketMediaPerformanceIcon} alt="market&media" />
                  <span className="main-navigation-text" onClick={togglePopup}>
                    {' '}
                    Market & Media Performance{' '}
                  </span>
                </div>
              </li>
              <li>
                <div
                  className="main-navigation-content"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                    setData(Crafter);
                    audio.play();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpen(!open);
                      setData(Crafter);
                      audio.play();
                    }
                  }}
                >
                  <img src={mixCraterIcon} alt="crafter" className="crafter" />
                  <span className="main-navigation-text" onClick={togglePopup}>
                    Mix Crafter <br /> &nbsp; {' '}
                  </span>
                </div>
              </li>
              <li>
                <div
                  className="main-navigation-content"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                    setData(KnowledgeHub);
                    audio.play();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpen(!open);
                      setData(KnowledgeHub);
                      audio.play();
                    }
                  }}
                >
                  <img src={knowledgeHubIcon} alt="knowledgehub" />
                  <span className="main-navigation-text" onClick={togglePopup}>
                    {' '}
                    KnowledgeHub <br /> &nbsp; {' '} 
                  </span>
                </div>
              </li>
            </ul>
          </div>
          {open && <Modal content={data} handleClose={togglePopup} open={open}/>}
        </nav>
      </div>
      <div className="nav-music">
        <div className="rotate-ellipse">
          <img src={ellipseIcon} alt="ellipse" />
        </div>
        <img
          src={isMusicPlaying ? soundIcon : soundOffIcon} 
          alt="sound"
          className="sound-icon icon-size"
          onClick={toggleBackgroundMusic}
        />
      </div>
    </>
  );
};

export default Navbar;
