import React, { useState, useEffect, useRef, useMemo } from 'react';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import HeaderNav from '../components/header-nav/header-nav.jsx';
import GlobalMap from '../components/global-map/global-map.jsx';
import SideVideos from '../components/side-videos/side-videos.jsx';
import SuggestNewTopic from '../components/suggest-new-topic/suggest-new-topic.jsx';
import VideoPlayer from '../components/video-player/video-player.jsx';
import ConsumerLibrary from '../components/consumer-library/consumer-library.jsx';
import style from './consumer-theater-page.module.scss';
import { fetchDictionary, fetchGeographicRegion } from '../api/request.js';
import bgVideo from '../../../assets/videos/consumer-theater-bg.mp4';
import { App } from 'antd';

let message;

const ConsumerTheaterPage = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;

  const [currentCountry, setCurrentCountry] = useState({
    country: '',
    region: ''
  });

  const SuggestNewTopicRef = useRef(null);
  const openNewTopic = () => {
    SuggestNewTopicRef.current.open();
  };

  const [showLibrary, setShowLibrary] = useState(false);

  const SideVideosRef = useRef(null);

  const toggleSideVideo = useMemo(() => {
    return function toggle(val) {
      const name = val?.name;
      if (val) {
        setCurrentCountry(val);
      } else {
        setCurrentCountry({
          country: '',
          region: ''
        });
      }
      if (name) {
        setTimeout(() => {
          SideVideosRef.current.open(name);
        }, 100);
      } else {
        SideVideosRef.current?.close();
        setShowLibrary(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };
  }, [SideVideosRef]);

  const VideoPlayerRef = useRef(null);
  const videoPlay = (videoData) => {
    VideoPlayerRef.current.open(videoData);
  };
  const toLibrary = () => {
    setShowLibrary(true);
    const winHeight = document.documentElement.clientHeight;
    if (document.documentElement.scrollTop < winHeight * 0.7) {
      setTimeout(() => {
        window.scrollTo({
          top: winHeight * 0.7,
          behavior: 'smooth'
        });
      }, 500);
    }
  };

  const [showScrollBtn, setShowScrollBtn] = useState(true);

  // 监听滚动 显示按钮
  function scrollCompute() {
    const winHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop < winHeight * 0.3) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
      setShowLibrary(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollCompute);
    scrollCompute();
    return () => {
      window.removeEventListener('scroll', scrollCompute);
    };
  }, []);

  // options data
  const [LifeStageOptions, setLifeStageOptions] = useState([]);
  const [DietaryOptions, setDietaryOptions] = useState([]);
  const [AgeOptions, setAgeOptions] = useState([]);
  const [IncomeOptions, setIncomeOptions] = useState([]);
  const [GeographicOptions, setGeographicOptions] = useState([]);
  useEffect(() => {
    try {
      fetchDictionary({type: 'lifeStage'})
        .then(res => {
          setLifeStageOptions(res.data?.map((item) => {
            return {
              label: item.value,
              value: item.value,
            };
          }));
        })
        .catch(error => console.log(error));
      fetchDictionary({type: 'dietary'})
        .then(res => {
          setDietaryOptions(res.data?.map((item) => {
            return {
              label: item.value,
              value: item.value,
            };
          }));
        })
        .catch(error => console.log(error));
      fetchDictionary({type: 'age'})
        .then(res => {
          setAgeOptions(res.data?.map((item) => {
            return {
              label: item.value,
              value: item.value,
            };
          }));
        })
        .catch(error => console.log(error));
      fetchDictionary({type: 'socialClass'})
        .then(res => {
          setIncomeOptions(res.data?.map((item) => {
            return {
              label: item.value,
              value: item.value,
            };
          }));
        })
        .catch(error => console.log(error));
      fetchGeographicRegion()
        .then(res => {
          setGeographicOptions(res.data?.map((item) => {
            return {
              label: item.geographic,
              value: item.geographic,
              children: item.countries.map(country => ({label: country, value: country}))
            };
          }));
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <LeftSidebarCollapsible />
      <SuggestNewTopic 
        ref={SuggestNewTopicRef}
        LifeStageOptions={LifeStageOptions} 
        DietaryOptions={DietaryOptions} 
        AgeOptions={AgeOptions} 
        IncomeOptions={IncomeOptions} 
        GeographicOptions={GeographicOptions} 
      />
      <SideVideos ref={SideVideosRef} country={currentCountry.country} play={videoPlay} toLibrary={toLibrary} />
      <VideoPlayer ref={VideoPlayerRef} />
      <div className={style.fixedContent}>
        <video className={style.videoBackground} autoPlay="autoPlay" muted={true} loop="loop">
          <source src={bgVideo} />
        </video>
        <HeaderNav openNewTopic={openNewTopic} />
        <div className={style.mapBox}>
          <GlobalMap toggleSideVideo={toggleSideVideo} />
        </div>
      </div>
      <div className={style.consumerTheaterPage}>
        {showScrollBtn && <div className={style.scrollToTopContainer} onClick={toLibrary}>
          <div className={style.scrollToTop}></div>
        </div>}
        <ConsumerLibrary 
          country={currentCountry} 
          play={videoPlay} 
          show={showLibrary} 
          LifeStageOptions={LifeStageOptions} 
          DietaryOptions={DietaryOptions} 
          AgeOptions={AgeOptions} 
          IncomeOptions={IncomeOptions} 
          GeographicOptions={GeographicOptions} 
        />
      </div>
    </>
  );
};

export default ConsumerTheaterPage;

export { message };
