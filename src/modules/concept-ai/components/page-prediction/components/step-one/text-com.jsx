import React from 'react';
import { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { predictionOcr, predictionTokenizer } from '../../../../api/request.js';
import { debounce } from '../../../../utils/utils.js';
import { changeStepOneData } from '../../../../store/concept-ai.js';
import style from './step-one.module.scss';
import classNames from 'classnames';
import ConceptBtn from '../../../concept-btn/concept-btn.jsx';

const { TextArea } = Input;

// const useSyncCallback = callback => {
// 	const [proxyState, setProxyState] = useState({ current: false })
// 	const [params, setParams] = useState([])

// 	const Func = useCallback((...args) => {
// 		setParams(args)
// 		setProxyState({ current: true })
// 	}, [proxyState])

// 	useEffect(() => {
// 		if (proxyState.current === true) setProxyState({ current: false })
// 	}, [proxyState])

// 	useEffect(() => {
// 		proxyState.current && callback(...params)
// 	})

// 	return Func
// }

let TextCom = (_, ref) => {
  const dispatch = useDispatch();
  const stepOneData = useSelector(state => state.conceptAi.stepOneData);
  const [textValue, setTextValue] = useState(stepOneData.text);
  const [tokenSize, setTokenSize] = useState(0);
  const placeholder = 'Please enter the concept text easy for human read as example. Please enter the concept text easy for human read as example.';
  const textMessage = 'Concept text that behind the 255th characters will be ignored by AI.';

  function postToken (val) {
    predictionTokenizer({text: val})
      .then(res => {
        // if (val !== textValue) {
        //   debugger
        // }
        setTokenSize(res.data.length);
      })
      .catch(() => {
        // postToken(val)
      });
  }
  const delayTokenSize = useCallback(debounce(function(val) { return postToken(val);}, 500), []);
  // const delayTokenSize = useSyncCallback(debounce(function(val) { return postToken(val)}, 500))

  useEffect(() => {
    if (textValue) {
      delayTokenSize(textValue);
    } else {
      setTokenSize(0);
    }
  }, [textValue]);

  const onChange = (val) => {
    setTextValue(val);
    dispatch(changeStepOneData({stepOneData: {text: val}}));
  };

  useImperativeHandle(ref, () => ({
    tokenSize,
    reset: () => {
      onChange('');
    }
  }));

  const [aiLoading, setAiLoading] = useState(false);
  const AIText = () => {
    if(!stepOneData.image_urls) return;
    setAiLoading(true);
    predictionOcr({file_url: stepOneData.image_urls})
      .then(res => {
        const val = res.data;
        setTextValue(textValue + val);
        dispatch(changeStepOneData({stepOneData: {text: val}}));
      })
      .catch(err => console.log(err))
      .finally(() => {
        setAiLoading(false);
      });
  };
  return (
    <div className={style.formContainer}>
      <div className={style.textHeader}>
        <div className={style.title}>Concept Text</div>
        <ConceptBtn iconType="text" onClick={AIText} disabled={!stepOneData.image_urls} loading={aiLoading}>Extract text from image</ConceptBtn>
      </div>
      <div className={style.textContainerWraper}>
        <div className={style.textContent}>
          <TextArea value={textValue} onChange={(e) => onChange(e.currentTarget.value)} placeholder={placeholder} />
        </div>
        <div className={classNames(style.tokenCount, tokenSize > 512 ? style.outLimit : '')}>{tokenSize}/512 Token</div>
      </div>
      <div className={style.textMessage}>{textMessage}</div>
    </div>
  );
};

TextCom = forwardRef(TextCom);

export default TextCom;