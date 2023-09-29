import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Modal, Input, Cascader, Button } from 'antd';
import BorderContainer from '../border-container/border-container.jsx';
import style from './suggest-new-topic.module.scss';
import { postSuggestion } from '../../api/request.js';
import { message } from '../../pages/consumer-theater-page.jsx';

let SuggestNewTopic = ({LifeStageOptions, DietaryOptions, AgeOptions, IncomeOptions, GeographicOptions}, ref) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
    },
  }));

  // email
  const [emailAddress, setEmailAddress] = useState('');
  const setEmail = (val) => {
    setEmailAddress(val);
  };

  // new topic
  const [newTopic, setNewTopic] = useState('');
  const setTopic = (val) => {
    setNewTopic(val);
  };

  // Markets 
  const [marketValue, setMarketValue] = useState([]);
  const setMarket = (val) => {
    setMarketValue(val);
  };

  // Specific Demographic request
  const [specificValue, setSpecificValue] = useState([]);
  const setSpecific = (val) => {
    setSpecificValue(val);
  };
  const [specificOptions, setSpecificOptions] = useState([]);
  useEffect(() => {
    setSpecificOptions([
      {
        value: 'LifeStage',
        label: 'LifeStage',
        children: LifeStageOptions
      },
      {
        value: 'Dietary',
        label: 'Dietary',
        children: DietaryOptions
      },
      {
        value: 'Age',
        label: 'Age',
        children: AgeOptions
      },
      {
        value: 'Income',
        label: 'Income',
        children: IncomeOptions
      }
    ]);
  }, [LifeStageOptions, DietaryOptions, AgeOptions, IncomeOptions]);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const dis = !emailAddress || !newTopic || marketValue.length === 0;
    setDisable(dis);
  }, [emailAddress, newTopic, marketValue]);

  const [loading, setLoading] = useState(false);

  const submitHandle = () => {
    setLoading(true);
    const checkedObj = {
      LifeStage: [],
      Dietary: [],
      Age: [],
      Income: []
    };
    specificValue.forEach(item => {
      if (item.length === 1) {
        const val = specificOptions.find(specific => specific.value === item[0]);
        checkedObj[item[0]].push(...val.children);
      } else {
        checkedObj[item[0]].push({
          value: item[1],
          label: item[1],
        });
      }
    });

    const specific_requests = [];
    Object.keys(checkedObj).forEach(key => {
      if (checkedObj[key].length > 0) {
        specific_requests.push({
          value: key === 'Income' ? 'Social Class' : key,
          label: key === 'Income' ? 'Social Class' : key,
          children: checkedObj[key]
        });
      }
    });
    const data = {
      emailAddress: emailAddress,
      new_topic: newTopic,
      market: marketValue[1],
      specific_requests: JSON.stringify(specific_requests)
    };
    postSuggestion(data)
      .then(res => {
        console.log(res);
        message.success('Suggestion submitted successfully!');
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const afterCloseHandle = () => {
    setEmailAddress('');
    setNewTopic('');
    setMarketValue([]);
    setSpecificValue([]);
    setLoading(false);
  };

  return (
    <Modal
      title="" 
      wrapClassName={style.myDialog}
      width={930} 
      centered 
      footer={null} 
      open={isModalOpen}
      onCancel={handleCancel}
      afterClose={afterCloseHandle}
      closeIcon={(
        <div className={style.closeBtn}></div>
      )}
    >
      <div className={style.dialogBox}>
        <BorderContainer id="topic">
          <div className={style.dialogMain}>
            <div className={style.dialogTitle}><div className={style.titleBox}>Suggest New Topic</div></div>
            <div className={style.conditionBox}>
              <div className={style.formItem}>
                <div className={style.itemName}>Email address</div>
                <div className={style.itemInput}>
                  <Input
                    placeholder=""
                    value={emailAddress}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.formItem}>
                <div className={style.itemName}>Suggest New Topic</div>
                <div className={style.itemInput}>
                  <Input
                    placeholder=""
                    value={newTopic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>
              <div className={style.formItem}>
                <div className={style.itemName}>Markets</div>
                <div className={style.itemInput}>
                  <Cascader
                    placeholder=""
                    value={marketValue}
                    onChange={setMarket}
                    options={GeographicOptions}
                  />
                </div>
              </div>
              <div className={style.formItem}>
                <div className={style.itemName}>Specific Demographic request<div className={style.subName}>&nbsp;&nbsp;(optional)</div></div>
                <div className={style.itemInput}>
                  <Cascader
                    placeholder=""
                    multiple
                    maxTagCount="responsive"
                    value={specificValue}
                    onChange={setSpecific}
                    options={specificOptions}
                  />
                </div>
              </div>
            </div>
            <div className={style.confirmBtn}>
              <Button type="primary" disabled={disable} block loading={loading} onClick={submitHandle}>CONFIRM</Button>
            </div>
          </div>
        </BorderContainer>
      </div>
    </Modal>
  );
};

SuggestNewTopic = forwardRef(SuggestNewTopic);

export default SuggestNewTopic;