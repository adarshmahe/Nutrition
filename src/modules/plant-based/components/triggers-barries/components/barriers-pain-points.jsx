import classNames from 'classnames';
import React, { useState } from 'react';
import style from '../triggers-barries.module.scss';

import RightArrowIcon from '../../../../../assets/images/plant-based/right_arrow.svg';
import LightBallIcon from '../../../../../assets/images/plant-based/light-ball.svg';

import { Col, Row } from 'antd';
// import CommonBtn from '../../common-btn/common-btn.jsx';
import BgIcon6 from '../../../../../assets/images/plant-based/bg-icon-6.jpeg';
import BgIcon7 from '../../../../../assets/images/plant-based/bg-icon-7.jpeg';
import BgIcon8 from '../../../../../assets/images/plant-based/bg-icon-8.jpeg';
import BgIcon9 from '../../../../../assets/images/plant-based/bg-icon-9.png';
import BgIcon10 from '../../../../../assets/images/plant-based/bg-icon-10.png';
import BgIcon11 from '../../../../../assets/images/plant-based/bg-icon-11.png';
import BgIcon12 from '../../../../../assets/images/plant-based/bg-icon-12.png';
import BgIcon13 from '../../../../../assets/images/plant-based/bg-icon-13.png';

import CloseBtnIcon from '../../../../../assets/images/plant-based/close-line.svg';
import DataChangePopup from '../../data-change-popup/data-change-popup.jsx';

import BarriersVideo from '../../../../../assets/videos/plant-based-barriers.mp4';

