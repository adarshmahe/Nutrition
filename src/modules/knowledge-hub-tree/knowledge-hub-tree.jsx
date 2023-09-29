import React, { useState, useEffect } from 'react';
import LeftSidebarCollapsible from '../../components/left-navigation/left-navigation.jsx';
import bgVideo from '../../assets/videos/knowledge-hub-tree3220.mp4';
import style from './knowledge-hub-tree.module.scss';
import classNames from 'classnames';

const videoInfo = {
  width: 3220,
  height: 1080
};
// 缩放兼容最小高度，小于此高度不再进行缩放
const minHeight = 600;

const KnowledgeHubTree = () => {
  const [isHover, setIsHover] = useState(false);
  const actionMouseover = () => {
    setIsHover(true);
  };
  const actionMouseleave = () => {
    setIsHover(false);
  };

  const [activeName, setActiveName] = useState(false);
  const activeClick = (val) => {
    if (activeName === val) {
      return hideActive();
    }
    setActiveName(val);
  };
  const hideActive = () => {
    setActiveName(false);
  };

  // 缩放样式
  const [scaleStyle, setScaleStyle] = useState(null);
  const [videoScaleStyle, setVideoScaleStyle] = useState(null);

  // 监听缩放
  let timer = null;
  const scaleComputed = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const winWidth = document.documentElement.clientWidth-134;
      const winHeight = document.documentElement.clientHeight;
      let rateX = 1;
      let rateY = 1;
      if (winHeight > minHeight) {
        rateY = winHeight/videoInfo.height;
      } else {
        rateY = minHeight/videoInfo.height;
      }
      if (videoInfo.width*rateY < winWidth) {
        rateX = winWidth/(videoInfo.width*rateY);
      }
      setScaleStyle({
        transform: `translate(-50%, -50%) scale(${rateY})`
      });
      setVideoScaleStyle({
        transform: `translateX(-50%) scaleX(${rateX})`
      });
    }, 16);
  };

  useEffect(() => {
    window.addEventListener('resize', scaleComputed);
    scaleComputed();
    return () => {
      window.removeEventListener('resize', scaleComputed);
    };
  }, []);

  return (
    <>
      <LeftSidebarCollapsible />
      <div className={style.headerNav}>
        <div className={style.headerTitle}></div>
        <div className={style.userBox}></div>
      </div>
      <div className={classNames(style.cockpitBox, style.left)}></div>
      <div className={classNames(style.cockpitBox, style.right)}></div>
      <div className={style.KnowledgeHubTree}>
        <div className={style.actionAndVideoContainer} style={scaleStyle}>
          <video className={style.videoItem} autoPlay="autoPlay" muted={true} loop="loop" style={{...videoScaleStyle, opacity: !activeName && isHover ? 0.6 : 1}}>
            <source src={bgVideo} />
          </video>
          <div className={style.actionContainer}>
            {activeName && <div className={style.modelBox} onClick={hideActive}></div>}
            {/* disabeld */}
            <div className={classNames(style.actionItem, style.actionDisable, style.actionAnimate, style.actionDisabled1)}>
              <div className={style.actionSelf}>
                <div className={style.actionBg}></div>
              </div>
            </div>
            <div className={classNames(style.actionItem, style.actionDisable, style.actionAnimate, style.actionDisabled2)}>
              <div className={style.actionSelf}>
                <div className={style.actionBg}></div>
              </div>
            </div>
            <div className={classNames(style.actionItem, style.actionDisable, style.actionAnimate, style.actionDisabled3)}>
              <div className={style.actionSelf}>
                <div className={style.actionBg}></div>
              </div>
            </div>
            <div className={classNames(style.actionItem, style.actionDisable, style.actionAnimate, style.actionDisabled4)}>
              <div className={style.actionSelf}>
                <div className={style.actionBg}></div>
              </div>
            </div>
            {/* Communication */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action1, {[style.actionActive]: activeName === 'action1'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action1')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Communication</div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Global Campaign Test */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c2c121c877ca622cd13cec/64c268bbf9ea287293afffdd/" target="__blank">Global Campaign Test</a>
                  </div>
                  {/* Need Scope */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c2c121c877ca622cd13cec/64cd212c1a46cd1d0a678f72/" target="__blank">Need Scope</a>
                  </div>
                  {/* DBA */}
                  <div className={classNames(style.linkItem, style.link3)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c2c121c877ca622cd13cec/64c9721c1a46cd1d0a678120/" target="__blank">DBA</a>
                  </div>
                  {/* Creative Tracker */}
                  <div className={classNames(style.linkItem, style.link4)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c2c121c877ca622cd13cec/64c972a1c877ca622cd15c07/" target="__blank">Creative Tracker</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Market Performance */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action2, {[style.actionActive]: activeName === 'action2'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action2')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Market Performance</div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Brand Power */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c23d79c877ca622cd1381a/64c23d18c877ca622cd13819/" target="__blank">Brand Power</a>
                  </div>
                  {/* Post Launch Evaluation */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c23d79c877ca622cd1381a/64cd37691a46cd1d0a678ffb/" target="__blank">Post Launch Evaluation</a>
                  </div>
                  {/* Competitor Analysis */}
                  <div className={classNames(style.linkItem, style.link3)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c23d79c877ca622cd1381a/64cd388f1a46cd1d0a679009/" target="__blank">Competitor Analysis</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Customer/Shopper  */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action3, {[style.actionActive]: activeName === 'action3'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action3')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Customer/<br></br>Shopper </div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Shopping Channel insights */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7978d94f28156cab574f/64cd31ebc877ca622cd1714e/" target="__blank">Shopping Channel insights</a>
                  </div>
                  {/* CVD */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7978d94f28156cab574f/64cd327ec877ca622cd1715c/" target="__blank">CVD</a>
                  </div>
                  {/* Own the seasons */}
                  <div className={classNames(style.linkItem, style.link3)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7978d94f28156cab574f/64cd35381a46cd1d0a678fdf/" target="__blank">Own the seasons</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Strategic Understanding  */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action4, {[style.actionActive]: activeName === 'action4'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action4')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Strategic <br /> Understanding</div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Occasion & Needstate */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64c263ffc877ca622cd13927/" target="__blank">Occasion & Needstate</a>
                  </div>
                  {/* U&A */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64cd2e13c877ca622cd1711a/" target="__blank">U&A</a>
                  </div>
                  {/* Menu Check */}
                  <div className={classNames(style.linkItem, style.link3)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64cd2ea21a46cd1d0a678fb5/" target="__blank">Menu Check</a>
                  </div>
                  {/* Top Dish */}
                  <div className={classNames(style.linkItem, style.link4)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64cd2f121a46cd1d0a678fc3/" target="__blank">Top Dish</a>
                  </div>
                  {/* Cash-strapped consumers */}
                  <div className={classNames(style.linkItem, style.link5)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64cd2fd1c877ca622cd17140/" target="__blank">Cash-strapped consumers</a>
                  </div>
                  {/* Understanding of Plant-Based consumers */}
                  <div className={classNames(style.linkItem, style.link6)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64cd30461a46cd1d0a678fd1/" target="__blank">Understanding of Plant-Based consumers</a>
                  </div>
                  {/* GOTFL  */}
                  <div className={classNames(style.linkItem, style.link7)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64c3912ec877ca622cd144c5/64e5c27f0d9a486f8c0602a0/" target="__blank">GOTFL </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Trend  */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action5, {[style.actionActive]: activeName === 'action5'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action5')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Trend</div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Trend Localization */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64c267d0f9ea287293afffcb/" target="__blank">Trend Localization</a>
                  </div>
                  {/* Gen Z */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd2b46c877ca622cd1710a/" target="__blank">Gen Z</a>
                  </div>
                  {/* Sustainability */}
                  <div className={classNames(style.linkItem, style.link3)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd26701a46cd1d0a678f78/" target="__blank">Sustainability</a>
                  </div>
                  {/* Pop Culture */}
                  <div className={classNames(style.linkItem, style.link4)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd2820c877ca622cd170b9/" target="__blank">Pop Culture</a>
                  </div>
                  {/* Different dietary requirements */}
                  <div className={classNames(style.linkItem, style.link5)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd29a31a46cd1d0a678f96/" target="__blank">Different dietary requirements</a>
                  </div>
                  {/* Premiumisation */}
                  <div className={classNames(style.linkItem, style.link6)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd2a24c877ca622cd170e9/" target="__blank">Premiumisation</a>
                  </div>
                  {/* Private Label */}
                  <div className={classNames(style.linkItem, style.link7)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7aecd330571c581ab35c/64cd2a93c877ca622cd170fa/" target="__blank">Private Label</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Global Brand Strategy  */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action6)} >
              <div className={style.actionSelf}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>
                  <a href="https://unilever.marketlogicsoftware.com/published/64ef7c4ed330571c581ab4ad" target="__blank">Global Brand <br /> Strategy</a>
                </div>
              </div>
            </div>
            {/* Innovation */}
            <div className={classNames(style.actionItem, style.actionAnimate, style.action7, {[style.actionActive]: activeName === 'action7'})}>
              <div className={style.actionSelf} onClick={() => activeClick('action7')}>
                <div className={style.actionBg}></div>
                <div className={style.actionName} onMouseOver={actionMouseover} onMouseLeave={actionMouseleave}>Innovation</div>
              </div>
              <div className={style.actionLinksContainer}>
                <div className={style.linkBg}></div>
                <div className={style.linkBox}>
                  {/* Meta Analysis */}
                  <div className={classNames(style.linkItem, style.link1)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7c1cd330571c581ab478/64c2c127f9ea287293b00261/" target="__blank">Meta Analysis</a>
                  </div>
                  {/* Concept Testing */}
                  <div className={classNames(style.linkItem, style.link2)}>
                    <a href="https://unilever.marketlogicsoftware.com/published/64ef7c1cd330571c581ab478/64cd1f64c877ca622cd16fcd/" target="__blank">Concept Testing</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KnowledgeHubTree;