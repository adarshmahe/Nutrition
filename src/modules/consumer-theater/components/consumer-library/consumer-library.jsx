import React, { useState, useCallback, useEffect } from 'react';
import VideoItem from '../video-item/video-item.jsx';
import rightArrow from '../../../../assets/images/consumer-theater/svg/right-arrow.svg';
import { Affix, Select, Input, Tabs, Spin, Cascader, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './consumer-library.module.scss';
import videoPlayIcon from '../../../../assets/images/consumer-theater/svg/play-btn.svg';
import { fetchCategory, getListByTopic, fetchList, fetchInsight } from '../../api/request.js';
import videoPosterDemo from '../../../../assets/images/consumer-theater/video-poster-demo2.png';
import classNames from 'classnames';

function debounce (callback, delay) {
  let lastTime;
  return function () {
    clearTimeout(lastTime);
    const [that, args] = [this, arguments];
    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30,
      color: '#00FF00'
    }}
    spin
  />
);

const { Search } = Input;

let requestIndex = 0;

function ConsumerLibrary({country, play, show, LifeStageOptions, DietaryOptions, AgeOptions, IncomeOptions, GeographicOptions }) {
  
  const [loading, setLoading] = useState(false);

  // LifeStage
  const [lifeStageValue, setLifeStageValue] = useState([]);
  
  // Dietary
  const [dietaryValue, setDietaryValue] = useState([]);

  // Age
  const [ageValue, setAgeValue] = useState([]);

  // Income  socialClass
  const [incomeValue, setIncomeValue] = useState([]);

  // Geographic
  const [geographicValue, setGeographicValue] = useState([]);

  // 地图选中国家
  useEffect(() => {
    if (country.country) {
      // 地图选新的国家，清空filter
      setLifeStageValue([]);
      setDietaryValue([]);
      setAgeValue([]);
      setIncomeValue([]);
      setGeographicValue([[country.region, country.country]]);
      setCurrentTab('--all--');
      setIsHomeTour(false);
    } else {
      // 地图取消了国家选择
    }
  }, [country]);

  const maxTagPlaceholder = (val) => {
    return `+${val.length}`;
  };

  // tags 选中
  const [selectedTags, setSelectedTags] = useState([]);
  const onTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      const arr = [...selectedTags, tag];
      setSelectedTags(arr);
    }
  };

  // search
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (val) => {
    setSearchValue(val);
    let geographicReq = [];
    let countryReq = [];
    geographicValue.forEach(item => {
      if (item.length === 1) {
        geographicReq.push(item[0]);
      } else {
        countryReq.push(item[1]);
      }
    });
    geographicReq = [...new Set(geographicReq)];
    GeographicOptions.forEach(region => {
      if (geographicReq.includes(region.value)) {
        countryReq.push(...region.children.map(item => item.value));
      }
    });
    countryReq = [...new Set(countryReq)];
    const params = {
      country: countryReq,
      lifeStage: isHomeTour ? null : lifeStageValue,
      dietary: isHomeTour ? null : dietaryValue,
      age: isHomeTour ? null : ageValue,
      socialClass: incomeValue,
      // geographic: geographicReq,
      category: currentTab === '--all--' ? null : currentTab,
      search: val
    };
    requestIndex++;
    if (detailTopic) {
      setCurrent(1);
      params.topic = detailTopic.topic;
      params.page = 1;
      params.page_size = pageSize;
      params.tag = selectedTags;
      delayFetchTopicDetailList(params);
    } else {
      delayFetchTopicList(params);
    }
  };

  // tab 选中 home tour 
  const [isHomeTour, setIsHomeTour] = useState(false);

  const toolCom = (
    <div className={style.toolGroupBox}>
      <div className={style.selectGroup}>
        {!isHomeTour && 
          <>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                placeholder='LifeStage'
                allowClear
                maxTagCount={1}
                maxTagTextLength={lifeStageValue.length > 1 ? 2 : 8}
                maxTagPlaceholder={maxTagPlaceholder}
                value={lifeStageValue}
                onChange={(newValue) => {
                  setLifeStageValue(newValue);
                }}
                options={LifeStageOptions}
                showSearch
                popupMatchSelectWidth={false}
              />
            </div>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                placeholder='Dietary'
                allowClear
                maxTagCount={1}
                maxTagTextLength={dietaryValue.length > 1 ? 2 : 8}
                maxTagPlaceholder={maxTagPlaceholder}
                value={dietaryValue}
                onChange={(newValue) => {
                  setDietaryValue(newValue);
                }}
                options={DietaryOptions}
                showSearch
                popupMatchSelectWidth={false}
              />
            </div>
            <div className={style.inputBorder}>
              <Select
                mode="multiple"
                placeholder='Age'
                allowClear
                maxTagCount={1}
                maxTagTextLength={ageValue.length > 1 ? 2 : 8}
                maxTagPlaceholder={maxTagPlaceholder}
                value={ageValue}
                onChange={(newValue) => {
                  setAgeValue(newValue);
                }}
                options={AgeOptions}
                showSearch
                popupMatchSelectWidth={false}
              />
            </div>
          </>
        }
        <div className={style.inputBorder}>
          <Select
            mode="multiple"
            placeholder='Social Class'
            allowClear
            maxTagCount={1}
            maxTagTextLength={incomeValue.length > 1 ? 2 : 8}
            maxTagPlaceholder={maxTagPlaceholder}
            value={incomeValue}
            onChange={(newValue) => {
              setIncomeValue(newValue);
            }}
            options={IncomeOptions}
            showSearch
            popupMatchSelectWidth={false}
          />
        </div>
        <div className={style.inputBorder}>
          <Cascader
            placeholder="Geographic"
            multiple
            maxTagCount={1}
            maxTagTextLength={geographicValue.length > 1 ? 2 : 8}
            maxTagPlaceholder={maxTagPlaceholder}
            value={geographicValue}
            onChange={setGeographicValue}
            options={GeographicOptions}
            showSearch
          />
        </div>
      </div>
      <div className={style.searchBox}>
        <Search
          className={style.mySearch}
          placeholder="Search"
          onSearch={onSearch}
          style={{ width: 330 }}
        />
      </div>
    </div>
  );

  // tabs
  const [tabList, setTabList] = useState([]);
  const [currentTab, setCurrentTab] = useState('--all--');
  useEffect(() => {
    fetchCategory()
      .then(res => {
        const tabs = [
          {
            key: '--all--',
            label: 'All Topic'
          }
        ];
        res?.data?.forEach(item => {
          tabs.push({
            ...item,
            key: item.title,
            label: item.title
          });
        });
        setTabList(tabs);
      })
      .catch(error => console.error(error));
  }, []);
  const onTabClick = (key) => {
    setCurrentTab(key);
    setDetailTopic(null);
    setSelectedTags([]);
    setTopicDetailVideos([]);
    const winHeight = document.documentElement.clientHeight;
    window.scrollTo({
      top: winHeight + 11,
      behavior: 'instant'
    });
  };
  const onChange = (key) => {
    if (key === 'Home Tour') {
      setIsHomeTour(true);
    } else {
      setIsHomeTour(false);
    }
    setCurrentTab(key);
    setDetailTopic(null);
    setSelectedTags([]);
    setTopicDetailVideos([]);
  };
  const showSubjectDetail = (topic) => {
    setTopicList([]);
    setDetailTopic(topic);
  };

  const [detailTopic, setDetailTopic] = useState(null);

  const [topicList, setTopicList] = useState([]);
  const fetchData = (params) => {
    setLoading(true);
    return getListByTopic(params, requestIndex)
      .then(res => {
        if (requestIndex !== res.config.uuid) return;
        setTopicList(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch(error => {
        if (requestIndex !== error?.config?.uuid) return;
        setLoading(false);
      });
  };
  const delayFetchTopicList = useCallback(debounce(function(val) { return fetchData(val);}, 500), []);
  useEffect(() => {
    if (!show || detailTopic) return;
    let geographicReq = [];
    let countryReq = [];
    geographicValue.forEach(item => {
      if (item.length === 1) {
        geographicReq.push(item[0]);
      } else {
        countryReq.push(item[1]);
      }
    });
    geographicReq = [...new Set(geographicReq)];
    GeographicOptions.forEach(region => {
      if (geographicReq.includes(region.value)) {
        countryReq.push(...region.children.map(item => item.value));
      }
    });
    countryReq = [...new Set(countryReq)];
    const params = {
      country: countryReq,
      lifeStage: isHomeTour ? null : lifeStageValue,
      dietary: isHomeTour ? null : dietaryValue,
      age: isHomeTour ? null : ageValue,
      socialClass: incomeValue,
      // geographic: geographicReq,
      category: currentTab === '--all--' ? null : currentTab,
      search: searchValue
    };
    requestIndex++;
    delayFetchTopicList(params);
  }, [show, detailTopic, lifeStageValue, dietaryValue, ageValue, incomeValue, geographicValue, currentTab, searchValue, isHomeTour]);

  const fillBox = (length) => {
    const res = [];
    for (let i = 0; i < 4-length; i++) {
      res.push(<div className={style.videoItemBox} key={i}></div>);
    }
    return res;
  };

  // topic detail
  const [topicDetailIntro, setTopicDetailIntro] = useState(null);
  const [topicDetailVideos, setTopicDetailVideos] = useState(null);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 获取topic详情
  useEffect(() => {
    if (!show || !detailTopic) return;
    fetchInsight({topic: detailTopic.topic})
      .then(res => {
        setTopicDetailIntro(Array.isArray(res.data) && res.data.length ? res.data[0] : null);
      })
      .catch(error => {
        console.log(error);
      });
  }, [detailTopic]);

  const fetchTopicDetailData = (params) => {
    setLoading(true);
    return fetchList(params, requestIndex)
      .then(res => {
        if (requestIndex !== res.config.uuid) return;
        setTopicDetailVideos(Array.isArray(res.data.data) ? res.data.data : []);
        setTotal(res.data.total);
        setCurrent(res.data.current);
        setPageSize(res.data.size);
        setLoading(false);
      })
      .catch(error => {
        if (requestIndex !== error?.config?.uuid) return;
        setLoading(false);
      });
  };
  const delayFetchTopicDetailList = useCallback(debounce(function(val) { return fetchTopicDetailData(val);}, 500), []);
  useEffect(() => {
    if (!show || !detailTopic) return;
    let geographicReq = [];
    let countryReq = [];
    geographicValue.forEach(item => {
      if (item.length === 1) {
        geographicReq.push(item[0]);
      } else {
        countryReq.push(item[1]);
      }
    });
    geographicReq = [...new Set(geographicReq)];
    GeographicOptions.forEach(region => {
      if (geographicReq.includes(region.value)) {
        countryReq.push(...region.children.map(item => item.value));
      }
    });
    countryReq = [...new Set(countryReq)];
    const params = {
      country: countryReq,
      lifeStage: isHomeTour ? null : lifeStageValue,
      dietary: isHomeTour ? null : dietaryValue,
      age: isHomeTour ? null : ageValue,
      socialClass: incomeValue,
      // geographic: geographicReq,
      category: currentTab === '--all--' ? null : currentTab,
      search: searchValue,
      topic: detailTopic.topic,
      page: current,
      page_size: pageSize,
      tag: selectedTags
    };
    requestIndex++;
    delayFetchTopicDetailList(params);
  }, [show, detailTopic, current, pageSize, lifeStageValue, dietaryValue, ageValue, incomeValue, geographicValue, currentTab, searchValue, isHomeTour, selectedTags]);

  return (
    <div className={style.pageContainer}>
      <Affix>
        <div>
          <div className={style.headerBox}>
            <div className={style.headerTitle}>Library</div>
            <div className={style.headerToolBox}>{toolCom}</div>
          </div>
          <div className={style.tabContainer}>
            <div className={style.topicGroupBox}>
              <Tabs activeKey={currentTab} items={tabList} onChange={onChange} onTabClick={onTabClick} />
            </div>
          </div>
        </div>
      </Affix>
      <div className={style.pageMainContent}>
        {loading &&
          <div className={style.loadingBox}>
            <Spin indicator={antIcon}>
              <div className={style.subBox}></div>
            </Spin>
          </div>
        }
        {/* topic list */}
        {!detailTopic && <div className={style.subjectList}>
          {topicList?.length===0 && <div className={style.noData}>Coming Soon</div>}
          {
            topicList?.length > 0 && topicList.map(topic => {
              return (
                <div key={topic.topic} className={style.subjectItem}>
                  <div className={style.subjectItemName} onClick={() => showSubjectDetail(topic)}>{topic.topic}</div>
                  <div className={style.subjectItemVideos}>
                    { topic?.data?.map(item => {
                      return <VideoItem onClick={() => play(item)} originData={item} key={item.id} title={item.title} info={item.transcription} />;
                    })}
                    {
                      fillBox(topic?.data?.length).map(item => item)
                    }
                  </div>
                  <div className={style.subjectItemInto}>
                    <img className={style.rightArrow} src={rightArrow} alt="" onClick={() => showSubjectDetail(topic)} />
                  </div>
                </div>
              );
            })
          }
        </div>}
        {/* topic detail */}
        {detailTopic && <div className={style.subjectDetail}>
          <div className={style.titleBox}>{detailTopic.topic}</div>
          {topicDetailIntro ? <div className={style.infoBox}>
            <div className={style.topVideo} onClick={() => play({...topicDetailIntro, transcription: topicDetailIntro.insight})}>
              <img className={style.videoPoster} src={topicDetailIntro.image_url || videoPosterDemo} alt="" />
              { topicDetailIntro.video_url && <img className={style.videoPlayButtonIcon} src={videoPlayIcon} alt="" />}
            </div>
            <div className={style.infoRight}>
              <div className={style.infoText}>{topicDetailIntro.insight}</div>
              <div className={style.labelBox}>
                {topicDetailIntro?.tags?.map((item, index) => {
                  return <div key={index} className={classNames(style.labelItem, {[style.labelSelected]: selectedTags.includes(item)})} onClick={() => onTagSelect(item)}>{item}</div>;
                })}
              </div>
            </div>
          </div> : null}
          <div className={style.allVideos}>
            <div className={style.allVideosTitleBox}>All video</div>
            {topicDetailVideos?.length===0 && <div className={style.noData}>Coming Soon</div>}
            {topicDetailVideos?.length && <><div className={style.videoContainer}>
              <div className={style.videoWrapper}>
                { topicDetailVideos?.map(item => {
                  return (
                    <div key={item.id} className={style.videoItemContainer}>
                      <VideoItem onClick={() => play(item)} originData={item} key={item.id} title={item.title} info={item.transcription} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.paginationBox}>
              <Pagination
                onChange={(page) => setCurrent(page)}
                onShowSizeChange={(_, size) => {setCurrent(1);setPageSize(size);}}
                total={total}
                current={current}
                pageSize={pageSize} 
                showSizeChanger={true} 
                pageSizeOptions={[1, 10, 20, 30, 40]} 
                showQuickJumper={true} 
              />
            </div></>}
          </div>
        </div>}
      </div>
    </div>
  );
}

ConsumerLibrary.defaultProps = {
};
ConsumerLibrary.propTypes = {
};

export default ConsumerLibrary;