import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import videoPlay from '../../../../assets/images/consumer-theater/svg/video-play.svg';
import videoPosterDemo from '../../../../assets/images/consumer-theater/video-poster-demo.png';
import videoPlayIcon from '../../../../assets/images/consumer-theater/svg/play-btn.svg';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import style from './side-videos.module.scss';
import { fetchList } from '../../api/request.js';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30,
      color: '#00FF00'
    }}
    spin
  />
);

let requestIndex = 0;

let SideVideos = ({ play, country, toLibrary }, ref) => {
  const [show, setShow] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const playHandle = (videoData) => {
    play && play(videoData);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    setVideoList([]);
    const params = {
      country,
      page_size: 4,
    };
    requestIndex++;
    fetchList(params, requestIndex)
      .then(res => {
        if (requestIndex !== res.config.uuid) return;
        setVideoList(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [country]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setShow(true);
    },
    close: () => {
      setShow(false);
    },
  }));
  return (
    <div className={classNames(style.sideVideosContainer, {[style.sideVideoShow]: show})}>
      <div className={style.sideVideosBox}>
        <div className={style.sideVideoHeader}>
          <div className={style.sideVideoTitle}>Latest Videos</div>
          <div className={style.sideVideoLibraryBtn}>
            <img className={style.btnIcon} src={videoPlay} alt="" />
            <div className={style.btnText} onClick={toLibrary}>Library</div>
          </div>
        </div>
        <div className={style.sideVideosItemContainer}>
          {loading && <Spin indicator={antIcon}><div className={style.emptyBox}></div></Spin>}
          {!loading && <div className={style.sideVideosWrapper}>
            { videoList.map(item => {
              let poster = item.image_url || videoPosterDemo;
              return (
                <div key={item.id} className={style.sideVideItem}>
                  <div className={style.sideVideoInfo}>
                    <div className={style.sideVideoName} title={item.title}>{item.title}</div>
                    <div className={style.sideVideoContent}>
                      <div className={style.sideVideoContentWrapper} title={item.transcription}>{item.transcription}</div>
                    </div>
                    <div className={style.sideVideoLabel}>
                      <div className={style.sideVideoLabelWrapper} title={item.topic}>{item.topic}</div>
                    </div>
                    <div className={style.sideVideoAttitude} title={item.category}>{item.category}</div>
                  </div>
                  <div className={style.sideVideoItemBox} onClick={() => playHandle(item)}>
                    <img className={style.sideVideoPoster} src={poster} alt="" />
                    { item.video_url && <img className={style.videoPlayButtonIcon} src={videoPlayIcon} alt="" />}
                  </div>
                </div>
              );
            })}
          </div>}
        </div>
      </div>
    </div>
  );
};

SideVideos = forwardRef(SideVideos);

export default SideVideos;