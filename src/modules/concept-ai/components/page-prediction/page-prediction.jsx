import React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePredictionStep, clearStepOneData, changeStepTwoData, changePage, changeCountry } from '../../store/concept-ai.js';
import { Modal } from 'antd';
import { VerticalRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { createConcept, getNewConceptResult } from '../../api/request.js';
import PropTypes from 'prop-types';
import PageContainer from '../page-container/page-container.jsx';
import BorderContainer from '../border-container/border-container.jsx';
import classNames from 'classnames';
import style from './page-prediction.module.scss';
import FormCom from './components/step-one/form-com.jsx';
import TextCom from './components/step-one/text-com.jsx';
import AddressingCom from './components/step-two/step-two.jsx';
import ResultCom from './components/step-three/step-three.jsx';
import BorderLight from '../border-light/border-light.jsx';
// import { resultFormat } from '@/constant'
import { message } from '../../pages/main.jsx';

// 查看结果
const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 20,
      color: '#00FF00'
    }}
    spin
  />
);

function PagePrediction({ scaleStyle, scaleRate }) {
  const step = useSelector(state => state.conceptAi.predictionStep);
  const country = useSelector(state => state.conceptAi.country);

  const dispatch = useDispatch();

  const stepClass = (val) => {
    if (!step) return style.stepItem;
    return classNames(style.stepItem, step >= val ? style.active : '');
  };
  const stepCom = (
    <div className={style.stepContainer}>
      <div className={stepClass(1)}>
        <div className={style.stepNum}>1</div>
        <div className={style.stepName}>Concept Information</div>
      </div>
      <div className={stepClass(2)}>
        <div className={style.stepLine}></div>
        <div className={style.stepNum}>2</div>
        <div className={style.stepName}>Incrementality check</div>
      </div>
      <div className={stepClass(3)}>
        <div className={style.stepLine}></div>
        <div className={style.stepNum}>3</div>
        <div className={style.stepName}>Prediction Result</div>
      </div>
    </div>
  );
  
  // 页面高度计算
  const [pageHeight, setPageHeight] = useState('auto');
  const pageRefOne = useRef(null);
  const pageRefTwo = useRef(null);
  const pageRefThree = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      let height = 0;
      if (step === 1) {
        height = pageRefOne.current.offsetHeight;
      } else if (step === 2) {
        height = pageRefTwo.current.offsetHeight;
      } else if (step === 3) {
        height = pageRefThree.current.offsetHeight;
      }
      height = height * scaleRate;
      setPageHeight(height + 'px');
    });
  }, [scaleRate, step]);

  // 通用提交按钮，可禁用
  // eslint-disable-next-line react/prop-types
  const SubmitButton = ({text, disabled, onClick}) => {
    function click() {
      if (disabled) return;
      onClick();
    }
    return (
      <div className={classNames(style.btnItem, style.btnSolid, disabled ? style.disabled : '')} onClick={click}>
        {text}
      </div>
    );
  };

  // stepOne
  const FormComRef = useRef(null);
  const TextComRef = useRef(null);
  const [stepOneDisabled, setStepOneDisabled] = useState(true);
  const stepOneData = useSelector(state => state.conceptAi.stepOneData);
  useEffect(() => {
    const keys = Object.keys(stepOneData);
    setStepOneDisabled(keys.filter(key => key !== 'image_urls' && key !== 'image_key' && !stepOneData[key]).length > 0);
  }, [stepOneData]);

  // 重置
  const resetStep = () => {
    FormComRef.current.reset();
    TextComRef.current.reset();
    dispatch(changeStepTwoData({stepTwoData: []}));
  };
  // 去第二步
  const toStepTwo = () => {
    dispatch(changePredictionStep({predictionStep: 2}));
    setCreateConceptRes(null);
  };

  // stepTwo
  const [submitLoading, setSubmitLoading] = useState(false);
  const selectList = useSelector(state => state.conceptAi.stepTwoData);
  // 去第一步
  const toStepOne = () => {
    dispatch(changePredictionStep({predictionStep: 1}));
  };
  const sleep = (delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };
  // 去第三步 create concept
  const [createConceptRes, setCreateConceptRes] = useState(null);
  const toStepThree = async () => {
    setSubmitLoading(true);
    let time = Date.now();
    try {
      let needRes = createConceptRes;
      if (!needRes) {
        const data = {
          country,
          ...stepOneData,
          image_urls: [stepOneData.image_key],
          checklist: selectList
        };
        delete data.image_key;
        const createRes = await createConcept(data);
        needRes = createRes.data;
        setCreateConceptRes(createRes.data);
      }
      // run
      getNewConceptResult({id: needRes.id});
      const subTime = Date.now() - time;
      if (subTime < 5000) {
        await sleep(5000 - subTime);
      }
      message.loading({
        icon: loadingIcon,
        content: 'Action in progress..'
      });
      dispatch(changeCountry({country: ''}));
      dispatch(changePage({pageType: 'MyConcept'}));

      // const conceptRes = await getNewConceptResult({id: needRes.id})
      // dispatch(changeStepThreeData({stepThreeData: {
      //   id: needRes.id, 
      //   product: needRes.product,
      //   img: Array.isArray(needRes.image_urls) && needRes.image_urls[0],
      //   imgBase64: '',
      //   text: needRes.text,
      //   ...resultFormat(conceptRes.data)
      // }}))
      // dispatch(changePredictionStep({predictionStep: 3}))

    } catch(error) {
      console.log(error);
    } finally {
      const subTime = Date.now() - time;
      if (subTime > 1000) {
        setSubmitLoading(false);
      } else {
        setTimeout(() => {
          setSubmitLoading(false);
        }, 1000 - subTime);
      }
    }
  };

  // stepThree
  const copyTestAnother = () => {
    toStepOne();
  };
  const testAnother = () => {
    dispatch(clearStepOneData());
    dispatch(changeStepTwoData({stepTwoData: []}));

    dispatch(changePage({pageType: 'ConceptPrediction'}));
    dispatch(changeCountry({country: ''}));
    dispatch(changePredictionStep({predictionStep: 1}));
  };
  const exit = () => {
    dispatch(clearStepOneData());
    dispatch(changeStepTwoData({stepTwoData: []}));
    
    dispatch(changePage({pageType: ''}));
    dispatch(changeCountry({country: ''}));
    dispatch(changePredictionStep({predictionStep: 1}));
  };

  return (
    <PageContainer pageTitle="Concept Prediction" scaleStyle={scaleStyle} scaleRate={scaleRate} pageHeight={pageHeight} toolCom={stepCom}>
      <Fragment>
        {/* 第一步 */}
        {
          step === 1 && (
            <div ref={pageRefOne} className={classNames(style.predictionPage, style.stepOne)} style={scaleStyle}>
              <div className={style.pageContainer}>
                <div className={style.infoFormContainer}>
                  <BorderContainer>
                    <div className={style.contentBox}>
                      <FormCom ref={FormComRef} />
                    </div>
                  </BorderContainer>
                </div>
                <div className={style.infoTextContainer}>
                  <BorderContainer>
                    <div className={style.contentBox}>
                      <TextCom ref={TextComRef} />
                    </div>
                  </BorderContainer>
                </div>
              </div>
              <div className={style.footerBtn}>
                <div className={classNames(style.btnItem, style.btnEmpty)} onClick={resetStep}>
                  <div className={style.redoIcon}></div>
                  RESET
                </div>
                <SubmitButton text="NEXT" disabled={stepOneDisabled} onClick={toStepTwo} />
              </div>
            </div>
          )
        }
        {/* 第二步 */}
        {
          step === 2 && (
            <div ref={pageRefTwo} className={classNames(style.predictionPage, style.stepTwo)} style={scaleStyle}>
              <div className={style.pageContainer}>
                <BorderContainer>
                  <div className={style.contentBox}>
                    <AddressingCom />
                  </div>
                </BorderContainer>
              </div>
              <div className={style.footerBtn}>
                <div className={classNames(style.btnItem, style.btnEmpty)} onClick={toStepOne}>
                  <div className={style.prevIcon}><VerticalRightOutlined /></div>
                  Prev
                </div>
                <SubmitButton text="Submit" disabled={selectList.length===0} onClick={toStepThree} />
              </div>
            </div>
          )
        }
        {/* 第三步 结果 */}
        {
          step === 3 && (
            <div ref={pageRefThree} className={classNames(style.predictionPage, style.stepThree)} style={scaleStyle}>
              <div className={style.pageContainer}>
                <BorderContainer>
                  <div className={style.contentBox}>
                    <ResultCom />
                  </div>
                </BorderContainer>
              </div>
              <div className={style.footerBtn}>
                <div className={classNames(style.btnItem, style.btnEmpty)} onClick={copyTestAnother}>
                  Copy&Test Another
                </div>
                <div className={classNames(style.btnItem, style.btnEmpty)} onClick={testAnother}>
                  Test Another
                </div>
                <SubmitButton text="Exit" onClick={exit} />
              </div>
            </div>
          )
        }
        <Modal
          title="" 
          keyboard={false}
          maskClosable={false}
          transitionName="" 
          maskTransitionName="" 
          wrapClassName="fullscreen-loading-dialog" 
          width={918} 
          centered 
          footer={null} 
          open={submitLoading}
          closeIcon={null}
        >
          <BorderLight>
            <div className={style.submittingText}>AI prediction is in progress, please wait for seconds...</div>
          </BorderLight>
        </Modal>
      </Fragment>
    </PageContainer>
  );
}

PagePrediction.propTypes = {
  scaleRate: PropTypes.number,
  scaleStyle: PropTypes.object,
};

export default PagePrediction;
