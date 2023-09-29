import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBarClose, setFilterOptions } from '../store/concept-ai.js';
import { getFilterOptions } from '../api/request.js';
import HeaderNav from '../components/header-nav/header-nav.jsx';
import SelectBall from '../components/select-ball/select-ball.jsx';
import PageMyConcept from '../components/page-my-concept/page-my-concept.jsx';
import PagePrediction from '../components/page-prediction/page-prediction.jsx';
import ResultCom from '../components/page-prediction/components/step-three/print.jsx';
import LeftSidebarCollapsible from '../../../components/left-navigation/left-navigation.jsx';
import bgVideo from '../../../assets/videos/conceptai-background-video.mp4';
import style from './main.module.scss';
import { App } from 'antd';

let message;

function ConceptAiPage() {
  const staticFunction = App.useApp();
  message = staticFunction.message;

  useLayoutEffect(() => {
    setTimeout(() => {
      window.scrollTo({top: -1, behavior: 'smooth'});
    }, 500);
  }, []);

  const isClose = useSelector(state => state.conceptAi.sideBarIsClose);
  
  // 透明系数
  const [opacity, setOpacity] = useState(1);
  // 缩放系数
  const [scaleRate, setScaleRate] = useState(1);
  const [winHeight, setWinHeight] = useState(document.documentElement.clientHeight);
  // 缩放样式
  const [scaleStyle, setScaleStyle] = useState(null);
  // 监听滚动，背景透明
  function opacityCompute(e) {
    const scrollTop = e.target.documentElement.scrollTop;
    let opacity = (winHeight - scrollTop) / winHeight;
    opacity = opacity < 0.3 ? 0.3 : opacity;
    setOpacity(opacity);
  }

  // 监听缩放
  let timer = null;
  const scaleComputed = () => {
    const width = isClose ? 134 : 250;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const winWidth = document.documentElement.clientWidth - width;
      setWinHeight(document.documentElement.clientHeight);
      let rate = 1;
      if (winWidth > 1658) {
        rate = 1;
      } else {
        rate = winWidth/1658;
      }
      setScaleRate(rate);
    }, 16);
  };
  useEffect(() => {
    window.addEventListener('scroll', opacityCompute);
    window.addEventListener('resize', scaleComputed);
    scaleComputed();
    return () => {
      window.removeEventListener('scroll', opacityCompute);
      window.removeEventListener('resize', scaleComputed);
    };
  }, [isClose]);

  useEffect(() => {
    setScaleStyle({
      left: '50%',
      transformOrigin: 'center 0',
      transform: `translateX(-50%) scale(${scaleRate})`
    });
  }, [scaleRate]);
  
  // 页面弹出
  function pageShow() {
    if (document.documentElement.scrollTop < winHeight * 0.7) {
      setTimeout(() => {
        window.scrollTo({
          top: winHeight * 0.7,
          behavior: 'smooth'
        });
      }, 500);
    }
  }

  const pageType = useSelector(state => state.conceptAi.pageType);
  const country = useSelector(state => state.conceptAi.country);
  useEffect(() => {
    pageType && pageShow();
  }, [pageType, country]);

  // 获取category options
  const dispatch = useDispatch();
  let firstFilterOptions = false;
  useEffect(() => {
    if (firstFilterOptions) return;
    firstFilterOptions = true;
    getFilterOptions().then(res => {
      const categoryOptions = res.data.category.map(item => {
        return {
          value: item,
          label: item
        };
      });
      const brandOptions = res.data.brand.map(item => {
        return {
          value: item,
          label: item
        };
      });
      const formatOptions = res.data.format.map(item => {
        return {
          value: item,
          label: item
        };
      });
      dispatch(setFilterOptions({filterOptions: {
        categoryOptions,
        brandOptions,
        formatOptions
      }}));
    }).catch(error => console.error(error));
  }, []);

  const toggle = (isClose) => {
    dispatch(toggleSideBarClose({isClose}));
  };

  return (
    <>
      <LeftSidebarCollapsible toggleCallback={toggle} />
      <div className={isClose ? style.openContainer : style.foldContainer}>
        <div id="choice-box" className={style.fixedContent} style={{opacity: opacity}}>
          <video className={style.videoBackground} autoPlay="autoPlay" muted={true} loop="loop">
            <source src={bgVideo} />
          </video>
          <HeaderNav />
          <SelectBall />
        </div>
        <div id="page-box" className={style.pageWrapper}>
          { pageType === 'MyConcept' 
            && <PageMyConcept scaleRate={scaleRate} scaleStyle={scaleStyle} />
          }
          { pageType === 'ConceptPrediction' 
            && country 
            && <PagePrediction scaleRate={scaleRate} scaleStyle={scaleStyle} />
          }
        </div>
      </div>
      <ResultCom print />
    </>
  );
}

export default ConceptAiPage;

export { message };