const BarriersPainPoints = () => {
  const [openDataChangeWin, setOpenDataChangeWin] = useState(false);

  const fnOpenDataChangeWin = () => {
    setOpenDataChangeWin(true);
  };

  const fnCloseDataChangeWin = () => {
    setOpenDataChangeWin(false);
  };

  // const fnOpenTag = (tagId) => {
  //   const curEle = document.querySelector(`#${tagId}`);
  //   if(curEle) {
  //     curEle.setAttribute('style', 'display: block');
  //   }
  // };

  // const fnCloseTag = (tagId) => {
  //   const curEle = document.querySelector(`#${tagId}`);
  //   if(curEle) {
  //     curEle.setAttribute('style', 'display: none');
  //   }
  // };

  const [curTag, setCurTag] = useState('');
  const fnOpenTag = (tagId) => {
    setCurTag(tagId);
  };

  const fnCloseTag = () => {
    setCurTag('');
  };

  return <>
    <div className={classNames(style.labelHeader)} id="anchor-point-0">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Introduction</span>
    </div>
    <div style={{height: '30px'}}></div>
    <Row gutter={40}>
      <Col lg={12} md={24} className={classNames(style.desc2)}>
        <div className={classNames(style.subTitle1)}>WE ARE SEEING A PLANT-BASED FOODS REVOLUTION TODAY</div>
        <div style={{height: '10px'}}></div>
        <div className={classNames(style.desc1)}>
        fueled by increased media attention and celebrity endorsement that put a spotlight on a broad range of benefits, plant-forward eating has outgrown its niche status to become an aspirational lifestyle for the masses.
        at the same time, some unresolved barriers and pain points are standing in the way of further adoption.
        in this section you will learn more about the pains associated with plant-forward eating patterns (from the consumer lens), and plant-based product purchase barriers (from the shopper lens).
        </div>
      </Col>
      <Col lg={12} md={24}>
        <div className={classNames(style.subTitle1)}>Hear what our consumers say:</div>
        <div style={{height: '10px'}}></div>
        <video style={{width: '100%'}} controls src={BarriersVideo}></video>
      </Col>
    </Row>

    <div className={classNames(style.labelHeader)} id="anchor-point-1">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Plant-forward eating pattern pains</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.desc2)}>
      There are still several persistent pain points to relieve to further accelerate the adoption of plant-forward eating patterns.
    </div>
    <div style={{height: '36px'}}></div>
    <Row gutter={40}>
      <Col lg={8} md={24} className={classNames(style.rhomboidWrap)}>
        <div className={style.labelBorder}>
          <div className={classNames(style.tagLabel)}>FOOD  EXPERIENCE</div>
        </div>
        <div className={classNames(style.rhomboid)}>
          <div className={classNames(style.block)}>
            <img src={BgIcon6} alt=""  className={classNames(style.blockContent, style.blockBg1)}/>
          </div>
          <div className={classNames(style.block, style.blockBg4)} onMouseOver={() => fnOpenTag('tag-0-0')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              <div className={classNames(style.blockContent)}>
                {'LOW\nSATIETY'}
              </div>
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg2)} onMouseOver={() => fnOpenTag('tag-0-1')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'LACK OF\n TASTE'}
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg3)} onMouseOver={() => fnOpenTag('tag-0-2')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'INFERIOR\nTEXTURE'}
            </div>
          </div>

          {/* <div id="tag-0-0" className={classNames(style.rhomboidPopup, style.popup1)}>
            <div className={classNames(style.detail)}>
              Esp. meat adds a lot of rich (umami) flavour and fattiness to a dish, which is often missed in plant-based meals
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-0-0')}></img>
          </div>

          <div id="tag-0-1" className={classNames(style.rhomboidPopup, style.popup2)}>
            <div className={classNames(style.detail)}>
              While on the plus side being less heavy on the stomach, plant-based meals are also felt to be less filling and satisfying
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-0-1')}></img>
          </div>

          <div id="tag-0-2" className={classNames(style.rhomboidPopup, style.popup3)}>
            <div className={classNames(style.detail)}>
              Without meat & dairy, plant-based meals may lack ‘bite’ (easily getting ‘mushy’) or indulgence (creaminess)
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-0-2')}></img>
          </div> */}

          {/* <div className={classNames(style.rhomboidPopup, style.popup4)}>

          </div> */}
          <div className={classNames(style.rhomboidPopupHover, ['tag-0-0', 'tag-0-1', 'tag-0-2'].includes(curTag) && style.active)} onMouseOver={() => fnOpenTag(curTag)} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.detail)}>
              {
                curTag === 'tag-0-0' ? 'Esp. meat adds a lot of rich (umami) flavour and fattiness to a dish, which is often missed in plant-based meals' : 
                  curTag === 'tag-0-1' ? 'While on the plus side being less heavy on the stomach, plant-based meals are also felt to be less filling and satisfying' :
                    'Without meat & dairy, plant-based meals may lack ‘bite’ (easily getting ‘mushy’) or indulgence (creaminess)'
              }
            </div>
          </div>
        </div>
        <div style={{height: '40px'}}></div>
      </Col>
      <Col lg={8} md={24} className={classNames(style.rhomboidWrap)}>
        <div className={style.labelBorder}>
          <div className={classNames(style.tagLabel)}>HEALTH & NUTRITION</div>
        </div>
        <div className={classNames(style.rhomboid)}>
          <div className={classNames(style.block, style.blockBg1)}  onMouseOver={() => fnOpenTag('tag-1-0')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'NUTRIENT\nDEFICITS'}
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg4)}  onMouseOver={() => fnOpenTag('tag-1-1')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              <div className={classNames(style.blockContent)}>
                {'CARB\nOVERLOAD'}
              </div>
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg2)}  onMouseOver={() => fnOpenTag('tag-1-2')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'TOO\nARTIFICIAL'}
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg3)}>
            <img src={BgIcon7} alt=""  className={classNames(style.blockContent, style.blockBg1)}/>
          </div>

          {/* <div id="tag-1-0" className={classNames(style.rhomboidPopup, style.popup1)}>
            <div className={classNames(style.detail)}>
              Some plant-based alternatives like meat mimickers are seen as highly processed and thus unhealthy foods
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-1-0')}></img>
          </div>

          <div id="tag-1-1" className={classNames(style.rhomboidPopup, style.popup2)}>
            <div className={classNames(style.detail)}>
            To fill the gap of meat, simply adding more carbs can cause an unbalanced and thus unhealthy diet
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-1-1')}></img>
          </div>

          <div id="tag-1-2"  className={classNames(style.rhomboidPopup, style.popup3)}>

          </div>

          <div id="tag-1-3" className={classNames(style.rhomboidPopup, style.popup4)}>
            <div className={classNames(style.detail)}>
              {

              }
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-1-3')}></img>
          </div> */}

          <div className={classNames(style.rhomboidPopupHover, ['tag-1-0', 'tag-1-1', 'tag-1-2'].includes(curTag) && style.active)} onMouseOver={() => fnOpenTag(curTag)} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.detail)}>
              {
                curTag === 'tag-1-0' ? 'Some plant-based alternatives like meat mimickers are seen as highly processed and thus unhealthy foods' : 
                  curTag === 'tag-1-1' ? 'To fill the gap of meat, simply adding more carbs can cause an unbalanced and thus unhealthy diet' :
                    'Without meat & dairy consumers worry about not get enough protein and micronutrients (e.g. B12, calcium, iron)'
              }
            </div>
          </div>
        </div>
        <div style={{height: '40px'}}></div>
      </Col>
      <Col lg={8} md={24} className={classNames(style.rhomboidWrap)}>
        <div className={style.labelBorder}>
          <div className={classNames(style.tagLabel)}>ACCESIBILITY</div>
        </div>
        <div className={classNames(style.rhomboid)}>
          <div className={classNames(style.block)}>
            <img src={BgIcon8} alt=""  className={classNames(style.blockContent, style.blockBg1)}/>
          </div>
          <div className={classNames(style.block, style.blockBg4)} onMouseOver={() => fnOpenTag('tag-2-0')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              <div className={classNames(style.blockContent)}>
                {'TOO\nEXPENSIVE'}
              </div>
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg2)}  onMouseOver={() => fnOpenTag('tag-2-1')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'NO SKILLS/\nKNOW-HOW'}
            </div>
          </div>
          <div className={classNames(style.block, style.blockBg3)}  onMouseOver={() => fnOpenTag('tag-2-2')} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.blockContent)}>
              {'LIMITED\nCHOICE'}
            </div>
          </div>

          {/* <div id="tag-2-0" className={classNames(style.rhomboidPopup, style.popup1)}>
            <div className={classNames(style.detail)}>
            For some, cooking tasty plant-based dishes requires learning new techniques
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-2-0')}></img>
          </div>

          <div id="tag-2-1" className={classNames(style.rhomboidPopup, style.popup2)}>
            <div className={classNames(style.detail)}>
            Whether eating out or in, plant-based alternatives command a price premium and drive up costs
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-2-1')}></img>
          </div>

          <div id="tag-2-2" className={classNames(style.rhomboidPopup, style.popup3)}>
            <div className={classNames(style.detail)}>
            With limited inspiration, cooking and eating the same limited set of plant-based meals again can feel monotonous
            </div>
            <img src={CloseBtnIcon} className={classNames(style.closeBtn)} onClick={() => fnCloseTag('tag-2-2')}></img>
          </div> */}

          {/* <div className={classNames(style.rhomboidPopup, style.popup4)}>

          </div> */}
          <div className={classNames(style.rhomboidPopupHover, ['tag-2-0', 'tag-2-1', 'tag-2-2'].includes(curTag) && style.active)} onMouseOver={() => fnOpenTag(curTag)} onMouseLeave={() => fnCloseTag()}>
            <div className={classNames(style.detail)}>
              {
                curTag === 'tag-2-0' ? 'For some, cooking tasty plant-based dishes requires learning new techniques' : 
                  curTag === 'tag-2-1' ? 'Whether eating out or in, plant-based alternatives command a price premium and drive up costs' :
                    'With limited inspiration, cooking and eating the same limited set of plant-based meals again can feel monotonous'
              }
            </div>
          </div>
        </div>
        <div style={{height: '40px'}}></div>
      </Col>
    </Row>
    <div style={{textAlign: 'right'}}>
      <div className={classNames(style.btnBox2)} onClick={fnOpenDataChangeWin}>
        <img src={LightBallIcon} alt='' width={'15px'} style={{marginRight: '5px'}}></img>
        SEE CHANGE OVER TIME
      </div>
    </div>
    <div style={{height: '20px'}}></div>

    <div className={classNames(style.labelHeader)} id="anchor-point-2">
      <img src={RightArrowIcon} className={classNames(style.imgArrow)} alt=""/>
      <span className={classNames(style.label)}>Plant-Based purchase Barriers</span>
    </div>
    <div style={{height: '20px'}}></div>
    <div className={classNames(style.desc2)}>
      Price is a key barrier across shopper groups, but improving taste (perceptions) and providing better product information is also key to reach new buyers.
    </div>
    <div style={{height: '20px'}}></div>
    <Row gutter={40}>
      <Col lg={5} md={24} className={classNames(style.imgContentBox2Wrap)}>
        <div className={classNames(style.imgContentBox2)}>
          <img src={BgIcon9} alt='' style={{width: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Plant-based products command a sign. price premium vs. conventional products, limiting mass trial & frequency</div>
            <img src={CloseBtnIcon} alt='' className={classNames(style.btnClost)}></img>
          </div>
        </div>
        <div  className={classNames(style.imgTitlt)}>PRICE</div>
      </Col>
      <Col lg={4} md={24} className={classNames(style.imgContentBox2Wrap)}>
        <div style={{height: '100px'}}></div>
        <div className={classNames(style.imgContentBox2)}>
          <img src={BgIcon10} alt='' style={{width: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Plant-based is thought of as better-for-you, therefore too many artificial ingredients & baddies form a purchase barrier </div>
            <img src={CloseBtnIcon} alt='' className={classNames(style.btnClost)}></img>
          </div>
        </div>
        <div  className={classNames(style.imgTitlt)}>INGREDIENTS</div>
      </Col>
      <Col lg={5} md={24} className={classNames(style.imgContentBox2Wrap)}>
        <div className={classNames(style.imgContentBox2)}>
          <img src={BgIcon11} alt='' style={{width: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Without reassurance on taste (via product visuals, claims, semiotics) the trial barrier is too high, esp. for lighter users </div>
            <img src={CloseBtnIcon} alt='' className={classNames(style.btnClost)}></img>
          </div>
        </div>
        <div  className={classNames(style.imgTitlt)}>TASTE</div>
      </Col>
      <Col lg={4} md={24} className={classNames(style.imgContentBox2Wrap)}>
        <div style={{height: '100px'}}></div>
        <div className={classNames(style.imgContentBox2)}>
          <img src={BgIcon12} alt='' style={{width: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Compared to non-PB product equivalents, the plant-based segment offers far less (flavour) variants & novel-ties to stimulate higher usage</div>
            <img src={CloseBtnIcon} alt='' className={classNames(style.btnClost)}></img>
          </div>
        </div>
        <div  className={classNames(style.imgTitlt)}>VARIETY</div>
      </Col>
      <Col lg={5} md={24} className={classNames(style.imgContentBox2Wrap)}>
        <div className={classNames(style.imgContentBox2)}>
          <img src={BgIcon13} alt='' style={{width: '100%'}}></img>
          <div className={classNames(style.detailBox)}>
            <div className={classNames(style.label)}>Not seen / understood = not bought. Better on shelf & on pack indication and clearer labels make plant-based products easier to buy</div>
            <img src={CloseBtnIcon} alt='' className={classNames(style.btnClost)}></img>
          </div>
        </div>
        <div  className={classNames(style.imgTitlt)}>INFORMATION</div>
      </Col>
    </Row>

    <DataChangePopup open={openDataChangeWin} onClose={fnCloseDataChangeWin}></DataChangePopup>
  </>;
};

export default BarriersPainPoints;
